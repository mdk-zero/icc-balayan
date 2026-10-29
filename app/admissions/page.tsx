import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "How to apply to Immaculate Conception College of Balayan — the four steps, the documents to prepare for basic education, senior high and college, and who to contact.",
};

const steps = [
  {
    title: "Inquire",
    body: "Call or email the office, or message the official Facebook page. Tell us the level you are applying for, and the strand or programme if you already know it.",
  },
  {
    title: "Prepare your records",
    body: "Gather the documents for your level from the checklist below. Transferees should also request an honorable dismissal from their previous school.",
  },
  {
    title: "Visit the campus",
    body: "Submit your documents at the office on Plaza Mabini. Applicants may be scheduled for an interview or an entrance assessment, depending on the level.",
  },
  {
    title: "Enroll",
    body: "Complete the enrollment form and settle the fees at the cashier to secure your slot for the school year.",
  },
];

const requirements = [
  {
    level: "Elementary and Junior High",
    items: [
      "Report card (Form 138)",
      "PSA birth certificate",
      "Certificate of good moral character",
      "Four 2×2 ID photographs",
      "Honorable dismissal, for transferees",
    ],
  },
  {
    level: "Senior High School",
    items: [
      "Report card (Form 138) or certificate of completion",
      "PSA birth certificate",
      "Certificate of good moral character",
      "Four 2×2 ID photographs",
    ],
  },
  {
    level: "College",
    items: [
      "Report card (Form 138)",
      "PSA birth certificate",
      "Certificate of good moral character",
      "Four 2×2 ID photographs",
      "Honorable dismissal and transcript, for transferees",
    ],
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <PageIntro
          title="Begin at ICCBI."
          lead="Admission runs on documents and a conversation. Here is the order of things, what to bring, and who to ask when something is unclear."
          current="Admissions"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
              className="bg-blue px-6 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-blue-mid"
            >
              Call the office
            </a>
            <a href={`mailto:${site.email}`} className="link-line text-sm text-ink">
              {site.email}
            </a>
          </div>
        </PageIntro>

        {/* The sequence */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
            <h2 className="display display-lg text-ink">The process, in order</h2>
            <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.title} className="border-t border-gold/50 pt-5">
                  <p className="font-display text-3xl leading-none text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Requirements */}
        <section className="border-b border-rule bg-linen/40">
          <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="display display-lg text-ink">What to bring</h2>
                <p className="mt-3 max-w-xl text-muted">
                  The same four documents cover most applicants; the level decides
                  what else is asked for.
                </p>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Requirements are set each school year. Confirm the current
                checklist with the office before your visit.
              </p>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {requirements.map((group) => (
                <div key={group.level} className="border-t border-rule pt-5">
                  <h3 className="font-display text-xl text-ink">{group.level}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-blue text-paper">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-20">
            <div className="lg:col-span-6">
              <h2 className="display display-md text-paper">
                Ask before you travel.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/65">
                A short call settles most questions — which documents are current,
                whether a slot is open, and when the office is best visited.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-block border border-gold/60 px-6 py-3 text-sm text-gold-soft transition-colors hover:bg-gold/10"
              >
                Send a message
              </Link>
            </div>
            <dl className="lg:col-span-5 lg:col-start-8">
              <div className="border-t border-paper/15 py-4">
                <dt className="label text-gold-soft">Telephone</dt>
                <dd className="mt-1 text-paper">{site.phone}</dd>
              </div>
              <div className="border-t border-paper/15 py-4">
                <dt className="label text-gold-soft">Telefax</dt>
                <dd className="mt-1 text-paper">{site.fax}</dd>
              </div>
              <div className="border-t border-paper/15 py-4">
                <dt className="label text-gold-soft">Email</dt>
                <dd className="mt-1 break-words text-paper">{site.email}</dd>
              </div>
              <div className="border-y border-paper/15 py-4">
                <dt className="label text-gold-soft">Office</dt>
                <dd className="mt-1 leading-relaxed text-paper">{site.address}</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
