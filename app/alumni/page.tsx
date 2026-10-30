import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { links, site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Alumni",
  description:
    "Join the ICCnian online alumni directory, request records from the Registrar, and find the Alumni Office of Immaculate Conception College of Balayan.",
};

const asked = [
  "Your full name",
  "Your address",
  "A telephone number",
  "Your email address",
  "The year you graduated from ICC",
  "What you do now",
];

export default function AlumniPage() {
  return (
    <>
      <PageHeader
        current="/alumni"
        title="For ICCnians who have graduated"
        lead="ICCnians now live and work all over the world. The online alumni directory keeps a record of where they are, and helps old classmates find each other again."
      >
        <a href={links.alumniForm} className="btn">
          Join the alumni directory
        </a>
      </PageHeader>

      <div className="wrap grid gap-14 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <section aria-labelledby="join-h" className="lg:col-span-6">
          <h2 id="join-h" className="type-section">
            Joining the directory
          </h2>
          <p className="mt-4 max-w-[52ch] text-slate">
            The form opens in Google Forms and takes a few minutes. It asks for:
          </p>
          <ul className="mt-5 max-w-md">
            {asked.map((item) => (
              <li key={item} className="row-line py-3 text-slate first:border-0">
                {item}
              </li>
            ))}
          </ul>
          <a href={links.alumniForm} className="btn mt-8">
            Open the alumni directory form
          </a>
        </section>

        <aside className="space-y-12 lg:col-span-5 lg:col-start-8">
          <section aria-labelledby="records-h" className="trim pt-5">
            <h2 id="records-h" className="type-sub">
              Transcripts and certificates
            </h2>
            <p className="mt-3 text-slate">
              Requests for a transcript of records, a copy of your diploma or a
              certification go to the Registrar&rsquo;s Office in the Old Building.
              Call first to ask what to bring and how long it takes.
            </p>
            <a href={tel(site.phone)} className="link type-ui mt-4 inline-block font-[600]">
              Call {site.phone}
            </a>
          </section>

          <section aria-labelledby="office-h" className="trim pt-5">
            <h2 id="office-h" className="type-sub">
              The Alumni Office
            </h2>
            <p className="mt-3 text-slate">
              In the Grade School Department building. Visits are best arranged
              ahead through the school&rsquo;s inbox.
            </p>
            <a href={`mailto:${site.email}`} className="link type-ui mt-4 inline-block font-[600]">
              {site.email}
            </a>
          </section>
        </aside>
      </div>
    </>
  );
}
