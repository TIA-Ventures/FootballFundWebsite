"use client";

import { useEffect, useRef } from "react";

/** Active hero reel (v2): three goal clips + celebration loop (~32s). */
const VIDEO_DESKTOP = "/hero/ipswich-promotion-loop-v2-goals-and-celebration.mp4";
const VIDEO_MOBILE = "/hero/ipswich-promotion-loop-v2-480p.mp4";
const POSTER_SRC = "/hero/ipswich-promotion-poster-v2.jpg";

function pickVideoSrc() {
  if (typeof window === "undefined") return VIDEO_DESKTOP;
  return window.matchMedia("(max-width: 720px), (pointer: coarse)").matches
    ? VIDEO_MOBILE
    : VIDEO_DESKTOP;
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

    const loadAndPlay = () => {
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

    // Mobile: hero fills the viewport on load — start immediately (iOS is
    // picky about deferred src + intersection-gated autoplay).
    const coarsePointer = window.matchMedia("(max-width: 720px), (pointer: coarse)").matches;

    const observer =
      !coarsePointer && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) loadAndPlay();
              else pauseVideo();
            },
            { threshold: 0.08 },
          )
        : null;

    if (observer) {
      observer.observe(wrap);
    } else {
      loadAndPlay();
    }

    const onVisibility = () => {
      if (document.hidden) pauseVideo();
      else if (loadedSrc) video.play().catch(() => {});
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-video-backdrop" aria-hidden="true">
      {/* No src/preload/autoPlay on mount — poster only until JS attaches the
          file (faststart MP4 + 480p on mobile). Avoids blocking LCP. */}
      <video
        ref={videoRef}
        className="hero-video"
        poster={POSTER_SRC}
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="hero-video-scrim" />
    </div>
  );
}
