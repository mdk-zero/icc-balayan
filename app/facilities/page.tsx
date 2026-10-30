import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { PhotoGallery } from "@/components/photo-gallery";
import { facilityGroups } from "@/lib/site";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Photos of the libraries, hospitality and tourism rooms, classrooms and grounds of Immaculate Conception College of Balayan.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        current="/facilities"
        title="Facilities"
        lead="The libraries, the rooms where hospitality and tourism students train, and the grounds on Plaza Mabini. Choose a photo to see it larger."
        aside={
          <Image
            src="/school.jpg"
            alt="An ICC campus building, painted powder blue, seen from the school grounds"
            width={1833}
            height={858}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="-mb-px w-full"
            priority
          />
        }
      >
        <nav aria-label="Facilities on this page" className="type-ui flex flex-wrap gap-x-6 gap-y-2">
          {facilityGroups.map((group) => (
            <a key={group.id} href={`#${group.id}`} className="link font-[600]">
              {group.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {facilityGroups.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-h`}
          className={`scroll-mt-24 ${i % 2 === 1 ? "bg-facade-pale" : ""}`}
        >
          <div className="wrap py-14 lg:py-20">
            <div className="trim mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-5">
              <h2 id={`${group.id}-h`} className="type-section">
                {group.title}
              </h2>
              <p className="text-slate">
                {group.line} <span className="text-slate-soft">{group.photos.length} photos</span>
              </p>
            </div>
            <PhotoGallery photos={group.photos} label={group.title} />
          </div>
        </section>
      ))}

      <section className="bg-facade">
        <div className="wrap flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
          <p className="type-sub max-w-[34ch]">
            Need to find a room? The directory lists every office, lab and library by
            building and floor.
          </p>
          <Link href="/inside-iccbi/directory" className="btn self-start lg:self-auto">
            Open the directory
          </Link>
        </div>
      </section>
    </>
  );
}
