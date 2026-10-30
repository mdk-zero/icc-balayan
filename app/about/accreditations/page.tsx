import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { accreditations, accreditors } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accreditations",
  description:
    "Which Immaculate Conception College of Balayan programs are accredited by PAASCU and PACUCOA, and which carry TESDA National Certificates.",
};

export default function AccreditationPage() {
  return (
    <>
      <PageHeader
        current="/about/accreditations"
        title="Accreditations"
        lead="Accreditation is a voluntary review of a school's programs by an independent body. ICC's grade school, junior high and several college programs have been through it."
      />

      <section aria-labelledby="standing-h" className="wrap py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 id="standing-h" className="type-section">
              Program by program
            </h2>
            <p className="mt-3 max-w-[34ch] text-slate">
              Every accreditation and embedded certificate the school publishes.
            </p>
          </div>
          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Accreditation by program</caption>
              <thead className="type-small text-slate-soft">
                <tr className="border-b-[3px] border-royal">
                  <th scope="col" className="py-2 pr-4 font-[600]">
                    Program
                  </th>
                  <th scope="col" className="hidden py-2 pr-4 font-[600] sm:table-cell">
                    By
                  </th>
                  <th scope="col" className="hidden py-2 font-[600] sm:table-cell">
                    Level or certificate
                  </th>
                </tr>
              </thead>
              <tbody>
                {accreditations.map((row) => (
                  <tr key={row.program} className="border-b border-facade-line align-baseline">
                    <th scope="row" className="py-4 pr-4 font-text font-normal text-slate">
                      {row.program}
                      <span className="type-ui mt-1 block sm:hidden">
                        <span className="font-[650] text-royal">{row.body}</span>{" "}
                        <span className="text-slate">{row.standing}</span>
                      </span>
                    </th>
                    <td className="type-ui hidden py-4 pr-4 font-[650] text-royal sm:table-cell">
                      {row.body}
                    </td>
                    <td className="type-ui hidden py-4 text-slate sm:table-cell">{row.standing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="levels-h" className="bg-facade">
        <div className="wrap grid gap-6 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <h2 id="levels-h" className="type-section lg:col-span-4">
            What the levels mean
          </h2>
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            <div className="trim pt-4">
              <dt className="type-sub">Level 1</dt>
              <dd className="mt-2 text-slate">
                Granted after a program passes its first formal survey by the
                accrediting body.
              </dd>
            </div>
            <div className="trim pt-4">
              <dt className="type-sub">Level 2</dt>
              <dd className="mt-2 text-slate">
                The program has been surveyed again and re-accredited.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="bodies-h" className="wrap py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <h2 id="bodies-h" className="type-section lg:col-span-4">
            The accrediting bodies
          </h2>
          <ul className="lg:col-span-8">
            {accreditors.map((body) => (
              <li key={body.id} className="row-line grid gap-x-8 gap-y-1 py-5 first:border-0 first:pt-0 sm:grid-cols-[8rem_1fr]">
                <p className="type-sub">{body.name}</p>
                <div>
                  <p className="text-slate">{body.full}</p>
                  <p className="type-ui mt-1 text-slate-soft">Reviews: {body.reviews}</p>
                  <a href={body.href} className="link type-ui mt-2 inline-block font-[600]">
                    {body.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
