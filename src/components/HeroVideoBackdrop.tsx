"use client";

import { useEffect, useRef } from "react";

/** Active hero reel (v2): three goal clips + full original celebration loop (~32s). */
const VIDEO_SRC = "/hero/ipswich-promotion-loop-v2-goals-and-celebration.mp4";
const POSTER_SRC = "/hero/ipswich-promotion-poster-v2.jpg";

/** Previous reel (v1): promotion celebration only (~18s). To restore:
 *  VIDEO_SRC = "/hero/ipswich-promotion-loop-v1-celebration-only.mp4"
 *  POSTER_SRC = "/hero/ipswich-promotion-poster-v1.jpg"
 */

export function HeroVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      video.pause();
      video.removeAttribute("src");
      return;
    }

    const play = () => {
      video.play().catch(() => {
        /* Autoplay blocked — poster remains visible. */
      });
    };

    play();

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="hero-video-backdrop" aria-hidden="true">
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
