# ICC Balayan — website redesign

A redesign of iccbalayan.edu.ph, built with Next.js (App Router) and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Pages

- `/` — frontispiece hero, enrollment by level, mission/vision preview, programmes, accreditation, history, admissions
- `/about` — mission, vision, full 1935–present timeline
- `/academics` — basic education, senior high tracks, college programmes, accreditation explained
- `/admissions` — the process, requirements checklist, contact details
- `/contact` — office details, Google Maps link, message form

## Content status

Institutional copy — history, mission, vision, programmes, accreditation levels, address, phone, email — is taken from the existing site. Two things are editorial placeholders that the school must confirm before launch:

1. **Admissions requirements** are the standard Philippine school checklist, not an official list from the Registrar's Office.
2. **Enrollment figures** (700+ / 422+ / 260+ / 850+) are carried over from the old homepage and should be refreshed.
3. **The message form** composes an email in the visitor's mail app (`mailto:`); there is no server-side delivery yet.
4. **Photography and the official crest** are not included. The seal is drawn; image slots are intentionally absent rather than filled with stock photos.

## Design tokens

Defined in `app/globals.css`: Marian blue (`#10243f`), antique gold (`#85652a` / `#c9ae79`), ivory (`#fbf8f1`), linen (`#f2ece0`). Display type is Cormorant Garamond; body is Archivo. The seal in `components/seal.tsx` is a drawn placeholder for the official crest.
