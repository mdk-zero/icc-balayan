import type { ReactNode } from "react";

/**
 * A tall arched panel, the shape of the church windows on Plaza Mabini. It is
 * the one place on the site where the seal's royal blue goes full depth.
 */
export function ArchPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-t-full border border-gold/40 bg-blue ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_75%_at_50%_0%,#3d3da8_0%,#2b2b87_48%,#1a1a5c_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-2.5 -z-10 rounded-t-full border border-gold/20"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-soft/70 to-transparent"
      />
      {children}
    </div>
  );
}
