-- ============================================================
-- HOGWARTS PORTFOLIO — SUPABASE BACKEND SCHEMA
-- Migration: portfolio_backend_setup
-- ============================================================

-- 1. OWL POST — Contact Form Submissions
CREATE TABLE IF NOT EXISTS owl_post_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  house_theme TEXT DEFAULT 'gryffindor',
  ip_country  TEXT
);

-- 2. VISITOR ANALYTICS — Page View Tracking
CREATE TABLE IF NOT EXISTS visitor_analytics (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id  TEXT NOT NULL,
  page        TEXT NOT NULL DEFAULT '/',
  referrer    TEXT,
  user_agent  TEXT,
  country     TEXT,
  house_theme TEXT DEFAULT 'gryffindor',
  theme_mode  TEXT DEFAULT 'nox'
);

-- 3. SECTION ENGAGEMENT — Which sections are viewed most
CREATE TABLE IF NOT EXISTS section_engagements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id  TEXT NOT NULL,
  section_id  TEXT NOT NULL,
  time_spent_ms INTEGER DEFAULT 0
);

-- 4. PROJECT CLICKS — Which projects get the most interest
CREATE TABLE IF NOT EXISTS project_clicks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  project_id  TEXT NOT NULL,
  project_name TEXT NOT NULL,
  click_type  TEXT NOT NULL DEFAULT 'view',
  session_id  TEXT
);

-- 5. VISITOR COUNTER — Simple running total
CREATE TABLE IF NOT EXISTS visitor_counter (
  id         SERIAL PRIMARY KEY,
  total_visits BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO visitor_counter (total_visits) VALUES (0) ON CONFLICT DO NOTHING;

-- ── Row Level Security (RLS) ────────────────────────────────────────────
-- Owl Post: anyone can insert (send messages), only service role can read
ALTER TABLE owl_post_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert_owl_post" ON owl_post_messages FOR INSERT TO anon WITH CHECK (true);

-- Analytics: anyone can insert their own events
ALTER TABLE visitor_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert_analytics" ON visitor_analytics FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE section_engagements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert_section" ON section_engagements FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE project_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert_project_clicks" ON project_clicks FOR INSERT TO anon WITH CHECK (true);

-- Visitor counter is public read + increment via function
ALTER TABLE visitor_counter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_visitor_counter" ON visitor_counter FOR SELECT TO anon USING (true);

-- ── Helper Function: Increment visitor count ────────────────────────────
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE visitor_counter SET total_visits = total_visits + 1, updated_at = NOW() WHERE id = 1;
END;
$$;

-- Grant execute to anon
GRANT EXECUTE ON FUNCTION increment_visitor_count() TO anon;
