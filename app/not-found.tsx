import Link from "next/link";
import { allPages } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <header className="bg-facade">
        <div className="wrap pb-14 pt-10 sm:pt-14 lg:pb-20 lg:pt-20">
          <h1 className="type-title max-w-[16ch]">This page isn&rsquo;t here</h1>
          <p className="type-lead mt-6 max-w-[52ch] text-slate">
            The address may be from the old website, or the page may have moved. One
            of these should get you where you were going.
          </p>
        </div>
      </header>
      <nav aria-label="Main pages" className="wrap py-14 lg:py-20">
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {[{ href: "/", label: "Home" }, ...allPages()].map((item) => (
            <li key={item.href} className="row-line">
              <Link href={item.href} className="type-item block py-3 text-royal hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
