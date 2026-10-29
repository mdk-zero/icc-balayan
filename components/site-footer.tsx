import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-sky/60 bg-blue-deep text-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Image
              src="/icc-logo.png"
              alt=""
              width={444}
              height={445}
              className="h-16 w-16"
            />
            <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-paper">
              {site.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
              A Catholic school on Plaza Mabini since 1935 — elementary, junior
              high, senior high and college.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-gold-soft">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/75 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="label text-gold-soft">Visit and contact</h2>
            <address className="mt-5 not-italic text-sm leading-relaxed text-paper/75">
              {site.address}
            </address>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-paper/75 transition-colors hover:text-paper"
                >
                  {site.phone}
                </a>
                <span className="text-paper/55"> · telephone</span>
              </li>
              <li>
                <a
                  href={`tel:${site.fax.replace(/[^0-9+]/g, "")}`}
                  className="text-paper/75 transition-colors hover:text-paper"
                >
                  {site.fax}
                </a>
                <span className="text-paper/55"> · telefax</span>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-paper/75 transition-colors hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
            </ul>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block border-b border-gold/50 pb-0.5 text-sm text-gold-soft transition-colors hover:text-paper"
            >
              Facebook — ICCBalayanIncOfficial
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-5 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>
            © {new Date().getFullYear()} {site.name} All rights reserved.
          </p>
          <p>PAASCU and PACUCOA accredited programmes · TESDA registered courses</p>
        </div>
      </div>
    </footer>
  );
}
