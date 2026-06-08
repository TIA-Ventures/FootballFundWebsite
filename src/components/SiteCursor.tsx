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

    const coarsePointer = window.matchMedia("(max-width: 720px), (pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarsePointer || reducedMotion) {
      cursor.style.display = "none";
      dot.style.display = "none";
      return;
    }

    let raf = 0;
    let x = -100;
    let y = -100;

    const paint = () => {
      raf = 0;
      const posX = `${x}px`;
      const posY = `${y}px`;
      cursor.style.left = posX;
      cursor.style.top = posY;
      dot.style.left = posX;
      dot.style.top = posY;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

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
      if (raf) window.cancelAnimationFrame(raf);
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
