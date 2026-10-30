import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mission and vision",
  description:
    "The mission, vision and philosophy of education of Immaculate Conception College of Balayan, Inc.",
};

export default function MissionVisionPage() {
  const labels = site.statementLabels;

  return (
    <>
      <PageHeader
        current="/about/mission-and-vision"
        title="Mission, vision and philosophy"
        lead="What ICCBI sets out to be, what it commits to, and what it believes education is for."
      />

      <section aria-labelledby="statement" className="wrap py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="statement" className="type-section lg:col-span-3">
            {labels.statement}
          </h2>
          <p className="max-w-[30ch] font-text text-[clamp(1.6rem,1.2rem+1.5vw,2.5rem)] leading-[1.3] text-royal lg:col-span-9">
            {site.mission}
          </p>
        </div>
      </section>

      <section aria-labelledby="commitments" className="border-t border-facade-line">
        <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-3">
            <h2 id="commitments" className="type-section">
              {labels.commitments}
            </h2>
            <p className="type-ui mt-3 text-slate-soft">{site.visionIntro}</p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-9">
            {site.commitments.map((commitment) => (
              <li
                key={commitment}
                className="trim py-5 font-display text-[1.75rem] font-[650] leading-[1.1] text-slate"
              >
                {commitment}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="philosophy" className="bg-facade">
        <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <h2 id="philosophy" className="type-section lg:col-span-3">
            Philosophy of education
          </h2>
          <blockquote className="lg:col-span-9">
            <p className="max-w-[40ch] font-text text-[clamp(1.35rem,1.1rem+0.9vw,1.875rem)] italic leading-[1.5] text-slate">
              {site.philosophy}
            </p>
          </blockquote>
        </div>
      </section>

      <nav aria-label="Related" className="wrap flex flex-wrap items-center gap-x-8 gap-y-3 py-12">
        <Link href="/about/core-values" className="link type-ui font-[600]">
          The five core values
        </Link>
        <Link href="/about/seal" className="link type-ui font-[600]">
          The school seal and its motto
        </Link>
      </nav>
    </>
  );
}
