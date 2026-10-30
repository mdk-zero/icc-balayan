import type { Metadata } from "next";
import Link from "next/link";
import { MarchPlayer } from "@/components/march-player";
import { PageHeader } from "@/components/page-header";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "ICC March",
  description: "Listen to or download the ICC March, the official march of Immaculate Conception College of Balayan.",
};

export default function MarchPage() {
  return (
    <>
      <PageHeader
        current="/about/icc-march"
        title="The ICC March"
        lead="The college's official march. Play it here, or download the MP3 to keep."
      />

      <section aria-label="Player" className="wrap py-14 lg:py-20">
        <div className="trim max-w-4xl pt-8">
          <MarchPlayer src={links.march} />
          <a
            href={links.march}
            download="ICC-March.mp3"
            className="link type-ui mt-10 inline-block font-[600]"
          >
            Download the ICC March (MP3, 1.6 MB)
          </a>
        </div>
      </section>

      <nav aria-label="Related" className="border-t border-facade-line bg-facade-pale">
        <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-3 py-12">
          <Link href="/about/seal" className="link type-ui font-[600]">
            The school seal
          </Link>
          <Link href="/about/history" className="link type-ui font-[600]">
            The history of ICC
          </Link>
        </div>
      </nav>
    </>
  );
}
