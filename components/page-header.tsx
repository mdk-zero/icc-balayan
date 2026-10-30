import Link from "next/link";
import type { ReactNode } from "react";
import { SectionTabs } from "@/components/section-tabs";
import { nav } from "@/lib/site";

/**
 * The opening band of every inner page, painted the colour of the buildings.
 * Pages that belong to a section with sub-pages (About, Academics) get those
 * pages as tabs along the band's lower edge.
 */
export function PageHeader({
  title,
  lead,
  current,
  children,
  aside,
}: {
  title: string;
  lead?: string;
  /** The page's own path, used to pick the section and the active tab. */
  current: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const section = nav.find(
    (item) => item.children && item.children.some((child) => child.href === current),
  );

  return (
    <header className="overflow-hidden bg-facade">
      <div className="wrap pt-10 sm:pt-14 lg:pt-20">
        <div className={aside ? "grid items-end gap-10 lg:grid-cols-12" : undefined}>
          <div className={aside ? "lg:col-span-6" : undefined}>
            <h1 className="type-title max-w-[17ch]">{title}</h1>
            {lead ? <p className="type-lead mt-6 max-w-[54ch] text-slate">{lead}</p> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-6">{aside}</div> : null}
        </div>

        {section?.children ? (
          <SectionTabs label={`${section.label} pages`} className="mt-10 overflow-x-auto lg:mt-14">
            <ul className="type-ui flex w-max gap-1">
              {section.children.map((tab) => {
                const active = tab.href === current;
                return (
                  <li key={tab.href}>
                    <Link
                      href={tab.href}
                      aria-current={active ? "page" : undefined}
                      className={`block whitespace-nowrap rounded-t-[4px] border-t-[3px] px-4 py-3 font-[650] transition-colors ${
                        active
                          ? "border-crest bg-white text-royal"
                          : "border-transparent text-royal hover:bg-white/45"
                      }`}
                    >
                      {tab.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SectionTabs>
        ) : aside ? null : (
          <div className="h-12 lg:h-16" />
        )}
      </div>
    </header>
  );
}
