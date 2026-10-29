"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="hidden border-b border-blue/20 bg-sky text-blue-deep md:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-10 py-2">
          <p className="label text-[0.6rem] tracking-[0.14em]">{site.address}</p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
              className="text-[0.72rem] tracking-wide underline-offset-4 transition-colors hover:underline"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-[0.72rem] tracking-wide underline-offset-4 transition-colors hover:underline"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3.5"
          aria-label={`${site.name} — home`}
        >
          <Image
            src="/icc-logo.png"
            alt=""
            width={444}
            height={445}
            priority
            className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
          />
          <span>
            <span className="block font-display text-[1.3rem] leading-none text-ink transition-colors group-hover:text-blue-mid lg:text-[1.38rem] xl:text-[1.5rem]">
              Immaculate Conception College
            </span>
            <span className="mt-2 block text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
              of Balayan, Inc. · Est. 1935
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6 xl:gap-8">
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-7">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[0.9rem] transition-colors hover:text-blue-mid ${
                    active
                      ? "text-ink underline decoration-crest decoration-2 underline-offset-[10px]"
                      : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/admissions"
            className="hidden bg-blue px-4 py-2.5 text-[0.82rem] font-medium tracking-wide text-paper transition-colors hover:bg-blue-mid sm:inline-block xl:px-5 xl:py-3"
          >
            Inquire
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border border-rule text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              aria-hidden
              className={`h-px w-5 bg-current transition-transform duration-200 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              aria-hidden
              className={`h-px w-5 bg-current transition-transform duration-200 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-rule bg-paper px-6 py-4 lg:hidden"
        >
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule/70 last:border-0">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-3.5 text-[0.95rem] text-ink"
                >
                  {item.label}
                  <span aria-hidden className="text-gold">
                    {item.href === "/" ? "·" : "→"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/admissions"
            className="mt-4 block bg-blue px-5 py-3 text-center text-[0.85rem] font-medium text-paper"
          >
            Inquire
          </Link>
        </nav>
      )}
    </header>
  );
}
