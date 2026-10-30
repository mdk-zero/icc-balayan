"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav, type NavSection } from "@/lib/site";

function inSection(pathname: string, section: NavSection) {
  const hrefs = [section.href, ...(section.children ?? []).map((child) => child.href)].filter(
    (href): href is string => Boolean(href),
  );
  return hrefs.some((href) => pathname === href || pathname.startsWith(`${href}/`));
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * A disclosure menu: opens on click or tap, and on hover for a mouse. Escape
 * or a click elsewhere closes it and returns focus to the button.
 */
function Dropdown({ section, pathname }: { section: NavSection; pathname: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const active = inSection(pathname, section);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hoverOpen = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hoverClose = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <li
      ref={rootRef}
      className="relative"
      onPointerEnter={hoverOpen}
      onPointerLeave={hoverClose}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`relative flex items-center gap-1.5 px-3 py-2 font-[550] transition-colors hover:text-royal ${
          active ? "text-royal" : "text-slate"
        }`}
      >
        {section.label}
        <Chevron open={open} />
        {active ? (
          <span aria-hidden className="absolute inset-x-3 -bottom-[1.1rem] h-[3px] bg-crest" />
        ) : null}
      </button>

      <div
        id={panelId}
        data-open={open}
        className="menu-panel absolute left-0 top-full z-50 mt-[1.15rem] w-72 border border-t-[3px] border-facade-line border-t-royal bg-white py-2"
      >
        <ul>
          {section.children?.map((child) => {
            const current = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  aria-current={current ? "page" : undefined}
                  tabIndex={open ? undefined : -1}
                  className={`block border-l-[3px] px-4 py-2.5 transition-colors hover:bg-facade-pale ${
                    current ? "border-crest text-royal" : "border-transparent text-slate"
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-facade-line bg-white">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/icc-logo.png"
            alt=""
            width={444}
            height={445}
            priority
            className="h-11 w-11 shrink-0 lg:h-12 lg:w-12"
          />
          <span className="min-w-0 font-display uppercase leading-[0.9] text-royal">
            <span className="block text-[1.125rem] font-[800] tracking-[0.005em] sm:text-[1.3rem]">
              Immaculate Conception College
            </span>
            <span className="block text-[0.95rem] font-[650] tracking-[0.04em] text-slate sm:text-[1.05rem]">
              of Balayan, Inc.
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="type-ui flex items-center">
            {nav.map((item) => {
              if (item.children && item.children.length > 1) {
                return <Dropdown key={item.label} section={item} pathname={pathname} />;
              }
              const href = item.href!;
              const active = inSection(pathname, item);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`relative block px-3 py-2 font-[550] transition-colors hover:text-royal ${
                      active ? "text-royal" : "text-slate"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span aria-hidden className="absolute inset-x-3 -bottom-[1.1rem] h-[3px] bg-crest" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
            <li className="ml-3">
              <Link href="/admissions" className="btn min-h-0 py-2.5">
                Enroll
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu"
          className="type-ui flex h-11 shrink-0 items-center gap-2.5 rounded-[4px] border-2 border-royal px-3 font-[650] text-royal xl:hidden"
        >
          <span aria-hidden className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[2px] w-4 bg-current transition-transform duration-200 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-4 bg-current transition-transform duration-200 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="menu"
          aria-label="Main"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-facade-line bg-white xl:hidden"
        >
          <ul className="wrap py-4">
            {nav.map((item) => (
              <li key={item.label} className="row-line first:border-0">
                {item.children && item.children.length > 1 ? (
                  <>
                    <p className="py-3 font-display text-[1.75rem] font-[700] leading-tight text-royal">
                      {item.label}
                    </p>
                    <ul className="type-ui -mt-1 grid gap-x-6 pb-4 sm:grid-cols-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className="block py-1.5 text-slate hover:text-royal aria-[current=page]:font-[650] aria-[current=page]:text-royal"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block py-3 font-display text-[1.75rem] font-[700] leading-tight text-royal"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="wrap pb-6">
            <Link href="/admissions" className="btn w-full">
              Enroll
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
