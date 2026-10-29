import Link from "next/link";
import type { ReactNode } from "react";

export function PageIntro({
  title,
  lead,
  current,
  children,
}: {
  title: string;
  lead?: string;
  current: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-rule bg-linen/40">
      <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-10 lg:py-20">
        <nav aria-label="Breadcrumb" className="text-xs text-muted">
          <Link href="/" className="transition-colors hover:text-blue-mid">
            Home
          </Link>
          <span aria-hidden className="mx-2 text-gold">
            /
          </span>
          <span aria-current="page">{current}</span>
        </nav>

        <h1 className="display display-lg mt-6 max-w-3xl text-ink">{title}</h1>
        {lead ? <p className="standfirst mt-6 max-w-2xl">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
