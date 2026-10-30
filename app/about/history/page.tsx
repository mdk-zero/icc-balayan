import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { history, type Milestone } from "@/lib/site";

export const metadata: Metadata = {
  title: "History",
  description:
    "The history of Immaculate Conception College of Balayan, from its founding by Fr. Aniceto Cordero in 1935 to the buildings and programs of today.",
};

function byDecade(milestones: Milestone[]) {
  const groups = new Map<string, Milestone[]>();
  for (const milestone of milestones) {
    const decade = `${milestone.year.slice(0, 3)}0s`;
    groups.set(decade, [...(groups.get(decade) ?? []), milestone]);
  }
  return [...groups.entries()];
}

export default function HistoryPage() {
  const decades = byDecade(history);

  return (
    <>
      <PageHeader
        current="/about/history"
        title="Nine decades on Plaza Mabini"
        lead="A parish priest founded the school in an old convent in 1935. The Augustinian Recollect Sisters built it, one course and one building at a time."
      />

      <div className="wrap py-14 lg:py-20">
        {decades.map(([decade, milestones]) => (
          <section
            key={decade}
            aria-labelledby={`d-${decade}`}
            className="trim grid gap-4 pb-6 pt-5 lg:grid-cols-12 lg:gap-10"
          >
            <h2
              id={`d-${decade}`}
              className="font-display text-[clamp(3rem,6vw,5rem)] font-[800] leading-[0.85] lg:col-span-3 lg:self-start lg:sticky lg:top-28"
            >
              {decade}
            </h2>
            <ol className="lg:col-span-9">
              {milestones.map((milestone) => (
                <li
                  key={milestone.year}
                  className="row-line grid gap-x-8 gap-y-1 py-6 first:border-0 first:pt-2 sm:grid-cols-[6rem_1fr]"
                >
                  <p className="font-display text-[2rem] font-[750] leading-none tabular-nums text-royal">
                    {milestone.year}
                  </p>
                  <div>
                    <h3 className="type-item text-slate">{milestone.title}</h3>
                    <p className="mt-2 max-w-[62ch] text-slate">{milestone.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="bg-facade-pale">
        <div className="wrap flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
          <p className="type-sub max-w-[32ch]">
            See where the Talangpaz, Regina Angelorum and other buildings stand today.
          </p>
          <Link href="/inside-iccbi/directory" className="btn self-start lg:self-auto">
            Open the campus directory
          </Link>
        </div>
      </section>
    </>
  );
}
