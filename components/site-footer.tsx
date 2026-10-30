import Image from "next/image";
import Link from "next/link";
import { links, site, tel, usefulLinks } from "@/lib/site";

const columns = [
  {
    heading: "About ICC",
    items: [
      { href: "/about/history", label: "History" },
      { href: "/about/mission-and-vision", label: "Mission and vision" },
      { href: "/about/core-values", label: "Core values" },
      { href: "/about/seal", label: "School seal" },
      { href: "/about/accreditations", label: "Accreditations" },
      { href: "/about/icc-march", label: "ICC March" },
    ],
  },
  {
    heading: "Inside ICCBI",
    items: [
      { href: "/inside-iccbi/administrators", label: "Administrators since 1935" },
      { href: "/inside-iccbi/board-of-trustees", label: "Board of Trustees" },
      { href: "/inside-iccbi/administrative-board", label: "Administrative Board" },
      { href: "/inside-iccbi/directory", label: "Directory" },
    ],
  },
  {
    heading: "Students and alumni",
    items: [
      { href: "/academics", label: "Academics" },
      { href: "/admissions", label: "Admissions" },
      { href: "/facilities", label: "Facilities" },
      { href: "/news", label: "News" },
      { href: "/alumni", label: "Alumni" },
      { href: links.staffMail, label: "Staff email" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="on-dark bg-royal-deep text-white">
      <div className="wrap grid gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-3">
          <Image src="/icc-logo.png" alt="" width={444} height={445} className="h-20 w-20" />
          <p className="mt-5 font-display text-[1.75rem] font-[750] uppercase leading-[0.95]">
            Immaculate Conception College of Balayan, Inc.
          </p>
          <address className="type-ui mt-6 not-italic text-white/85">
            {site.street}
            <br />
            {site.town}
          </address>
          <ul className="type-ui mt-4 space-y-1">
            <li>
              <a href={tel(site.phone)} className="text-white hover:underline">
                {site.phone}
              </a>{" "}
              <span className="text-white/70">(Directress&rsquo; Office)</span>
            </li>
            <li>
              <span className="text-white/70">Telefax </span>
              {site.fax}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-white hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6">
          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="type-ui font-[650] text-facade">{column.heading}</h2>
              <ul className="type-ui mt-3 space-y-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith("http") ? (
                      <a href={item.href} className="text-white/90 hover:text-white hover:underline">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="text-white/90 hover:text-white hover:underline">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <h2 className="type-ui font-[650] text-facade">Useful links</h2>
          <ul className="type-ui mt-3 space-y-2">
            {usefulLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-white/90 hover:text-white hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap type-small flex flex-col gap-3 py-6 text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <a href={links.facebook} className="hover:text-white hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href={links.youtube} className="hover:text-white hover:underline">
                YouTube
              </a>
            </li>
            <li>
              <a href={links.maps} className="hover:text-white hover:underline">
                Map
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
