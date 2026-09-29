/**
 * analytics.ts
 * ─────────────────────────────────────────────────────────────────────
 * Centralised analytics & event-tracking service for the Hogwarts Portfolio.
 * All calls are fire-and-forget — failures are silently swallowed so
 * the portfolio never crashes due to analytics errors.
 */

import { supabase as rawSupabase, isSupabaseEnabled } from './supabase';
const supabase = rawSupabase as any;

// ── Session ID ─────────────────────────────────────────────────────────────
/** Stable random session ID scoped to this browser tab */
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let id = sessionStorage.getItem('hp_session_id');
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('hp_session_id', id);
  }
  return id;
}

// ── Guard ──────────────────────────────────────────────────────────────────
function guard(): boolean {
  if (!isSupabaseEnabled) return false;
  // Don't track if user is the site owner (localhost dev)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return false;
  }
  return true;
}

// ── 1. Track a page visit ─────────────────────────────────────────────────
export async function trackPageVisit(
  houseTheme = 'gryffindor',
  themeMode = 'nox'
): Promise<void> {
  if (!guard()) return;
  try {
    const sessionId = getSessionId();
    // Increment global counter
    await supabase.rpc('increment_visitor_count');
    // Log detailed analytics row
    // @ts-ignore
    await supabase.from('visitor_analytics').insert({
      session_id: sessionId,
      page: window.location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent.slice(0, 200),
      house_theme: houseTheme,
      theme_mode: themeMode,
    });
  } catch {
    // silent
  }
}

// ── 2. Track section engagement ──────────────────────────────────────────
export async function trackSectionView(
  sectionId: string,
  timeSpentMs = 0
): Promise<void> {
  if (!guard()) return;
  try {
    // @ts-ignore
    await supabase.from('section_engagements').insert({
      session_id: getSessionId(),
      section_id: sectionId,
      time_spent_ms: timeSpentMs,
    });
  } catch {
    // silent
  }
}

// ── 3. Track project click/view ───────────────────────────────────────────
export async function trackProjectClick(
  projectId: string,
  projectName: string,
  clickType: 'view' | 'github' | 'demo' | 'open' = 'view'
): Promise<void> {
  if (!guard()) return;
  try {
    // @ts-ignore
    await supabase.from('project_clicks').insert({
      project_id: projectId,
      project_name: projectName,
      click_type: clickType,
      session_id: getSessionId(),
    });
  } catch {
    // silent
  }
}

// ── 4. Get live visitor count (for display) ───────────────────────────────
export async function getVisitorCount(): Promise<number> {
  if (!isSupabaseEnabled) return 0;
  try {
    const { data } = await supabase
      // @ts-ignore
      .from('visitor_counter')
      .select('total_visits')
      .eq('id', 1)
      .single();
    return data?.total_visits ?? 0;
  } catch {
    return 0;
  }
}

// ── 5. Submit Owl Post message (contact form) ─────────────────────────────
export async function submitOwlPost(params: {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  houseTheme?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseEnabled) {
    return { success: false, error: 'Backend not configured.' };
  }
  try {
    // @ts-ignore
    const { error } = await supabase.from('owl_post_messages').insert({
      sender_name: params.senderName,
      sender_email: params.senderEmail,
      subject: params.subject,
      message: params.message,
      house_theme: params.houseTheme ?? 'gryffindor',
    });
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: msg };
  }
}
