import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Portrait } from "@/components/portrait";
import { administrativeBoard } from "@/lib/site";

export const metadata: Metadata = {
  title: "Administrative Board",
  description:
    "The School Administrative Board of Immaculate Conception College of Balayan: the president, treasurer, principal and registrar.",
};

export default function AdministrativeBoardPage() {
  return (
    <>
      <PageHeader
        current="/inside-iccbi/administrative-board"
        title="School Administrative Board"
        lead="The A.R. Sisters who run the school day to day, from the President's office to the Registrar's."
      />

      <section aria-label="Members" className="wrap py-14 lg:py-20">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:gap-x-10">
          {administrativeBoard.map((person) => (
            <li key={person.name}>
              {person.photo ? (
                <Portrait
                  src={person.photo}
                  zoom={1.12}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 30vw, 45vw"
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

      <section className="bg-facade-pale">
        <div className="wrap flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
          <p className="type-sub max-w-[36ch]">
            Looking for one of their offices? The directory lists each by building and floor.
          </p>
          <Link href="/inside-iccbi/directory" className="btn self-start lg:self-auto">
            Open the directory
          </Link>
        </div>
      </section>
    </>
  );
}
