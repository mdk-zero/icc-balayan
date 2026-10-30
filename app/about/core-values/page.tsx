import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { coreValues } from "@/lib/site";

export const metadata: Metadata = {
  title: "Core values",
  description:
    "The five core values of Immaculate Conception College of Balayan: integrity, collaboration, compassion, benevolence and innovation.",
};

export default function CoreValuesPage() {
  return (
    <>
      <PageHeader
        current="/about/core-values"
        title="Core values"
        lead="Five values the school draws from the teaching of St. Augustine, for students, teachers and staff alike."
      >
        <nav aria-label="The five values">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-[750] uppercase leading-[1.05]">
            {coreValues.map((value) => (
              <li key={value.id}>
                <a
                  href={`#${value.id}`}
                  className="text-royal decoration-[3px] underline-offset-[6px] hover:underline"
                >
                  {value.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="wrap py-14 lg:py-20">
        {coreValues.map((value) => (
          <section
            key={value.id}
            id={value.id}
            aria-labelledby={`${value.id}-h`}
            className="trim grid scroll-mt-24 gap-4 pb-12 pt-5 lg:grid-cols-12 lg:gap-10 lg:pb-16"
          >
            <h2
              id={`${value.id}-h`}
              className="font-display text-[clamp(2.75rem,5.5vw,4.75rem)] font-[800] uppercase leading-[0.9] lg:col-span-5"
            >
              {value.name}
            </h2>
            <p className="max-w-[62ch] text-slate lg:col-span-7 lg:pt-2">{value.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
