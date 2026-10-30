import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { enrollment, links, requirements, site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "How to enroll at Immaculate Conception College of Balayan: the CK Link portal, the steps for new and returning students, and what to bring.",
};

function Steps({ id, title, intro, steps }: { id: string; title: string; intro: string; steps: string[] }) {
  return (
    <section aria-labelledby={id} className="trim pt-5">
      <h2 id={id} className="type-section">
        {title}
      </h2>
      <p className="mt-3 max-w-[44ch] text-slate">{intro}</p>
      <ol className="mt-6">
        {steps.map((step, index) => (
          <li key={step} className="row-line grid grid-cols-[2.75rem_1fr] py-4">
            <span className="font-display text-[1.75rem] font-[800] leading-none tabular-nums text-royal">
              {index + 1}
            </span>
            <span className="text-slate">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        current="/admissions"
        title="How to enroll at ICC"
        lead="Enrollment runs through the CK Link portal and two offices on campus. New students pre-register online first; returning students start at the Registrar's Office."
      >
        <div className="flex flex-wrap gap-3">
          <a href={links.portal} className="btn">
            Open the enrollment portal
          </a>
          <a href={tel(site.phone)} className="btn-line">
            Call {site.phone}
          </a>
        </div>
      </PageHeader>

      <div className="wrap grid gap-14 py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <Steps
          id="new"
          title="New students"
          intro="Applying to ICC for the first time, including transferees."
          steps={enrollment.newStudents}
        />
        <Steps
          id="returning"
          title="Returning students"
          intro="Already enrolled at ICC and moving up a grade or year level."
          steps={enrollment.returningStudents}
        />
      </div>

      <section aria-labelledby="where-h" className="bg-facade">
        <div className="wrap grid gap-8 py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="lg:col-span-4">
            <h2 id="where-h" className="type-section">
              Where to go
            </h2>
            <Link href="/inside-iccbi/directory" className="link type-ui mt-4 inline-block font-[600]">
              Campus directory
            </Link>
          </div>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            <div className="trim pt-4">
              <dt className="type-sub">Registrar&rsquo;s Office</dt>
              <dd className="mt-2 text-slate">Old Building, College Department</dd>
            </div>
            <div className="trim pt-4">
              <dt className="type-sub">Treasurer&rsquo;s Office</dt>
              <dd className="mt-2 text-slate">Talangpaz Building, 1st floor</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="bring-h" className="wrap py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 id="bring-h" className="type-section">
              What to bring
            </h2>
            <p className="mt-3 max-w-[34ch] text-slate">
              The Registrar&rsquo;s Office sets the list for each school year. Call
              ahead to confirm it before your visit.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {requirements.map((group) => (
              <div key={group.level} className="trim pt-4">
                <h3 className="type-sub">{group.level}</h3>
                <ul className="mt-3">
                  {group.items.map((item) => (
                    <li key={item} className="type-ui row-line py-2.5 text-slate first:border-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="ask-h" className="border-t border-facade-line bg-facade-pale">
        <div className="wrap grid gap-8 py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <h2 id="ask-h" className="type-section lg:col-span-4">
            Questions before you apply
          </h2>
          <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-3 lg:col-span-8">
            <div>
              <dt className="type-small text-slate-soft">Telephone</dt>
              <dd className="mt-1">
                <a href={tel(site.phone)} className="link type-ui font-[600]">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="type-small text-slate-soft">Email</dt>
              <dd className="mt-1 break-words">
                <a href={`mailto:${site.email}`} className="link type-ui font-[600]">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="type-small text-slate-soft">Facebook</dt>
              <dd className="mt-1">
                <a href={links.facebook} className="link type-ui font-[600]">
                  ICCBalayanIncOfficial
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
