import React, { useEffect, useRef, useCallback } from 'react';
import { useWizardTheme } from '../context/ThemeContext';

/**
 * MagneticCursor
 * ─────────────────────────────────────────────────────────────────
 * Premium dual-ring cursor inspired by high-end editorial / portfolio sites.
 *
 * Anatomy:
 *   • Inner dot   — 6px, snaps instantly to pointer, house-colored glow
 *   • Outer ring  — 36px, spring-lags behind for a magnetic feel
 *   • Hover state — ring scales up to 56px + "OPEN" label on interactive els
 *   • Click burst — 3 concentric ripple rings + 12 dot particles
 *
 * Hides the native OS cursor site-wide via CSS injected into <head>.
 */
export const WandCursorTrail: React.FC = () => {
  const { getHouseColor, themeMode } = useWizardTheme();
  const houseStyles = getHouseColor();
  const isLumos = themeMode === 'lumos';

  // DOM refs for the two cursor layers
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Animation state
  const mouseRef   = useRef({ x: -200, y: -200 });
  const ringPos    = useRef({ x: -200, y: -200 });
  const rafRef     = useRef<number>(0);
  const hoveredRef = useRef(false);


  // Ripple container (for click bursts)
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  // ── Inject global cursor:none ─────────────────────────────────────────
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'hp-cursor-hide';
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  // ── Click burst ───────────────────────────────────────────────────────
  const spawnBurst = useCallback((x: number, y: number) => {
    const container = rippleContainerRef.current;
    if (!container) return;

    const color = houseStyles.primary;
    const secondary = houseStyles.secondary;

    // 3 concentric rings
    [28, 50, 72].forEach((size, i) => {
      const ring = document.createElement('div');
      ring.style.cssText = `
        position: absolute;
        left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        border: 2px solid ${i % 2 === 0 ? color : secondary};
        box-shadow: 0 0 12px ${color};
        transform: translate(-50%, -50%) scale(0.2);
        opacity: 1;
        pointer-events: none;
        transition: transform ${260 + i * 80}ms cubic-bezier(0.22,1,0.36,1),
                    opacity   ${260 + i * 80}ms ease-out;
      `;
      container.appendChild(ring);
      requestAnimationFrame(() => {
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.opacity = '0';
      });
      setTimeout(() => ring.remove(), 600 + i * 80);
    });

    // 12 dot particles
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('div');
      const angle = (i / 12) * Math.PI * 2;
      const dist = 28 + Math.random() * 22;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const size = Math.random() * 4 + 2;
      const c = Math.random() > 0.5 ? color : secondary;

      dot.style.cssText = `
        position: absolute;
        left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: ${c};
        box-shadow: 0 0 6px ${c};
        transform: translate(-50%, -50%) translate(0px, 0px) scale(1);
        opacity: 1;
        pointer-events: none;
        transition: transform 420ms cubic-bezier(0.22,1,0.36,1),
                    opacity 420ms ease-out;
      `;
      container.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(0)`;
        dot.style.opacity = '0';
      });
      setTimeout(() => dot.remove(), 440);
    }
  }, [houseStyles]);

  // ── Main animation loop ───────────────────────────────────────────────
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const SPRING = 0.13; // lower = more lag
    const color  = houseStyles.primary;
    const glow   = houseStyles.glow || houseStyles.primary;

    // Apply live colors
    dot.style.background  = '#FFFFFF';
    dot.style.boxShadow   = `0 0 8px 3px ${color}, 0 0 16px ${color}`;
    ring.style.borderColor = color;
    ring.style.boxShadow  = `0 0 0 1px ${color}40, inset 0 0 12px ${glow}20`;

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      const rp = ringPos.current;

      // Spring interpolation for outer ring
      rp.x += (mx - rp.x) * SPRING;
      rp.y += (my - rp.y) * SPRING;

      // Inner dot — instant
      dot.style.transform  = `translate(${mx - 3}px, ${my - 3}px)`;
      // Outer ring — lagged
      ring.style.transform = `translate(${rp.x - 18}px, ${rp.y - 18}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [houseStyles]);

  // ── Mouse event listeners ────────────────────────────────────────────
  useEffect(() => {
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!ring) return;

    const color = houseStyles.primary;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      hoveredRef.current = true;
      ring.style.width   = '56px';
      ring.style.height  = '56px';
      ring.style.borderColor = color;
      ring.style.background  = `${color}12`;
      ring.style.opacity = '0.85';
      if (label) label.style.opacity = '1';
    };

    const onLeaveInteractive = () => {
      hoveredRef.current = false;
      ring.style.width   = '36px';
      ring.style.height  = '36px';
      ring.style.background  = 'transparent';
      ring.style.opacity = '1';
      if (label) label.style.opacity = '0';
    };

    const onClick = (e: MouseEvent) => {
      // Brief press squish on inner dot
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px) scale(2.5)`;
        setTimeout(() => {
          dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px) scale(1)`;
        }, 150);
      }
      spawnBurst(e.clientX, e.clientY);
    };

    const onMouseDown = () => {
      ring.style.transform += ' scale(0.82)';
      ring.style.opacity = '0.6';
    };
    const onMouseUp = () => {
      ring.style.opacity = '1';
    };

    // Detect hoverable / clickable elements
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, label, [tabindex], [onclick]';

    const attachDelegated = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };
    attachDelegated();

    // Re-attach on DOM changes (dynamic components)
    const observer = new MutationObserver(attachDelegated);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, [houseStyles, spawnBurst]);

  const dotStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#FFFFFF',
    pointerEvents: 'none',
    zIndex: 99999,
    willChange: 'transform',
    transition: 'transform 0.06s linear, width 0.15s ease, height 0.15s ease',
    mixBlendMode: isLumos ? 'multiply' : 'normal',
  };

  const ringStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: `1.5px solid ${houseStyles.primary}`,
    pointerEvents: 'none',
    zIndex: 99998,
    willChange: 'transform',
    transition: 'width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease, border-color 0.3s ease, background 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Cinzel, serif',
    fontSize: '7px',
    fontWeight: 900,
    letterSpacing: '0.18em',
    color: houseStyles.secondary,
    textTransform: 'uppercase',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return (
    <>
      {/* Inner precision dot */}
      <div ref={dotRef} style={dotStyle} />

      {/* Outer magnetic ring */}
      <div ref={ringRef} style={ringStyle}>
        <span ref={labelRef} style={labelStyle}>OPEN</span>
      </div>

      {/* Click burst container */}
      <div
        ref={rippleContainerRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99997,
          overflow: 'hidden',
        }}
      />
    </>
  );
};
