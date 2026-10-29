import Image from "next/image";
import Link from "next/link";
import { ArchPanel } from "@/components/arch-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { history, levels, site } from "@/lib/site";

const homePrograms = [
  {
    level: "Elementary",
    note: "PAASCU Level 2",
    line: "Grades 1 to 6",
  },
  {
    level: "Junior High School",
    note: "PAASCU Level 2",
    line: "Grades 7 to 10",
  },
  {
    level: "Senior High School",
    line: "STEM, ABM and HUMSS; Tech-Voc in Home Economics and ICT",
  },
  {
    level: "College",
    line: "Nine programmes in education, business, accountancy, hospitality, tourism and computing",
  },
];

const milestones = history.filter((m) =>
  ["1935", "1947", "2002", "2016"].includes(m.year),
);

const shortMilestones: Record<string, string> = {
  "1935": "Opened in the old convent, under the Augustinian Recollect Sisters.",
  "1947": "Fr. Estanislao Cabrera opened the school to boys.",
  "2002": "Named for the A.R. foundresses, Mother Dionisia and Mother Cecilia Rosa Talangpaz.",
  "2016": "STEM, ABM, HUMSS and Tech-Voc added under the K to 12 programme.",
};

const accreditations = [
  {
    body: "PAASCU",
    level: "Level 2",
    scope: "Grade School and Junior High School",
  },
  {
    body: "PACUCOA",
    level: "Level 2",
    scope: "Bachelor of Elementary Education · BS Business Administration",
  },
  {
    body: "PACUCOA",
    level: "Level 1",
    scope: "BSEd · BS Accountancy · BS Hotel and Restaurant Management",
  },
  {
    body: "TESDA",
    level: "Registered",
    scope: "Bookkeeping NC III · F&B Services NC II · Bartending NC II · Cookery NC II",
  },
];

