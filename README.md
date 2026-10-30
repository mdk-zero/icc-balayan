# ICC Balayan — website redesign

A redesign of iccbalayan.edu.ph, built with Next.js 16 (App Router) and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Pages

The menus mirror the old site's, so returning visitors find pages where they left them.

| Path | Old site page |
| --- | --- |
| `/` | Home |
| `/about` | About Us |
| `/about/history` | History of ICC |
| `/about/mission-and-vision` | Mission and Vision, plus the Philosophy of Education |
| `/about/core-values` | Core Values |
| `/about/seal` | School Seal |
| `/about/accreditations` | Accreditations |
| `/about/icc-march` | ICC March |
| `/inside-iccbi/administrators` | ICC Admin 1935–Present |
| `/inside-iccbi/board-of-trustees` | Board of Trustees |
| `/inside-iccbi/administrative-board` | Administrative Board |
| `/inside-iccbi/directory` | Directory |
| `/academics` | Academics |
| `/admissions` | Admission (registration forms) |
| `/facilities` | Facilities |
| `/news`, `/news/[slug]` | News (blog) |
| `/alumni` | Alumni Directory |
| `/contact` | Contact |

Every old WordPress address redirects to its new page (`public/.htaccess`), so links already shared on Facebook or in search results keep working. The old site's Library link is left out because `library.iccbalayan.edu.ph` no longer resolves.

## Editing content

Almost all copy lives in `lib/site.ts`: contact details, mission and vision, core values, programs, accreditation, enrollment steps, history, leadership, the campus directory and the facilities photos. News posts go in `lib/news.ts`; the file explains the format.

The core values, the philosophy of education and the mission/vision wording are transcribed from the school's January 2026 graphics on the old site. Photos, portraits and the ICC March MP3 were copied from the old site into `public/images/` and `public/media/`.

Images are served exactly as they are in `public/`; nothing resizes them on the server. Compress new photos before adding them: about 1,800 px wide for full-width photos and 900 px for portraits, as JPEG or WebP, usually under 300 KB.

## Deploying to cPanel

The site is exported as plain HTML, CSS, JavaScript and images, so any cPanel host can serve it. It needs no Node.js and no terminal on the server.

**1. Build the upload file.** On this computer, run `npm run zip`. It builds the site into `out/` and packs it as `iccbi-website.zip` in the project folder. In Windows File Explorer the project is at `\\wsl.localhost\archlinux\home\mdk0\Projects\icc-website`.

**2. Back up the current site.** The WordPress site lives in `public_html`. In cPanel, open **File Manager**, select `public_html`, choose **Compress** and download the archive. Also export the WordPress database from **phpMyAdmin**.

**3. Try it on a subdomain first (recommended).** In cPanel, open **Domains** and create something like `new.iccbalayan.edu.ph`, with its own folder. Upload the zip there as in step 4 and check every page. The site must sit at the top of a domain or subdomain. It will not work in a subfolder like `public_html/new/`, because its links start at `/`.

**4. Upload and extract.**
1. In **File Manager**, open the target folder (`public_html` for the main site).
2. Click **Upload**, choose `iccbi-website.zip` and wait for it to finish.
3. Back in the folder, right-click the zip, choose **Extract**, and extract into the same folder.
4. Delete the zip.

`index.html` and `.htaccess` must end up directly inside the folder, not in a subfolder. Turn on **Settings › Show Hidden Files** to see `.htaccess`.

**5. Replace WordPress (main site only).** Once the backup is downloaded, move the WordPress files out of `public_html` before extracting: `wp-admin`, `wp-content`, `wp-includes`, `wp-*.php`, `index.php`, `xmlrpc.php` and the old `.htaccess`. Leave any folder you don't recognise alone, because subdomains and other services often keep their files inside `public_html`.

**6. Turn on HTTPS.** In **Domains**, switch on **Force HTTPS Redirect** for the domain.

**To update the site later**, edit the files, run `npm run zip` again, then upload and extract the new zip over the old files. Choose to overwrite when asked.

## Before launch: content the school must confirm

Search the code for `CONFIRM:` to find each one.

1. **Mission and vision labels.** The old About page calls "A life-giving and innovating school community…" the mission and the four commitments the vision. The school's January 2026 Mission and Vision graphic labels them the other way round. Swap the two words in `site.statementLabels` once the school decides.
2. **Accreditation is out of date on the old site.** Its certificates all expired in 2016–2017 (PAASCU elementary to March 2017, PAASCU high school to May 2016, PACUCOA BSBA and BEEd to April 2017). The redesign shows the levels as the old site states them; the school must confirm each program's current level.
3. **Admission requirements** are the usual Philippine school checklist, not an official list from the Registrar's Office.
4. **Enrollment figures** (700+ / 422+ / 260+ / 850+) are carried over from the old homepage.
5. **Sr. Cynthia F. Camuta's years.** The old site lists 1994–2000, which looks like a typo; she is shown as 2024–present.
6. **Facilities photos** date from 2017 and have no room names on the old site, so captions describe what is shown.
7. **Library catalogue.** Restore a Library link once `library.iccbalayan.edu.ph` is back online.
8. **The contact form** composes an email in the visitor's mail app (`mailto:`). Nothing is sent from the server. The alumni directory uses the school's existing Google Form.

## Design

Colors are sampled from the campus: the powder blue the buildings are painted (`facade`, `#86c1ea`), the shield's royal blue (`royal`, `#2e2e8c`), the dark window frames (`slate`, `#1f2a3d`) and the shield's red (`crest`, used only to mark the current page). Tokens are in `app/globals.css`.

Type is Sofia Sans Extra Condensed for display, echoing the lettering around the seal; Literata for reading text; and Sofia Sans for navigation, buttons and captions.

The grade ruler (`components/grade-ruler.tsx`) draws Grade 1 through the fourth year of college as one ruler, with each level as wide as the years it covers. On the homepage the building photo sits behind the hero and sinks at 30% of the scroll speed over the first screen. It uses a CSS scroll-driven animation where the browser supports it, falls back to `components/hero-parallax.tsx` elsewhere, and stays still under reduced motion.
