import type { Metadata } from "next";
import Link from "next/link";
import { MailtoForm, type FormField } from "@/components/mailto-form";
import { PageHeader } from "@/components/page-header";
import { links, site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Immaculate Conception College of Balayan: Plaza Mabini St., Balayan, Batangas 4213. Telephone (043) 727-6760, mail@iccbalayan.edu.ph.",
};

const fields: FormField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Mobile number", type: "tel", autoComplete: "tel" },
  {
    name: "topic",
    label: "Topic",
    type: "select",
    required: true,
    options: [
      "Admissions and enrollment",
      "Programs and strands",
      "Registrar and records",
      "Alumni",
      "Something else",
    ],
  },
  { name: "message", label: "Message", type: "textarea", required: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        current="/contact"
        title="Contact the school"
        lead="Call the Directress' Office, write to the school's inbox, or visit us on Plaza Mabini. For enrollment questions, say which level and school year you are asking about."
      />

      <div className="wrap grid gap-14 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <section aria-labelledby="reach-h" className="lg:col-span-4">
          <h2 id="reach-h" className="type-section">
            Reach us
          </h2>
          <dl className="mt-6">
            <div className="trim py-4">
              <dt className="type-small text-slate-soft">Directress&rsquo; Office</dt>
              <dd className="mt-1">
                <a href={tel(site.phone)} className="link type-ui text-[1.125rem] font-[650]">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="row-line py-4">
              <dt className="type-small text-slate-soft">Telefax</dt>
              <dd className="type-ui mt-1 text-[1.125rem] text-slate">{site.fax}</dd>
            </div>
            <div className="row-line py-4">
              <dt className="type-small text-slate-soft">Email</dt>
              <dd className="mt-1 break-words">
                <a href={`mailto:${site.email}`} className="link type-ui text-[1.125rem] font-[650]">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="row-line py-4">
              <dt className="type-small text-slate-soft">Address</dt>
              <dd className="mt-1 text-slate">
                <address className="not-italic">
                  {site.street}
                  <br />
                  {site.town}
                  <br />
                  Philippines
                </address>
              </dd>
            </div>
            <div className="row-line py-4">
              <dt className="type-small text-slate-soft">Online</dt>
              <dd className="type-ui mt-1 flex flex-wrap gap-x-5 gap-y-1">
                <a href={links.facebook} className="link font-[600]">
                  Facebook
                </a>
                <a href={links.youtube} className="link font-[600]">
                  YouTube
                </a>
              </dd>
            </div>
          </dl>
          <p className="type-ui mt-6 text-slate">
            Looking for a particular office?{" "}
            <Link href="/inside-iccbi/directory" className="link font-[600]">
              See the campus directory
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="write-h" className="lg:col-span-7 lg:col-start-6">
          <h2 id="write-h" className="type-section">
            Write to us
          </h2>
          <div className="mt-6">
            <MailtoForm
              to={site.email}
              subject="{topic}: {name}"
              fields={fields}
              submitLabel="Write the email"
            />
          </div>
        </section>
      </div>

      <section aria-labelledby="map-h" className="bg-facade">
        <div className="wrap py-14 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="map-h" className="type-section">
              Plaza Mabini, Balayan
            </h2>
            <a href={links.maps} className="btn">
              Get directions
            </a>
          </div>
          <iframe
            title="Map of Immaculate Conception College of Balayan"
            src={links.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-8 block aspect-[4/3] w-full rounded-[4px] border-[3px] border-royal bg-facade-pale sm:aspect-[16/7]"
          />
        </div>
      </section>
    </>
  );
}
