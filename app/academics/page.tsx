import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { programmes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Basic education, senior high school tracks and college programmes at Immaculate Conception College of Balayan, with PAASCU, PACUCOA and TESDA accreditation.",
};

export default function AcademicsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <PageIntro
          title="From the first reader to the accountancy board."
          lead="Four levels, one curriculum spine: a Catholic formation in the basics, a track or strand that fits the student, and college programmes with the licensure and technical qualifications built in."
          current="Academics"
        >
          <nav aria-label="Programme sections" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {programmes.map((group) => (
              <a key={group.id} href={`#${group.id}`} className="link-line text-ink">
                {group.heading}
              </a>
            ))}
          </nav>
        </PageIntro>

        {programmes.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="scroll-mt-32 border-b border-rule"
          >
            <div className="mx-auto max-w-[1280px] px-6 py-14 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-20">
              <header className="lg:col-span-4">
                <h2 className="display display-lg text-ink">{group.heading}</h2>
                {group.note ? (
                  <p className="mt-3 font-display text-sm italic leading-relaxed text-gold">
                    {group.note}
                  </p>
                ) : null}
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                  {group.intro}
                </p>
              </header>

              <ul className="mt-10 border-t border-rule lg:col-span-8 lg:mt-0">
                {group.rows.map((row) => (
                  <li key={row.name} className="border-b border-rule py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                      <h3 className="font-display text-xl text-ink">{row.name}</h3>
                      {row.accreditation ? (
                        <span className="text-xs tracking-wide text-muted">
                          {row.accreditation}
                        </span>
                      ) : null}
                    </div>
                    {row.detail ? (
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                        {row.detail}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="bg-blue text-paper">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-20">
            <div className="lg:col-span-5">
              <h2 className="display display-md text-paper">
                What the accreditations mean
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/65">
                A school can print any claim it likes. Accreditation is the part
                that is checked from outside.
              </p>
            </div>
            <dl className="lg:col-span-6 lg:col-start-7">
              <div className="border-t border-paper/15 py-5">
                <dt className="font-display text-lg text-paper">PAASCU</dt>
                <dd className="mt-1 text-sm leading-relaxed text-paper/65">
                  Philippine Accrediting Association of Schools, Colleges and
                  Universities — Level 2 for Grade School and Junior High School.
                </dd>
              </div>
              <div className="border-t border-paper/15 py-5">
                <dt className="font-display text-lg text-paper">PACUCOA</dt>
                <dd className="mt-1 text-sm leading-relaxed text-paper/65">
                  Philippine Association of Colleges and Universities Commission on
                  Accreditation — Level 2 for teacher education and business
                  administration, Level 1 for secondary education, accountancy and
                  hospitality management.
                </dd>
              </div>
              <div className="border-y border-paper/15 py-5">
                <dt className="font-display text-lg text-paper">TESDA</dt>
                <dd className="mt-1 text-sm leading-relaxed text-paper/65">
                  Technical Education and Skills Development Authority —
                  Bookkeeping NC III, Food and Beverage Services NC II, Bartending
                  NC II and Cookery NC II.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="bg-linen/50">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-16">
            <h2 className="display display-md max-w-xl text-ink">
              Found the programme? The next step is a conversation.
            </h2>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/admissions"
                className="bg-blue px-6 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-blue-mid"
              >
                How to apply
              </Link>
              <Link href="/contact" className="link-line text-sm text-ink">
                Ask a question
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