const roman = ["I", "II", "III", "IV"];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        {/* Frontispiece */}
        <section className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <p className="settle font-display text-lg italic text-gold">
              Balayan, Batangas
            </p>
            <h1 className="settle settle-2 display display-xl mt-5 max-w-[13ch] text-ink">
              A life-giving and innovating school community.
            </h1>
            <p className="settle settle-3 mt-8 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Committed to transforming ICCnians into Christ-centered members of
              society — from Grade 1 to a bachelor&rsquo;s degree, on Plaza Mabini.
            </p>
            <div className="settle settle-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link
                href="/admissions"
                className="bg-blue px-6 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-blue-mid"
              >
                Apply for admission
              </Link>
              <Link href="/academics" className="link-line text-sm text-ink">
                Explore academics
              </Link>
            </div>
          </div>

          <div className="settle settle-2 lg:col-span-5">
            <ArchPanel className="mx-auto flex h-[420px] w-full max-w-[330px] flex-col items-center justify-center gap-6 px-6 text-center lg:h-[500px]">
              <Image
                src="/icc-logo.png"
                alt=""
                width={444}
                height={445}
                className="w-44 lg:w-52"
              />
              <div className="h-px w-14 bg-gold/50" />
              <p className="font-display text-xl italic text-paper/85">
                Plaza Mabini, Balayan
              </p>
              <p className="label text-[0.58rem] text-paper/60">Founded 1935</p>
            </ArchPanel>
          </div>
        </section>

        {/* Four levels */}
        <section
          aria-labelledby="levels-heading"
          className="border-y border-rule bg-linen/50"
        >
          <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-12 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-14">
            <div className="lg:col-span-3">
              <h2 id="levels-heading" className="display display-sm text-ink">
                Four levels, one school.
              </h2>
              <p className="mt-2 text-sm text-muted">
                Enrollment across basic education and college.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:col-span-9">
              {levels.map((level, index) => (
                <div
                  key={level.name}
                  className={`border-gold/40 sm:border-l sm:pl-6 ${
                    index === 0 ? "sm:border-l-0 sm:pl-0" : ""
                  }`}
                >
                  <p className="font-display text-[2.6rem] leading-none text-ink">
                    {level.students}
                  </p>
                  <p className="mt-2 text-sm text-ink">{level.name}</p>
                  <p className="text-xs text-muted">{level.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="border-b border-rule">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-20 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
            <div className="lg:col-span-6">
              <h2 className="display display-lg max-w-md text-ink">
                Nine decades on Plaza Mabini.
              </h2>
              <div className="mt-7 max-w-xl space-y-5 text-[1.02rem] leading-relaxed text-muted">
                <p>
                  Founded in 1935 by Reverend Father Aniceto Cordero and entrusted
                  to the Augustinian Recollect Sisters, the college began in the old
                  convent beside the parish, with one aim: a solid, well-grounded
                  Catholic education for the youth of Balayan.
                </p>
                <p>
                  Today the school teaches from Grade 1 through college, with
                  programmes accredited by PAASCU and PACUCOA and technical courses
                  registered with TESDA.
                </p>
              </div>
              <Link href="/about" className="link-line mt-8 inline-block text-sm text-ink">
                Our history and mission
              </Link>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="border-l border-gold/40 pl-8 lg:pl-10">
                <h3 className="label text-gold">Our vision</h3>
                <p className="mt-4 font-display text-2xl leading-snug text-ink">
                  ICCBI commits to:
                </p>
                <ol className="mt-6">
                  {site.commitments.map((commitment, index) => (
                    <li
                      key={commitment}
                      className="flex gap-5 border-b border-rule/70 py-4 text-sm leading-relaxed text-ink/85 last:border-0"
                    >
                      <span className="w-6 shrink-0 font-display text-base text-gold">
                        {roman[index]}
                      </span>
                      <span>{commitment}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Programmes */}
        <section aria-labelledby="programmes-heading" className="border-b border-rule">
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 id="programmes-heading" className="display display-lg text-ink">
                  What we teach
                </h2>
                <p className="mt-3 max-w-xl text-muted">
                  One campus, four levels, and a curriculum that runs from the
                  first reader to the accountancy board.
                </p>
              </div>
              <Link href="/academics" className="link-line text-sm text-ink">
                All programmes
              </Link>
            </div>

            <div className="mt-12 border-t border-rule">
              {homePrograms.map((programme) => (
                <div
                  key={programme.level}
                  className="grid gap-2 border-b border-rule py-7 md:grid-cols-12 md:gap-8"
                >
                  <div className="md:col-span-4">
                    <h3 className="display display-sm text-ink">{programme.level}</h3>
                    {programme.note ? (
                      <p className="mt-1 font-display text-sm italic text-gold">
                        {programme.note}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-[0.95rem] leading-relaxed text-muted md:col-span-8">
                    {programme.line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditation */}
        <section className="bg-blue text-paper">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-20">
            <div className="lg:col-span-5">
              <h2 className="display display-md text-paper">
                Accredited programmes.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/65">
                Accreditation is how a school is held to its word. Our basic
                education and college programmes are reviewed by PAASCU and
                PACUCOA, and our technical courses are registered with TESDA.
              </p>
              <Link
                href="/academics"
                className="mt-7 inline-block border-b border-gold/50 pb-0.5 text-sm text-gold-soft transition-colors hover:text-paper"
              >
                Accreditation by programme
              </Link>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <dl>
                {accreditations.map((item) => (
                  <div
                    key={`${item.body}-${item.level}`}
                    className="grid grid-cols-12 gap-4 border-t border-paper/15 py-5 last:border-b"
                  >
                    <dt className="col-span-4 font-display text-lg text-paper">
                      {item.body}
                    </dt>
                    <dd className="col-span-3 text-sm text-gold-soft">{item.level}</dd>
                    <dd className="col-span-5 text-sm leading-relaxed text-paper/65">
                      {item.scope}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* History */}
        <section aria-labelledby="history-heading" className="border-b border-rule">
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 id="history-heading" className="display display-lg text-ink">
                  From 1935
                </h2>
                <p className="mt-3 max-w-lg text-muted">
                  A school built over nine decades, one building and one course at
                  a time.
                </p>
              </div>
              <Link href="/about#history" className="link-line text-sm text-ink">
                Read the full history
              </Link>
            </div>

            <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((milestone) => (
                <li key={milestone.year} className="border-t border-gold/50 pt-5">
                  <p className="font-display text-3xl leading-none text-gold">
                    {milestone.year}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-ink">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {shortMilestones[milestone.year]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Admissions */}
        <section className="bg-linen/50">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-20">
            <div className="lg:col-span-7">
              <h2 className="display display-lg max-w-lg text-ink">
                Admission begins with a conversation.
              </h2>
              <p className="mt-5 max-w-xl text-muted">
                Tell us the level you are applying for. The office will walk you
                through the requirements, the schedule and what to prepare before
                you come to Plaza Mabini.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/admissions"
                  className="bg-blue px-6 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-blue-mid"
                >
                  How to apply
                </Link>
                <Link href="/contact" className="link-line text-sm text-ink">
                  Talk to the office
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <dl className="space-y-5 border-l border-gold/40 pl-8">
                <div>
                  <dt className="label text-muted">Telephone</dt>
                  <dd className="mt-1 text-[0.95rem] text-ink">{site.phone}</dd>
                </div>
                <div>
                  <dt className="label text-muted">Email</dt>
                  <dd className="mt-1 break-words text-[0.95rem] text-ink">
                    {site.email}
                  </dd>
                </div>
                <div>
                  <dt className="label text-muted">Visit</dt>
                  <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink">
                    Plaza Mabini St., Balayan, Batangas 4213
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
