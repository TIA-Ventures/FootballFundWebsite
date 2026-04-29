"use client";

import { useEffect, useRef } from "react";

const HOVER_SELECTOR = 'a, button, [role="button"], .nav-cta, label[for], summary';

export function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mx = -100;
    let my = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(HOVER_SELECTOR)) {
        cursor.classList.add("hovering");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      if (
        target?.closest(HOVER_SELECTOR) &&
        !related?.closest(HOVER_SELECTOR)
      ) {
        cursor.classList.remove("hovering");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        id="cursor"
        style={{ left: -100, top: -100 }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        id="cursorDot"
        style={{ left: -100, top: -100 }}
        aria-hidden="true"
      />
    </>
  );
}
