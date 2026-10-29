import type { Metadata } from "next";
import { ContactForm } from "@/app/contact/contact-form";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Immaculate Conception College of Balayan — Plaza Mabini St., Balayan, Batangas 4213. Telephone (043) 727-6760.",
};

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Immaculate+Conception+College+Balayan+Batangas";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <PageIntro
          title="Write to us, or come up the plaza."
          lead="The office answers questions about admissions, records and programmes. A call is quickest; a message through this page reaches the same inbox."
          current="Contact"
        />

        <section className="border-b border-rule">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-16 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-20">
            <div className="lg:col-span-5">
              <h2 className="display display-md text-ink">The office</h2>

              <dl className="mt-8">
                <div className="border-t border-rule py-5">
                  <dt className="label text-muted">Address</dt>
                  <dd className="mt-2 leading-relaxed text-ink">{site.address}</dd>
                </div>
                <div className="border-t border-rule py-5">
                  <dt className="label text-muted">Telephone</dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
                      className="transition-colors hover:text-blue-mid"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-rule py-5">
                  <dt className="label text-muted">Telefax</dt>
                  <dd className="mt-2 text-ink">{site.fax}</dd>
                </div>
                <div className="border-t border-rule py-5">
                  <dt className="label text-muted">Email</dt>
                  <dd className="mt-2 break-words">
                    <a
                      href={`mailto:${site.email}`}
                      className="transition-colors hover:text-blue-mid"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="border-y border-rule py-5">
                  <dt className="label text-muted">Facebook</dt>
                  <dd className="mt-2">
                    <a
                      href={site.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-blue-mid"
                    >
                      ICCBalayanIncOfficial
                    </a>
                  </dd>
                </div>
              </dl>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block border border-gold/60 px-6 py-3 text-sm text-blue transition-colors hover:bg-gold/10"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="display display-md text-ink">Send a message</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Include the student&rsquo;s level and the school year, so the office
                can answer without a round trip.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-linen/50">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 lg:grid-cols-12 lg:px-10 lg:py-16">
            <div className="lg:col-span-4">
              <h2 className="display display-md text-ink">Finding the campus</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-xl leading-relaxed text-muted">
                The college stands on Plaza Mabini, in the town center of Balayan,
                Batangas — a short walk from the municipal hall and the plaza
                itself.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                Campus visits are best arranged ahead with the office so someone
                can meet you at the gate.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
