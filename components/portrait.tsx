import Image from "next/image";

/**
 * A portrait cropped to a fixed shape. The school's photos come with frames
 * printed into them (white, navy or gold), so `zoom` scales each set just
 * enough to crop its frame away.
 */
export function Portrait({
  src,
  zoom,
  shape = "portrait",
  sizes,
}: {
  src: string;
  zoom: number;
  shape?: "portrait" | "square";
  sizes: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-facade-pale ${
        shape === "square" ? "aspect-square" : "aspect-[4/5]"
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover object-[50%_25%]"
        style={{ transform: `scale(${zoom})` }}
      />
    </div>
  );
}
