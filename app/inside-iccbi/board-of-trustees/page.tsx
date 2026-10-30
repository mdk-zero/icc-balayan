import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Portrait } from "@/components/portrait";
import { trustees } from "@/lib/site";

export const metadata: Metadata = {
  title: "Board of Trustees",
  description:
    "The Board of Trustees of Immaculate Conception College of Balayan: the General Council of the Augustinian Recollect Sisters.",
};

export default function TrusteesPage() {
  return (
    <>
      <PageHeader
        current="/inside-iccbi/board-of-trustees"
        title="Board of Trustees"
        lead="The General Council of the Augustinian Recollect Sisters, the congregation that has run ICC since 1935 to give the Filipino youth a solid, well-grounded Catholic education."
      />

      <section aria-label="Members" className="wrap py-14 lg:py-20">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {trustees.map((person) => (
            <li key={person.name}>
              {person.photo ? (
                <Portrait
                  src={person.photo}
                  zoom={1.08}
                  sizes="(min-width: 1024px) 290px, (min-width: 768px) 30vw, 45vw"
                />
              ) : null}
              <div className="trim mt-4 pt-3">
                <p className="type-item text-slate">{person.name}</p>
                <p className="type-ui mt-1 text-slate-soft">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
