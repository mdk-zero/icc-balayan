"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Share of the scroll distance the layer travels; matches `hero-drift`. */
const SPEED = 0.3;

/**
 * A layer that sinks at 30% of the scroll speed over the first screen, so the
 * page moves past it. Browsers with scroll-driven animations run this in CSS
 * (`.hero-parallax` in globals.css) off the main thread; the effect below only
 * fills in where that isn't supported.
 */
export function HeroParallax({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    if (!layer || CSS.supports("animation-timeline: scroll()")) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = reduce.matches ? 0 : Math.min(window.scrollY, window.innerHeight) * SPEED;
      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={ref} className={`hero-parallax ${className}`}>
      {children}
    </div>
  );
}
