"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The tab strip under a page title. On narrow screens it scrolls sideways,
 * so on load it centres the current page's tab instead of leaving it off-screen.
 */
export function SectionTabs({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const strip = ref.current;
    const current = strip?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!strip || !current || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollLeft = current.offsetLeft - (strip.clientWidth - current.offsetWidth) / 2;
  }, []);

  return (
    <nav ref={ref} aria-label={label} className={`relative ${className}`}>
      {children}
    </nav>
  );
}
