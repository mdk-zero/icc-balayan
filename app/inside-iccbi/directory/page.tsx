import type { Metadata } from "next";
import Link from "next/link";
import { CampusDirectory } from "@/components/campus-directory";
import { PageHeader } from "@/components/page-header";
import { buildings, links, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "Where every office, laboratory, library and classroom is on the Immaculate Conception College of Balayan campus, building by building.",
};

export default function DirectoryPage() {
  return (
    <>
      <PageHeader
        current="/inside-iccbi/directory"
        title="Offices and departments"
        lead="Every office, laboratory, library and classroom on campus, building by building and floor by floor. Search for the one you need."
      >
        <div className="flex flex-wrap gap-3">
          <a href={links.maps} className="btn">
            Open in Google Maps
          </a>
          <Link href="/facilities" className="btn-line">
            See photos of the facilities
          </Link>
        </div>
      </PageHeader>

      <section aria-label="Campus directory" className="wrap py-14 lg:py-20">
        <CampusDirectory buildings={buildings} phone={site.phone} />
      </section>
    </>
  );
}
