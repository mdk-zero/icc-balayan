"use client";

import { useId, useMemo, useState } from "react";
import type { Building } from "@/lib/site";

/** Lowercase, accents and apostrophes removed, so "registrars" finds "Registrar's". */
function normalizeChar(char: string) {
  return char
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "");
}

function normalize(text: string) {
  return [...text].map(normalizeChar).join("");
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  // Map each normalized character back to its index in the original text.
  const map: number[] = [];
  let normalized = "";
  [...text].forEach((char, index) => {
    for (const out of normalizeChar(char)) {
      normalized += out;
      map.push(index);
    }
  });
  const found = normalized.indexOf(query);
  if (found === -1) return <>{text}</>;
  const start = map[found];
  const end = map[found + query.length - 1] + 1;
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded-[2px] bg-facade px-0.5 text-royal">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}

/**
 * Every building as a directory board: floors stacked top to bottom with the
 * rooms on each. Typing in the box narrows the boards to matching rooms.
 */
export function CampusDirectory({ buildings, phone }: { buildings: Building[]; phone: string }) {
  const inputId = useId();
  const [raw, setRaw] = useState("");
  const query = normalize(raw.trim());

  const visible = useMemo(() => {
    if (!query) return buildings;
    return buildings
      .map((building) => {
        const buildingMatch = normalize(building.name).includes(query);
        const floors = building.floors
          .map((floor) => ({
            ...floor,
            rooms: buildingMatch
              ? floor.rooms
              : floor.rooms.filter((room) => normalize(room).includes(query)),
          }))
          .filter((floor) => floor.rooms.length > 0);
        return { ...building, floors };
      })
      .filter((building) => building.floors.length > 0);
  }, [buildings, query]);

  const roomCount = visible.reduce(
    (count, building) => count + building.floors.reduce((n, floor) => n + floor.rooms.length, 0),
    0,
  );

  return (
    <div>
      <div className="max-w-xl">
        <label htmlFor={inputId} className="field-label">
          Find an office, lab or room
        </label>
        <input
          id={inputId}
          type="search"
          value={raw}
          onChange={(event) => setRaw(event.target.value)}
          placeholder="Registrar, library, clinic…"
          autoComplete="off"
          className="field"
        />
        <p role="status" aria-live="polite" className="type-small mt-2 min-h-[1.5em] text-slate-soft">
          {query
            ? roomCount > 0
              ? `${roomCount} ${roomCount === 1 ? "match" : "matches"} in ${visible.length} ${
                  visible.length === 1 ? "building" : "buildings"
                }`
              : ""
            : ""}
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="trim mt-6 pt-5">
          <p className="type-sub">Nothing on campus matches &ldquo;{raw.trim()}&rdquo;.</p>
          <p className="mt-2 text-slate">
            Try a shorter word, such as &ldquo;lab&rdquo; or &ldquo;office&rdquo;, or call the
            Directress&rsquo; Office at {phone}.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {visible.map((building) => (
            <li key={building.id} id={building.id} className="scroll-mt-24">
              <h3 className="type-sub">
                <Highlight text={building.name} query={query} />
              </h3>
              {building.department ? (
                <p className="type-ui mt-1 text-slate-soft">{building.department}</p>
              ) : null}

              <div className="mt-4 border-x-[3px] border-b border-t-[6px] border-royal">
                {building.floors.map((floor) => (
                  <div
                    key={floor.label || "rooms"}
                    className="grid grid-cols-[4.75rem_1fr] border-t border-facade-line first:border-t-0"
                  >
                    <p className="type-small bg-facade-pale px-3 py-3 font-[650] leading-tight text-royal">
                      {floor.label ? (
                        <>
                          {floor.label}
                          <span className="block font-[500] text-slate-soft">floor</span>
                        </>
                      ) : (
                        <span className="text-slate-soft">Rooms</span>
                      )}
                    </p>
                    <ul className="type-ui px-4 py-3 text-slate">
                      {floor.rooms.map((room) => (
                        <li key={room} className="py-0.5">
                          <Highlight text={room} query={query} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {building.note && !query ? (
                <p className="type-small mt-3 max-w-[52ch] text-slate-soft">{building.note}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
