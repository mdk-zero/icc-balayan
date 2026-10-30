import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { links, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Immaculate Conception College of Balayan, Inc.: a school of the Augustinian Recollect Sisters on Plaza Mabini since 1935.",
};

const index = [
  {
    heading: "About ICC",
    pages: [
      {
        href: "/about/history",
        label: "History",
        line: "From the old convent in 1935 to four levels and nine college programs.",
      },
      {
        href: "/about/mission-and-vision",
        label: "Mission and vision",
        line: "What the school is for, and its philosophy of education.",
      },
      {
        href: "/about/core-values",
        label: "Core values",
        line: "Integrity, collaboration, compassion, benevolence and innovation.",
      },
      {
        href: "/about/seal",
        label: "School seal",
        line: "What the shield, the cross and the motto stand for.",
      },
      {
        href: "/about/accreditations",
        label: "Accreditations",
        line: "Which programs PAASCU, PACUCOA and TESDA have reviewed.",
      },
      {
        href: "/about/icc-march",
        label: "ICC March",
        line: "Listen to the college's official march.",
      },
    ],
  },
  {
    heading: "Inside ICCBI",
    pages: [
      {
        href: "/inside-iccbi/administrators",
        label: "Administrators since 1935",
        line: "The A.R. Sisters who have led the school, in order.",
      },
      {
        href: "/inside-iccbi/board-of-trustees",
        label: "Board of Trustees",
        line: "The General Council of the Augustinian Recollect Sisters.",
      },
      {
        href: "/inside-iccbi/administrative-board",
        label: "Administrative Board",
        line: "The sisters who run the school day to day.",
      },
      {
        href: "/inside-iccbi/directory",
        label: "Directory",
        line: "Where every office, laboratory and classroom is.",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        current="/about"
        title="A Catholic school on Plaza Mabini since 1935"
        lead="Immaculate Conception College of Balayan, Inc. (ICCBI) is run by the Augustinian Recollect Sisters. It offers elementary, junior high, senior high and college programs, including STEM, ABM, HUMSS, Tech-Voc and bachelor's degrees."
      />

      <section aria-labelledby="statement" className="wrap py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="statement" className="type-section lg:col-span-3">
            {site.statementLabels.statement}
          </h2>
          <div className="lg:col-span-9">
            <p className="max-w-[30ch] font-text text-[clamp(1.6rem,1.2rem+1.5vw,2.5rem)] leading-[1.3] text-royal">
              {site.mission}
            </p>
            <Link href="/about/mission-and-vision" className="link type-ui mt-8 inline-block font-[600]">
              Read the mission, vision and philosophy of education
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="motto" className="bg-facade">
        <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-3">
            <h2 id="motto" className="type-section">
              Motto
            </h2>
            <p className="mt-3 max-w-[30ch] text-slate">
              Written on the ribbons around the shield of the college seal.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-4 lg:col-span-9">
            {site.motto.map((word) => (
              <div key={word.latin} className="trim pt-4">
                <dt className="font-display text-[clamp(2rem,6vw,4.5rem)] font-[800] uppercase leading-none text-royal">
                  {word.latin}
                </dt>
                <dd className="type-ui mt-2 text-slate">{word.english}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="sisters" className="wrap py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="sisters" className="type-section lg:col-span-3">
            The A.R. Sisters
          </h2>
          <div className="prose-block max-w-[62ch] text-slate lg:col-span-7">
            <p>
              In 1935, Reverend Father Aniceto Cordero founded the school with the
              approval of the Bishop of Lipa and ceded the old convent to the
              Augustinian Recollect Sisters, whom he invited to run it.
            </p>
            <p>
              The sisters have run the school ever since. The congregation&rsquo;s
              General Council sits as ICC&rsquo;s Board of Trustees, and the
              Talangpaz Building carries the name of its foundresses, Mother Dionisia
              and Mother Cecilia Rosa Talangpaz.
            </p>
            <p>
              <a href={links.ars} className="link type-ui font-[600]">
                The Augustinian Recollect Sisters
              </a>
            </p>
          </div>
        </div>
      </section>

      <nav aria-label="About ICC pages" className="border-t border-facade-line bg-facade-pale">
        <div className="wrap grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {index.map((group) => (
            <div key={group.heading} className={group.heading === "About ICC" ? "lg:col-span-7" : "lg:col-span-5"}>
              <h2 className="type-section">{group.heading}</h2>
              <ul className={`mt-6 grid gap-x-10 ${group.pages.length > 4 ? "sm:grid-cols-2" : ""}`}>
                {group.pages.map((page) => (
                  <li key={page.href} className="trim">
                    <Link href={page.href} className="group block pb-6 pt-4">
                      <span className="type-sub block decoration-2 underline-offset-4 group-hover:underline">
                        {page.label}
                      </span>
                      <span className="mt-1.5 block text-slate">{page.line}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
