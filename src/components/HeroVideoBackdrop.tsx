"use client";

import { useEffect, useRef } from "react";

/** Active hero reel (v2): three goal clips + celebration loop (~32s). */
const VIDEO_DESKTOP = "/hero/ipswich-promotion-loop-v2-goals-and-celebration.mp4";
const VIDEO_MOBILE = "/hero/ipswich-promotion-loop-v2-480p.mp4";
const POSTER_WEBP = "/hero/ipswich-promotion-poster-v2.webp";
const POSTER_JPG = "/hero/ipswich-promotion-poster-v2.jpg";

function pickVideoSrc() {
  if (typeof window === "undefined") return VIDEO_MOBILE;
  const narrow = window.matchMedia("(max-width: 1280px), (pointer: coarse)").matches;
  return narrow ? VIDEO_MOBILE : VIDEO_DESKTOP;
}

function deferNonCritical(task: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(task, { timeout: 2200 });
  } else {
    window.setTimeout(task, 350);
  }
}

export function HeroVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let loadedSrc: string | null = null;
    let cancelled = false;

    const loadAndPlay = () => {
      if (cancelled) return;
      const src = pickVideoSrc();
      if (loadedSrc !== src) {
        loadedSrc = src;
        video.src = src;
        video.load();
      }
      video.play().catch(() => {});
    };

    const pauseVideo = () => {
      video.pause();
    };

    const coarsePointer = window.matchMedia("(max-width: 720px), (pointer: coarse)").matches;

    const observer =
      !coarsePointer && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) deferNonCritical(loadAndPlay);
              else pauseVideo();
            },
            { threshold: 0.08, rootMargin: "120px 0px" },
          )
        : null;

    if (observer) {
      observer.observe(wrap);
    } else {
      deferNonCritical(loadAndPlay);
    }

    const onVisibility = () => {
      if (document.hidden) pauseVideo();
      else if (loadedSrc) video.play().catch(() => {});
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-video-backdrop" aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-video"
        poster={POSTER_WEBP}
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="hero-video-scrim" />
      {/* JPG fallback for browsers without WebP poster support */}
      <noscript>
        <style>{`.hero-video { background: url("${POSTER_JPG}") center 42% / cover no-repeat; }`}</style>
      </noscript>
    </div>
  );
}
