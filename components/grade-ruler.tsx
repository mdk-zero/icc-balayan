import Link from "next/link";
import { levels } from "@/lib/site";

/**
 * Grade 1 to the fourth year of college as one ruler. Each level's segment is
 * as wide as the years it spans, so the school's shape is the drawing.
 */
export function GradeRuler({ headingId = "levels" }: { headingId?: string }) {
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="type-sub">
        Grade 1 to college, on one campus
      </h2>

      <ol className="mt-8 grid gap-y-9 md:grid-cols-[6fr_4fr_2fr_4fr]">
        {levels.map((level, index) => {
          const last = index === levels.length - 1;
          return (
            <li key={level.id} className="min-w-0">
              <Link href={level.href} className="group block">
                <div className="relative trim">
                  <ol aria-hidden className="flex">
                    {level.ticks.map((tick, tickIndex) => (
                      <li key={tick} className="relative flex-1 pl-2 pt-3">
                        <span
                          className={`absolute left-0 top-0 w-[2px] bg-royal ${
                            tickIndex === 0 ? "h-7" : "h-3"
                          }`}
                        />
                        <span className="type-small font-[600] tabular-nums text-royal">
                          {tick}
                        </span>
                      </li>
                    ))}
                  </ol>
                  {last ? (
                    <span aria-hidden className="absolute right-0 top-0 h-7 w-[2px] bg-royal" />
                  ) : null}
                </div>
                <div className="pr-4 pt-5">
                  <h3 className="type-sub decoration-2 underline-offset-4 group-hover:underline">
                    {level.name}
                  </h3>
                  <p className="type-small mt-1 text-slate">{level.span}</p>
                  <p className="type-small text-slate">{level.enrolled} enrolled</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
