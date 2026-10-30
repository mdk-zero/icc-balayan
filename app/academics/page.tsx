import type { Metadata } from "next";
import Link from "next/link";
import { GradeRuler } from "@/components/grade-ruler";
import { PageHeader } from "@/components/page-header";
import { collegeFields, seniorHigh } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Elementary, junior high, senior high strands and college programs at Immaculate Conception College of Balayan, with PAASCU, PACUCOA and TESDA accreditation.",
};

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        current="/academics"
        title="From Grade 1 to a bachelor's degree"
        lead="Elementary and junior high, two senior high tracks, and nine college programs, all on one campus in Balayan."
      />

      <div className="wrap pb-4 pt-14 lg:pt-20">
        <GradeRuler headingId="ruler" />
      </div>

      {/* Basic education */}
      <section
        id="basic-education"
        aria-labelledby="basic-h"
        className="wrap scroll-mt-24 py-14 lg:py-20"
      >
        <div className="trim grid gap-6 pt-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 id="basic-h" className="type-section">
              Elementary and junior high
            </h2>
            <p className="type-ui mt-3 font-[600] text-royal">PAASCU accredited, Level 2</p>
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-[60ch] text-slate">
              Grade school and junior high follow the Department of Education&rsquo;s
              K to 12 curriculum. Both are accredited at Level 2 by the Philippine
              Accrediting Association of Schools, Colleges and Universities.
            </p>
            <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
              <div className="row-line py-4">
                <dt className="type-item text-slate">Elementary</dt>
                <dd className="type-ui mt-1 text-slate-soft">Grades 1 to 6</dd>
              </div>
              <div className="row-line py-4">
                <dt className="type-item text-slate">Junior High School</dt>
                <dd className="type-ui mt-1 text-slate-soft">Grades 7 to 10</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Senior high */}
      <section
        id="senior-high"
        aria-labelledby="shs-h"
        className="scroll-mt-24 bg-facade-pale"
      >
        <div className="wrap py-14 lg:py-20">
          <div className="trim grid gap-6 pt-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 id="shs-h" className="type-section">
                Senior high school
              </h2>
              <p className="type-small mt-3 text-slate">{seniorHigh.permit}</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
              {seniorHigh.tracks.map((track) => (
                <div key={track.name}>
                  <h3 className="type-sub">{track.name}</h3>
                  <dl className="mt-4">
                    {track.strands.map((strand) => (
                      <div key={strand.name} className="row-line py-4">
                        <dt className="type-item text-slate">{strand.name}</dt>
                        <dd className="type-ui mt-1 text-slate-soft">{strand.full}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* College */}
      <section id="college" aria-labelledby="college-h" className="wrap scroll-mt-24 py-14 lg:py-20">
        <div className="trim grid gap-6 pt-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 id="college-h" className="type-section">
              College
            </h2>
            <p className="mt-3 max-w-[34ch] text-slate">
              Teacher education, business and accountancy, hospitality and tourism,
              and computing.
            </p>
          </div>

          <div className="lg:col-span-8">
            {collegeFields.map((group) => (
              <div key={group.field} className="mb-10 last:mb-0">
                <h3 className="type-sub">{group.field}</h3>
                <ul className="mt-3">
                  {group.programs.map((program) => (
                    <li
                      key={program.name}
                      className="row-line grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[1fr_auto]"
                    >
                      <div>
                        <p className="type-item text-slate">
                          {program.name}
                          {program.short ? (
                            <span className="type-ui ml-2 font-[600] text-slate-soft">
                              {program.short}
                            </span>
                          ) : null}
                        </p>
                        {program.detail ? (
                          <p className="type-ui mt-1.5 max-w-[58ch] text-slate-soft">
                            {program.detail}
                          </p>
                        ) : null}
                      </div>
                      {program.accreditation ? (
                        <p className="type-small self-start whitespace-nowrap rounded-[4px] bg-facade px-2.5 py-1 font-[650] text-royal">
                          {program.accreditation}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-facade">
        <div className="wrap flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="type-section max-w-[18ch]">Found your program?</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admissions" className="btn">
              How to enroll
            </Link>
            <Link href="/about/accreditations" className="btn-line">
              About accreditation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
