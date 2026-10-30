import Image from "next/image";
import Link from "next/link";
import { GradeRuler } from "@/components/grade-ruler";
import { HeroParallax } from "@/components/hero-parallax";
import { collegeFields, history, links, site } from "@/lib/site";

const milestones = ["1935", "1947", "1963", "2016"].map((year) =>
  history.find((m) => m.year === year)!,
);

const short: Record<string, string> = {
  "1935":
    "Fr. Aniceto Cordero founds the school in the old convent and entrusts it to the Augustinian Recollect Sisters.",
  "1947": "Fr. Estanislao Cabrera opens the Boys Department.",
  "1963": "The College Building is finished and blessed by the Bishop of Lipa.",
  "2016": "Senior High School opens under K to 12, with academic and Tech-Voc tracks.",
};

export default function HomePage() {
  return (
    <>
      {/* The name, set in the sky over the building */}
      <section className="relative isolate overflow-hidden bg-facade-pale">
        <HeroParallax className="pointer-events-none absolute bottom-0 right-0 -z-10 w-[190%] sm:w-[125%] lg:w-[min(100%,110rem)]">
          <Image
            src="/school.jpg"
            alt=""
            width={1833}
            height={858}
            priority
            sizes="(min-width: 1024px) 100vw, 190vw"
            className="hero-building block h-auto w-full"
          />
        </HeroParallax>

        <div className="wrap pb-[80vw] pt-12 sm:pb-[52vw] sm:pt-16 lg:flex lg:min-h-[min(calc(100svh-5rem),56rem)] lg:items-center lg:py-12">
          <div className="max-w-[38rem]">
            <h1 className="type-hero text-royal">
              <span className="rise-line">Immaculate</span>
              <span className="rise-line">Conception</span>
              <span className="rise-line">College</span>
              <span className="rise-line text-slate">of Balayan</span>
            </h1>
            <p className="type-lead mt-7 max-w-[34ch] text-slate lg:max-w-[42ch]">
              A Catholic school of the Augustinian Recollect Sisters on Plaza Mabini since 1935.
              ICCnians study here from Grade 1 through college.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/admissions" className="btn">
                How to enroll
              </Link>
              <Link href="/academics" className="btn-line bg-facade-pale">
                See programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-facade">
        <div className="wrap py-10 lg:py-14">
          <GradeRuler />
        </div>
      </div>

      {/* Mission and vision */}
      <section aria-labelledby="mission" className="wrap py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="mission" className="type-section lg:col-span-3">
            Our mission
          </h2>
          <div className="lg:col-span-9">
            <p className="max-w-[30ch] font-text text-[clamp(1.6rem,1.2rem+1.5vw,2.5rem)] leading-[1.3] text-royal">
              {site.mission}
            </p>

            <h3 className="type-sub mt-14">Our vision</h3>
            <p className="type-ui mt-2 text-slate-soft">{site.visionIntro}</p>
            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {site.commitments.map((commitment) => (
                <li key={commitment} className="row-line py-4 text-slate">
                  {commitment}
                </li>
              ))}
            </ul>
            <Link href="/about" className="link type-ui mt-8 inline-block font-[600]">
              More about ICC and the A.R. Sisters
            </Link>
          </div>
        </div>
      </section>

      {/* College programs */}
      <section aria-labelledby="programs" className="border-t border-facade-line bg-facade-pale">
        <div className="wrap py-16 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <h2 id="programs" className="type-section">
                College programs
              </h2>
              <p className="mt-4 max-w-[32ch] text-slate">
                Nine programs, several with PACUCOA accreditation or TESDA certificates built into
                the course.
              </p>
              <Link href="/academics" className="link type-ui mt-6 inline-block font-[600]">
                All programs and strands
              </Link>
            </div>

            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-9">
              {collegeFields.map((group) => (
                <div key={group.field} className="trim pt-4">
                  <h3 className="type-ui font-[650] text-slate-soft">{group.field}</h3>
                  <ul className="mt-2">
                    {group.programs.map((program) => (
                      <li key={program.name} className="row-line py-3 first:border-0">
                        <p className="type-item text-slate">{program.name}</p>
                        {program.accreditation ? (
                          <p className="type-small mt-1 text-slate">{program.accreditation}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment */}
      <section aria-labelledby="enroll" className="wrap py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="enroll" className="type-section">
              Enrolling at ICC
            </h2>
            <p className="mt-4 max-w-[40ch] text-slate">
              Enrollment runs through the CK Link portal and the offices in the Talangpaz and Old
              buildings.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={links.portal} className="btn">
                Open the enrollment portal
              </a>
              <Link href="/admissions" className="btn-line">
                Steps and requirements
              </Link>
            </div>
          </div>

          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            <div className="trim pt-4">
              <dt className="type-sub">New students</dt>
              <dd className="mt-3 text-slate">
                Pre-register on the portal first, then bring your requirements to the
                Registrar&rsquo;s Office and pay at the Treasurer&rsquo;s Office.
              </dd>
            </div>
            <div className="trim pt-4">
              <dt className="type-sub">Returning students</dt>
              <dd className="mt-3 text-slate">
                Start at the Registrar&rsquo;s Office to update your level, pay at the
                Treasurer&rsquo;s Office, then get your portal login.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* History */}
      <section aria-labelledby="since" className="border-t border-facade-line">
        <div className="wrap py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="since" className="type-section">
              On Plaza Mabini since 1935
            </h2>
            <Link href="/about/history" className="link type-ui font-[600]">
              Read the full history
            </Link>
          </div>

          <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="trim pt-4">
                <p className="font-display text-[3rem] font-[800] leading-none text-royal">
                  {milestone.year}
                </p>
                <h3 className="type-item mt-3">{milestone.title}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-slate">
                  {short[milestone.year]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
