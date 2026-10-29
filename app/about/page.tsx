import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { history, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The mission, vision and history of Immaculate Conception College of Balayan, Inc. — founded in 1935 and run by the Augustinian Recollect Sisters.",
};

const roman = ["I", "II", "III", "IV"];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <PageIntro
          title="A Catholic school on Plaza Mabini, since 1935."
          lead="Immaculate Conception College of Balayan, Inc. teaches from Grade 1 through college. It was founded by a parish priest, built by the Augustinian Recollect Sisters, and has stayed on the same plaza for nine decades."
          current="About"
        />

        {/* Mission and vision */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <h2 className="display display-md text-ink lg:col-span-3">
                Our mission
              </h2>
              <p className="font-display text-[1.75rem] leading-[1.3] text-ink lg:col-span-9 lg:text-[2.1rem]">
                {site.mission}
              </p>
            </div>

            <div className="mt-16 grid gap-8 border-t border-rule pt-16 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                <h2 className="display display-md text-ink">Our vision</h2>
                <p className="mt-3 text-sm text-muted">{site.visionIntro}</p>
              </div>
              <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-9">
                {site.commitments.map((commitment, index) => (
                  <li
                    key={commitment}
                    className="flex gap-5 border-t border-gold/40 py-5"
                  >
                    <span className="w-7 shrink-0 font-display text-lg leading-7 text-gold">
                      {roman[index]}
                    </span>
                    <span className="text-[0.98rem] leading-relaxed text-ink/85">
                      {commitment}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* History */}
        <section id="history" className="scroll-mt-32 border-b border-rule">
          <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <h2 className="display display-md text-ink">Our history</h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  From a convent school on the plaza to four levels and nine
                  college programmes.
                </p>
              </div>

              <ol className="lg:col-span-9">
                {history.map((milestone) => (
                  <li
                    key={milestone.year}
                    className="grid gap-2 border-t border-rule py-8 md:grid-cols-12 md:gap-8"
                  >
                    <p className="font-display text-2xl leading-tight text-gold md:col-span-2">
                      {milestone.year}
                    </p>
                    <h3 className="font-display text-xl text-ink md:col-span-3">
                      {milestone.title}
                    </h3>
                    <p className="text-[0.95rem] leading-relaxed text-muted md:col-span-7">
                      {milestone.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Invitation */}
        <section className="bg-linen/50">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 py-14 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-16">
            <div>
              <h2 className="display display-md max-w-xl text-ink">
                The best way to understand the school is to stand on the plaza.
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                Visitors are welcome at Plaza Mabini. Call the office ahead so
                someone can show you the campus.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className="bg-blue px-6 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-blue-mid"
              >
                Plan a visit
              </Link>
              <Link href="/admissions" className="link-line text-sm text-ink">
                Admissions
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
