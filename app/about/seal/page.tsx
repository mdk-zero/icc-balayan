import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SealKey, type SealPart } from "@/components/seal-key";

export const metadata: Metadata = {
  title: "School seal",
  description: "What each part of the Immaculate Conception College of Balayan seal stands for.",
};

// Wording follows the old site's School Seal page.
const parts: SealPart[] = [
  {
    title: "The shield",
    body: "Bears the national colors, red, white and blue, as a sign that the institution is genuinely Filipino. The field of the shield expresses Patria, country.",
    x: 33,
    y: 74,
  },
  {
    title: "The cross",
    body: "Occupies the center of the shield, the most important position in the field. It symbolizes the missionary character of the congregation that runs the school.",
    x: 50,
    y: 36,
  },
  {
    title: "The Augustinian Recollect emblem",
    body: "On the dexter side, the viewer's left: the emblem of the Congregation of the Augustinian Recollect Sisters, a flaming heart pierced by an arrow above an open book.",
    x: 39,
    y: 57,
  },
  {
    title: "The attributes of Mary",
    body: "On the sinister side, the viewer's right: the rosary, forming the letter M for Mary, and the lily, for purity.",
    x: 61,
    y: 52,
  },
  {
    title: "The motto",
    body: "Patria, Scientia, Virtus (country, knowledge, virtue) embraces the shield.",
    x: 50,
    y: 17.5,
  },
  {
    title: "The rim",
    body: "Carries the college's name, with its home in Batangas along the lower portion.",
    x: 58.5,
    y: 88,
  },
];

export default function SealPage() {
  return (
    <>
      <PageHeader
        current="/about/seal"
        title="The school seal"
        lead="The seal puts the school's country, its founders and its patroness on one shield. Point at a part of the seal to find it in the key."
      />

      <section aria-label="The parts of the seal" className="wrap py-14 lg:py-20">
        <SealKey parts={parts} />
      </section>
    </>
  );
}
