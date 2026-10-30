import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Portrait } from "@/components/portrait";
import { administrators } from "@/lib/site";

export const metadata: Metadata = {
  title: "Administrators since 1935",
  description:
    "The Augustinian Recollect Sisters who have led Immaculate Conception College of Balayan from 1935 to the present.",
};

export default function AdministratorsPage() {
  return (
    <>
      <PageHeader
        current="/inside-iccbi/administrators"
        title="Administrators since 1935"
        lead="The A.R. Sisters who have led ICC, in the order each began, from Sr. Amanda in 1935 to Sr. Cynthia today."
      />

      <section aria-label="Administrators, 1935 to the present" className="wrap py-14 lg:py-20">
        <ol className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-6">
          {administrators.map((person) => (
            <li key={`${person.years}-${person.name}`}>
              <Portrait
                src={person.photo}
                zoom={1.27}
                shape="square"
                sizes="(min-width: 1024px) 190px, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 45vw"
              />
              <div className="trim mt-3 pt-2.5">
                <p className="font-display text-[1.375rem] font-[750] leading-none tabular-nums text-royal">
                  {person.years}
                </p>
                <p className="type-ui mt-1.5 font-[600] text-slate">{person.name}</p>
                {person.role ? (
                  <p className="type-small mt-0.5 text-slate-soft">{person.role}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
