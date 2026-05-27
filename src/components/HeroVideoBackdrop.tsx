"use client";

import { useEffect, useRef } from "react";

/** Active hero reel (v2): three goal clips + celebration loop (~32s, 720p). */
const VIDEO_SRC = "/hero/ipswich-promotion-loop-v2-goals-and-celebration.mp4";
const POSTER_SRC = "/hero/ipswich-promotion-poster-v2.jpg";

export function HeroVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let loaded = false;

    const loadAndPlay = () => {
      if (loaded) {
        video.play().catch(() => {});
        return;
      }
      loaded = true;
      if (!video.src) video.src = VIDEO_SRC;
      video.load();
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
      else if (loaded) video.play().catch(() => {});
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-video-backdrop" aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-video"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
      <div className="hero-video-scrim" />
    </div>
  );
}
