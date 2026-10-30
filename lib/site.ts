/**
 * Site content. Everything here is taken from iccbalayan.edu.ph unless a
 * comment says otherwise. Items the school still has to confirm are marked
 * `CONFIRM:` so they can be found with a search before launch.
 */

export const site = {
  name: "Immaculate Conception College of Balayan, Inc.",
  short: "ICC Balayan",
  acronym: "ICCBI",
  founded: 1935,
  street: "Plaza Mabini St.",
  town: "Balayan, Batangas 4213",
  address: "Plaza Mabini St., Balayan, Batangas 4213, Philippines",
  email: "mail@iccbalayan.edu.ph",
  phone: "(043) 727-6760",
  fax: "(043) 407-1034",
  // CONFIRM: the old About page calls this statement the mission and the
  // commitments below the vision. The school's January 2026 Mission and Vision
  // graphic labels them the other way round. Once the school decides, swap
  // the two labels in `statementLabels` and nothing else needs to change.
  mission:
    "A life-giving and innovating school community committed to transforming ICCnians into Christ-centered members of society.",
  visionIntro: "ICCBI commits to:",
  commitments: [
    "Strengthen God-filled friendship.",
    "Facilitate development towards transformation.",
    "Practice Christian leadership.",
    "Develop environmentally caring global leaders.",
  ],
  statementLabels: { statement: "Mission", commitments: "Vision" },
  // Verbatim from the school's January 2026 Mission and Vision graphic.
  philosophy:
    "We believe that an individual can become a Christian who can integrate one's religious, cultural and professional knowledge in life and be a self-directed Filipino who is committed to building the community where he lives; thus, promoting the growth of Christ's love that makes the individual deeply humane to attain the ultimate goal – God.",
  motto: [
    { latin: "Patria", english: "Country" },
    { latin: "Scientia", english: "Knowledge" },
    { latin: "Virtus", english: "Virtue" },
  ],
};

export const links = {
  facebook: "https://www.facebook.com/ICCBalayanIncOfficial",
  youtube: "https://www.youtube.com/@immaculateconceptioncolleg7709",
  maps: "https://maps.app.goo.gl/JwSQZTmGMZiV6LYE8",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.3408796580516!2d120.72880959999998!3d13.938297599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bda2d0026649df%3A0x79da99079735c10b!2sImmaculate%20Conception%20College%20of%20Balayan%2C%20Inc.!5e0!3m2!1sen!2sph!4v1756649025676!5m2!1sen!2sph",
  // CONFIRM: library.iccbalayan.edu.ph no longer resolves (checked
  // 2026-10-29), so the site does not link to it. Restore the link once the
  // library catalogue is back online.
  library: "https://library.iccbalayan.edu.ph/",
  staffMail: "https://mail.google.com/a/iccbalayan.edu.ph",
  ars: "https://arsisters.org/",
  portal: "https://iccbi-essentiel.ckgroup.ph",
  portalLabel: "iccbi-essentiel.ckgroup.ph",
  march: "/media/icc-march.mp3",
  alumniForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSddyfLnUco__ReldiHgnnX6tVI2eJSzaDQ22FsIZ3SHYDb8yg/viewform",
};

export const tel = (number: string) => `tel:+63${number.replace(/[^0-9]/g, "").replace(/^0/, "")}`;

export type NavItem = { href: string; label: string };
/** A top-level menu entry. Sections without a page of their own (Inside ICCBI) have no href. */
export type NavSection = { href?: string; label: string; children?: NavItem[] };

// Mirrors the old site's menus, so returning visitors find pages where they left them.
export const nav: NavSection[] = [
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "About ICC" },
      { href: "/about/history", label: "History" },
      { href: "/about/mission-and-vision", label: "Mission and vision" },
      { href: "/about/core-values", label: "Core values" },
      { href: "/about/seal", label: "School seal" },
      { href: "/about/accreditations", label: "Accreditations" },
      { href: "/about/icc-march", label: "ICC March" },
    ],
  },
  {
    label: "Inside ICCBI",
    children: [
      { href: "/inside-iccbi/administrators", label: "Administrators since 1935" },
      { href: "/inside-iccbi/board-of-trustees", label: "Board of Trustees" },
      { href: "/inside-iccbi/administrative-board", label: "Administrative Board" },
      { href: "/inside-iccbi/directory", label: "Directory" },
    ],
  },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/facilities", label: "Facilities" },
  { href: "/news", label: "News" },
  { href: "/alumni", label: "Alumni" },
  { href: "/contact", label: "Contact" },
];

/** Every page reachable from the menu, in menu order, without duplicates. */
export function allPages(): NavItem[] {
  const pages = new Map<string, NavItem>();
  for (const item of nav) {
    if (item.href) pages.set(item.href, { href: item.href, label: item.label });
    item.children?.forEach((child) => pages.set(child.href, child));
  }
  return [...pages.values()];
}

export const usefulLinks = [
  { href: "https://arsisters.org/", label: "Augustinian Recollect Sisters" },
  { href: "https://ched.gov.ph/", label: "Commission on Higher Education" },
  { href: "https://www.deped.gov.ph/", label: "Department of Education" },
  { href: "https://www.tesda.gov.ph/", label: "TESDA" },
  { href: "https://paascu.org.ph/", label: "PAASCU" },
  { href: "https://pacucoa.ph/", label: "PACUCOA" },
];

/* ------------------------------------------------------------------ levels */

export type Level = {
  id: string;
  name: string;
  span: string;
  /** Tick labels on the grade ruler; their count sets the segment's width. */
  ticks: string[];
  // CONFIRM: enrollment counts are carried over from the old homepage.
  enrolled: string;
  href: string;
};

export const levels: Level[] = [
  {
    id: "elementary",
    name: "Elementary",
    span: "Grades 1 to 6",
    ticks: ["1", "2", "3", "4", "5", "6"],
    enrolled: "700+",
    href: "/academics#basic-education",
  },
  {
    id: "junior-high",
    name: "Junior High",
    span: "Grades 7 to 10",
    ticks: ["7", "8", "9", "10"],
    enrolled: "422+",
    href: "/academics#basic-education",
  },
  {
    id: "senior-high",
    name: "Senior High",
    span: "Grades 11 and 12",
    ticks: ["11", "12"],
    enrolled: "260+",
    href: "/academics#senior-high",
  },
  {
    id: "college",
    name: "College",
    span: "Bachelor's and associate",
    ticks: ["1st", "2nd", "3rd", "4th"],
    enrolled: "850+",
    href: "/academics#college",
  },
];

/* ---------------------------------------------------------------- programs */

export type Program = {
  name: string;
  short?: string;
  detail?: string;
  accreditation?: string;
};

export type ProgramField = { field: string; programs: Program[] };

export const collegeFields: ProgramField[] = [
  {
    field: "Teacher education",
    programs: [
      {
        name: "Bachelor of Elementary Education",
        short: "BEEd",
        accreditation: "PACUCOA Level 2",
      },
      {
        name: "Bachelor of Secondary Education",
        short: "BSEd",
        detail: "Majors in English, Mathematics, Filipino and Social Science",
        accreditation: "PACUCOA Level 1, formal",
      },
    ],
  },
  {
    field: "Business and accountancy",
    programs: [
      {
        name: "Bachelor of Science in Business Administration",
        short: "BSBA",
        accreditation: "PACUCOA Level 2",
      },
      {
        name: "Bachelor of Science in Accountancy",
        short: "BSA",
        detail: "With embedded Bookkeeping NC III and Computerized Accounting (SAP)",
      },
    ],
  },
  {
    field: "Hospitality and tourism",
    programs: [
      {
        name: "Bachelor of Science in Hotel and Restaurant Management",
        short: "BSHRM",
        detail:
          "With TESDA qualifications in Food and Beverage Services NC II, Bartending NC II and Cookery NC II",
      },
      {
        name: "Bachelor of Science in Tourism Management",
        short: "BSTM",
      },
    ],
  },
  {
    field: "Computing",
    programs: [
      { name: "Bachelor of Science in Computer Science", short: "BSCS" },
      { name: "Associate in Computer Technology", short: "ACT" },
      { name: "Associate in Computer Secretarial", short: "ACS" },
    ],
  },
];

export const seniorHigh = {
  permit: "Government Permit (R-IV-A) No. SHS-50s 2015",
  tracks: [
    {
      name: "Academic track",
      strands: [
        { name: "STEM", full: "Science, Technology, Engineering and Mathematics" },
        { name: "ABM", full: "Accountancy, Business and Management" },
        { name: "HUMSS", full: "Humanities and Social Sciences" },
      ],
    },
    {
      name: "Technical-Vocational-Livelihood track",
      strands: [
        { name: "Home Economics", full: "Cookery, Bartending, Food and Beverage Services" },
        { name: "ICT", full: "Computer Systems Servicing" },
      ],
    },
  ],
};

/* ----------------------------------------------------------- accreditation */

export const accreditors = [
  {
    id: "paascu",
    name: "PAASCU",
    full: "Philippine Accrediting Association of Schools, Colleges and Universities",
    href: "https://paascu.org.ph/",
    reviews: "Grade school and junior high school",
  },
  {
    id: "pacucoa",
    name: "PACUCOA",
    full: "Philippine Association of Colleges and Universities Commission on Accreditation",
    href: "https://pacucoa.ph/",
    reviews: "College programs",
  },
  {
    id: "tesda",
    name: "TESDA",
    full: "Technical Education and Skills Development Authority",
    href: "https://www.tesda.gov.ph/",
    reviews: "National Certificates (NC) embedded in college programs",
  },
];

// CONFIRM: the certificates on the old site's Accreditations page all expired
// in 2016–2017 (PAASCU elementary to March 2017, PAASCU/FAAP high school to
// May 2016, PACUCOA BSBA and BEEd to April 2017). The school must confirm the
// current level of each program before launch.
export const accreditations = [
  { program: "Grade School", body: "PAASCU", standing: "Level 2" },
  { program: "Junior High School", body: "PAASCU", standing: "Level 2" },
  { program: "Bachelor of Elementary Education", body: "PACUCOA", standing: "Level 2" },
  {
    program: "Bachelor of Science in Business Administration",
    body: "PACUCOA",
    standing: "Level 2",
  },
  {
    program: "Bachelor of Secondary Education",
    body: "PACUCOA",
    standing: "Level 1, formal",
  },
  {
    program: "Bachelor of Science in Accountancy",
    body: "TESDA",
    standing: "Bookkeeping NC III, embedded",
  },
  {
    program: "Bachelor of Science in Hotel and Restaurant Management",
    body: "TESDA",
    standing: "Food and Beverage Services NC II, Bartending NC II, Cookery NC II",
  },
];

/* --------------------------------------------------------------- admission */

export const enrollment = {
  newStudents: [
    `Open the CK Link enrollment portal at ${links.portalLabel}.`,
    "Choose Pre-registration, fill in the pre-enrollment form and register.",
    "Save the username and password you registered with.",
    "Submit your requirements to the Registrar's Office.",
    "Pay at the Treasurer's Office.",
    "Wait for a text message confirming that you are enrolled.",
  ],
  returningStudents: [
    "Go to the Registrar's Office to update your grade or year level.",
    "Pay at the Treasurer's Office.",
    `Open the CK Link enrollment portal at ${links.portalLabel}.`,
    "Choose Get Username/Password.",
    "Fill in your details.",
    "Wait for a text message with your login details.",
  ],
};

// CONFIRM: the old site does not publish a requirements list. This is the
// usual checklist for Philippine schools and must be checked by the Registrar.
export const requirements = [
  {
    level: "Elementary and junior high",
    items: [
      "Report card (SF9, formerly Form 138)",
      "PSA birth certificate",
      "Certificate of good moral character",
      "2×2 ID photos",
      "Transferees: honorable dismissal",
    ],
  },
  {
    level: "Senior high",
    items: [
      "Grade 10 report card (SF9)",
      "Junior high completion certificate",
      "PSA birth certificate",
      "Certificate of good moral character",
      "2×2 ID photos",
    ],
  },
  {
    level: "College",
    items: [
      "Grade 12 report card (SF9)",
      "PSA birth certificate",
      "Certificate of good moral character",
      "2×2 ID photos",
      "Transferees: honorable dismissal and transcript of records",
    ],
  },
];

/* ----------------------------------------------------------------- history */

export type Milestone = { year: string; title: string; body: string };

export const history: Milestone[] = [
  {
    year: "1935",
    title: "Foundation",
    body: "Reverend Father Aniceto Cordero founded the Immaculate Conception College in Balayan, with the approval of His Excellency Msgr. Alfredo Verzosa, Bishop of Lipa. Its aim was to give the Filipino youth a solid, well-grounded Catholic education. Fr. Cordero ceded the old convent to the Augustinian Recollect Sisters, who were invited to run the school under Sor Rita de la Immaculada Maria.",
  },
  {
    year: "1937",
    title: "Primary course",
    body: "The A.R. Sisters offered the Primary course, recognized on April 16, 1937.",
  },
  {
    year: "1938",
    title: "Intermediate and secondary",
    body: "The General Intermediate Course was offered and recognized on April 7, 1938. The Secondary course was also opened and recognized.",
  },
  {
    year: "1941",
    title: "A new name",
    body: "The school became Immaculate Conception College.",
  },
  {
    year: "1942",
    title: "College courses",
    body: "Preparatory Law, Associate in Commercial Science and Junior Normal opened under Sor Augustias del Divino Amor.",
  },
  {
    year: "1947",
    title: "Boys Department",
    body: "Rev. Fr. Estanislao Cabrera, assisted by Ms. Corazon Ramos, opened the Boys Department.",
  },
  {
    year: "1958",
    title: "Bachelor of Science in Education",
    body: "The BS Education program was recognized with the full cooperation of Rev. Fr. Estanislao Cabrera and the school's teachers. Fr. Cabrera also saw the need for co-education.",
  },
  {
    year: "1962",
    title: "New courses",
    body: "Bachelor of Science in Elementary Education, Bachelor of Science in Home Economics and Bachelor of Science in Commerce were added.",
  },
  {
    year: "1963",
    title: "The College Building",
    body: "The College Building was finished and blessed by His Excellency the Bishop of Lipa, Msgr. Olalia.",
  },
  {
    year: "1988",
    title: "The High School Building",
    body: "The High School Building was built, and was ready for use in 1990.",
  },
  {
    year: "1995",
    title: "Accountancy",
    body: "Bachelor of Science in Accountancy was offered.",
  },
  {
    year: "2001",
    title: "Technology courses",
    body: "Associate in Computer Technology, Computer Secretarial and Bachelor of Science in Computer Engineering opened.",
  },
  {
    year: "2002",
    title: "The Talangpaz Building",
    body: "A building named for the A.R. foundresses, Mother Dionisia and Mother Cecilia Rosa Talangpaz, was constructed. It was blessed on December 2, 2007.",
  },
  {
    year: "2003",
    title: "Computing",
    body: "Bachelor of Science in Computer Science and Bachelor of Science in Information Technology opened.",
  },
  {
    year: "2005",
    title: "Hospitality",
    body: "BS Hotel and Restaurant Management was added. Programs have since gone through PACUCOA, PAASCU and TESDA accreditation.",
  },
  {
    year: "2011",
    title: "Tourism, and TESDA in accountancy",
    body: "BS Tourism Management opened, and Bookkeeping NC III was embedded in the Accountancy curriculum with TESDA recognition.",
  },
  {
    year: "2016",
    title: "Senior High School",
    body: "Under the K to 12 curriculum and Government Permit (R-IV-A) No. SHS-50s 2015, ICC opened Senior High School: STEM, ABM and HUMSS in the academic track, with Home Economics and ICT in Tech-Voc.",
  },
  {
    year: "2019",
    title: "New buildings",
    body: "The two-storey Regina Angelorum Building went up for the growing Senior High population, and a three-storey annex for college and elementary pupils. The school continues to widen its linkages, here and abroad, guided by the pastoral thrust of the Archdiocese of Lipa.",
  },
];

/* -------------------------------------------------------------- leadership */

export type Person = { name: string; role: string; photo?: string };

export const administrativeBoard: Person[] = [
  { name: "Sr. Cynthia F. Camuta, A.R.", role: "School President and Directress", photo: "/images/people/board/cynthia-camuta.webp" },
  { name: "Sr. Ma. Norie B. Noman, A.R.", role: "School Treasurer", photo: "/images/people/board/ma-norie-noman.webp" },
  { name: "Sr. Ridelia A. Tinga, A.R.", role: "Basic Education Principal", photo: "/images/people/board/ridelia-tinga.jpg" },
  { name: "Sr. Sheryl U. Garcia, A.R.", role: "School Registrar", photo: "/images/people/board/sheryl-garcia.jpg" },
  { name: "Sr. Christine Gay Peñarejo, A.R.", role: "A.R. Sister", photo: "/images/people/board/christine-gay-penarejo.webp" },
  { name: "Sr. Bernadeth F. Calzado, A.R.", role: "A.R. Sister", photo: "/images/people/board/bernadeth-calzado.webp" },
];

export const trustees: Person[] = [
  { name: "Very Rev. Mo. Mary Ann J. Lumactao, A.R.", role: "Superior General", photo: "/images/people/trustees/mary-ann-lumactao.jpg" },
  {
    name: "Sr. Marilyn N. Cula, A.R.",
    role: "Vicar General and First General Councilor", photo: "/images/people/trustees/marilyn-cula.jpg",
  },
  { name: "Sr. Maria Aurora M. Baygan, A.R.", role: "Second General Councilor", photo: "/images/people/trustees/maria-aurora-baygan.jpg" },
  { name: "Sr. Cynthia F. Camuta, A.R.", role: "Third General Councilor", photo: "/images/people/trustees/cynthia-camuta.jpg" },
  { name: "Sr. Josephine J. Ativo, A.R.", role: "Fourth General Councilor", photo: "/images/people/trustees/josephine-ativo.jpg" },
  {
    name: "Sr. Ma. Divina N. Caabay, A.R.",
    role: "General Econome and Fifth General Councilor", photo: "/images/people/trustees/ma-divina-caabay.jpg",
  },
  {
    name: "Sr. Christie P. Maguiling, A.R.",
    role: "General Secretary and Sixth General Councilor", photo: "/images/people/trustees/christie-maguiling.jpg",
  },
];

export type Administrator = {
  years: string;
  name: string;
  role?: string;
  current?: boolean;
  photo: string;
};

// Order and spelling as published on the old site, sorted by first year.
export const administrators: Administrator[] = [
  {
    years: "1935–1942",
    name: "Sr. Amanda, A.R.",
    photo: "/images/people/administrators/amanda.png",
  },
  {
    years: "1942–1952",
    name: "Sr. Augustias, A.R.",
    photo: "/images/people/administrators/augustias.png",
  },
  {
    years: "1952–1955",
    name: "Sr. Isabel, A.R.",
    photo: "/images/people/administrators/isabel.png",
  },
  {
    years: "1955–1968",
    name: "Sr. Celina, A.R.",
    photo: "/images/people/administrators/celina.png",
  },
  {
    years: "1968–1970",
    name: "Mo. Rosario, A.R.",
    photo: "/images/people/administrators/rosario.png",
  },
  {
    years: "1970–1977",
    name: "Sr. Felicidad, A.R.",
    photo: "/images/people/administrators/felicidad.png",
  },
  {
    years: "1977–1978",
    name: "Sr. Bernadita, A.R.",
    photo: "/images/people/administrators/bernadita.png",
  },
  {
    years: "1978–1981",
    name: "Sr. Resureccion, A.R.",
    photo: "/images/people/administrators/resureccion.png",
  },
  {
    years: "1981–1983",
    name: "Sr. Cecilia, A.R.",
    photo: "/images/people/administrators/cecilia.png",
  },
  {
    years: "1981–1985",
    name: "Sr. Felicidad, A.R.",
    role: "Directress",
    photo: "/images/people/administrators/felicidad.png",
  },
  {
    years: "1983–1985",
    name: "Sr. Jesus, A.R.",
    photo: "/images/people/administrators/jesus.png",
  },
  {
    years: "1985–1994",
    name: "Sr. Juliana, A.R.",
    photo: "/images/people/administrators/juliana.png",
  },
  {
    years: "1994–2000",
    name: "Sr. Loreto, A.R.",
    photo: "/images/people/administrators/loreto.png",
  },
  {
    years: "1994–2002",
    name: "Sr. Melodina, A.R.",
    photo: "/images/people/administrators/melodina.png",
  },
  {
    years: "2000–2002",
    name: "Sr. Adelaida, A.R.",
    photo: "/images/people/administrators/adelaida.png",
  },
  {
    years: "2002–2003",
    name: "Sr. Felicidad, A.R.",
    photo: "/images/people/administrators/felicidad.png",
  },
  {
    years: "2003–2020",
    name: "Sr. Modesta San Jose, A.R.",
    role: "Superior, Directress and Dean",
    photo: "/images/people/administrators/modesta.png",
  },
  {
    years: "2020–2024",
    name: "Sr. Ridelia A. Tinga, A.R.",
    role: "Superior, Directress and Dean",
    photo: "/images/people/administrators/ridelia.png",
  },
  // CONFIRM: the old site lists "1994–2000" for Sr. Cynthia, which looks like
  // a typo; she is the current School President and Directress.
  {
    years: "2024–present",
    name: "Sr. Cynthia F. Camuta, A.R.",
    role: "School President and Directress",
    current: true,
    photo: "/images/people/administrators/cynthia-f-camuta.jpg",
  },
];

/* ------------------------------------------------------------------ campus */

export type Floor = { label: string; rooms: string[] };

export type Building = {
  id: string;
  name: string;
  department?: string;
  note?: string;
  /** Top floor first, the way a building directory board reads. */
  floors: Floor[];
};

// From the old site's Directory page. Floors are only given where the
// directory names them; other buildings list their rooms on one row.
export const buildings: Building[] = [
  {
    id: "talangpaz",
    name: "Talangpaz Building",
    department: "College Department",
    note: "Named for the A.R. foundresses, Mother Dionisia and Mother Cecilia Rosa Talangpaz. Blessed in 2007.",
    floors: [
      { label: "3rd and 4th", rooms: ["Classrooms"] },
      {
        label: "2nd",
        rooms: [
          "College Library (left wing)",
          "Junior High School Library (right wing)",
          "College AVR",
          "Senior High School Computer Laboratory",
        ],
      },
      {
        label: "1st",
        rooms: [
          "Directress' Office",
          "Treasurer's Office",
          "Dean's Office",
          "Basic Education Principal's Office",
          "Guidance Office",
          "Clinic",
          "Consultation Room",
          "Senior High School Faculty Room",
        ],
      },
    ],
  },
  {
    id: "old-building",
    name: "Old Building",
    department: "College Department",
    floors: [
      {
        label: "",
        rooms: ["Registrar's Office", "Chapel", "Computer Laboratory"],
      },
    ],
  },
  {
    id: "monte-carmelo",
    name: "Monte Carmelo Building",
    department: "College Department",
    floors: [
      { label: "3rd", rooms: ["College classrooms"] },
      {
        label: "2nd",
        rooms: ["College classrooms", "College Faculty Room", "College Conference Room"],
      },
      {
        label: "1st",
        rooms: [
          "Grade School classrooms",
          "Senior High School classrooms",
          "Grade School Faculty Room",
        ],
      },
    ],
  },
  {
    id: "regina-angelorum",
    name: "Regina Angelorum Building",
    department: "Senior High School Department",
    note: "Built from 2019 for the growing Senior High population.",
    floors: [{ label: "1st and 2nd", rooms: ["Senior High School classrooms"] }],
  },
  {
    id: "grade-school",
    name: "Grade School Department",
    floors: [
      {
        label: "",
        rooms: [
          "Grade School Principal's Office",
          "Grade School Faculty Room",
          "Guidance Office (Grade School)",
          "PAASCU Room",
          "Alumni Office",
          "Reading Center",
          "Exhibit Room",
          "Basketball Room",
          "Grade School AVR",
          "Grade School Computer Laboratory",
          "Playground",
        ],
      },
    ],
  },
  {
    id: "junior-high",
    name: "Junior High School Department",
    note: "The High School Building was built in 1988 and ready for use in 1990.",
    floors: [
      {
        label: "",
        rooms: [
          "Junior High School Faculty Room",
          "Science Laboratory",
          "Computer Laboratory",
          "Clothing Laboratory",
          "Home Economics and Food Laboratory",
          "New High School Conference Hall",
          "Exhibit Room",
          "Landscaped garden",
        ],
      },
    ],
  },
  {
    id: "grounds",
    name: "ICC grounds",
    floors: [
      {
        label: "",
        rooms: ["Gymnasium", "Basketball and volleyball courts", "Canteen", "BS HRM Building"],
      },
    ],
  },
];

/* ------------------------------------------------------------- core values */

// Verbatim from the school's January 2026 Core Values graphic.
export const coreValues = [
  {
    id: "integrity",
    name: "Integrity",
    body: "At the heart of St. Augustine's philosophy is the idea of living a life of truth and moral righteousness. Integrity in this context means fostering honesty, transparency, and accountability in both academic and personal conduct. It encourages students and faculty to uphold high ethical standards, reflecting the commitment to truth that St. Augustine taught in his writings. This integrity is not just about academic honesty, but also about staying true to one's values, respecting others, and taking responsibility for one's actions.",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    body: "St. Augustine believed in the power of community, often emphasizing the importance of living together harmoniously and working toward the common good. In the school, collaboration is about fostering teamwork and encouraging students, faculty, and staff to work together to achieve shared goals. It highlights the importance of mutual respect, understanding, and the sharing of knowledge and resources. Working together, we can contribute to the overall success and well-being of the school community.",
  },
  {
    id: "compassion",
    name: "Compassion",
    body: "Compassion, a key virtue in the Augustinian tradition, encourages empathy and kindness toward others. St. Augustine's writings often speak about the need to show love and care for one's neighbors, recognizing the inherent dignity of every person. In the school setting, compassion is reflected in how students and teachers treat one another—with respect, understanding, and support. It calls for a nurturing environment where the emotional, social, physical, psychological, spiritual, and academic needs of every individual are met with genuine care.",
  },
  {
    id: "benevolence",
    name: "Benevolence",
    body: "Benevolence aligns with St. Augustine's call for charitable love—doing good for others without expecting anything in return. This value calls for students and staff to engage in acts of kindness and generosity, not only within the school but also in the larger community. It encourages service-oriented actions, helping those in need, and using one's skills and resources for the betterment of others. Benevolence fosters a culture of giving and uplifting others, which is central to St. Augustine's teachings about selfless love.",
  },
  {
    id: "innovation",
    name: "Innovation",
    body: "St. Augustine was a thinker who challenged norms and sought deeper understanding of the world around him. Innovation, in the context of the school, means encouraging creative thinking and problem-solving. It's about inspiring students to think critically, question assumptions, and find new ways of addressing challenges, whether in the classroom, in the community, or in the world at large. It reflects the Augustinian spirit of intellectual curiosity and the pursuit of knowledge, always seeking better ways to serve others and contribute to society.",
  },
];

/* -------------------------------------------------------------- facilities */

export type Photo = { src: string; alt: string; width: number; height: number };
export type PhotoGroup = { id: string; title: string; line: string; photos: Photo[] };

const facility = (n: number, alt: string): Photo => {
  // The old site's gallery: two portrait shots, ten at 4:3, fourteen at 16:9.
  const [width, height] = n <= 2 ? [600, 800] : n <= 12 ? [800, 600] : [1067, 600];
  return { src: `/images/facilities/facility-${String(n).padStart(2, "0")}.jpg`, alt, width, height };
};

// CONFIRM: these photos are from the old site's Facilities page and date from
// 2017. Room names are not given there, so captions describe what is shown.
export const facilityGroups: PhotoGroup[] = [
  {
    id: "hospitality",
    title: "Hospitality and tourism",
    line: "A travel office, a bar, a dining room and a kitchen.",
    photos: [
      facility(1, "An office with travel posters of Paris and other cities, a white lounge chair and a counter"),
      facility(2, "The same office from the counter: world clocks, waiting chairs and a service desk"),
      facility(3, "Travel posters of Singapore, Paris and Hong Kong on a yellow wall"),
      facility(4, "A lounge chair and floor lamp beneath posters of the United States and Hong Kong"),
      facility(5, "A desk with a computer, printer and travel brochures"),
      facility(6, "A front desk with a computer, fax machine and printer"),
      facility(7, "Six wall clocks set to the time in cities around the world"),
      facility(8, "Framed posters of tourist destinations"),
      facility(9, "A bar counter with bottles, glassware and stools"),
      facility(10, "A dining room with round tables dressed in red and white linen"),
      facility(11, "A kitchen with stainless steel counters and a range hood"),
      facility(23, "Shelves displaying wine bottles and framed pictures"),
      facility(24, "A display case of silverware and serving utensils"),
    ],
  },
  {
    id: "libraries",
    title: "Libraries and reading rooms",
    line: "Reading tables, reference shelves, instructional materials and a computer corner.",
    photos: [
      facility(14, "A library reading room with long tables, bookshelves and a globe"),
      facility(15, "A library information counter"),
      facility(13, "A row of computers beneath a painted reading mural"),
      facility(16, "Rows of framed portraits above a card catalog cabinet and a statue of Mary"),
      facility(17, "Shelves of instructional materials and globes"),
      facility(18, "Bookshelves of reference books with globes on top"),
      facility(19, "Bookshelves and children's posters in a reading area"),
      facility(20, "A reading room with pink tables and green walls"),
    ],
  },
  {
    id: "grounds",
    title: "Around the campus",
    line: "The grounds, a classroom, a lounge and other rooms.",
    photos: [
      facility(22, "An open court ringed by trees and blue-painted school buildings"),
      facility(21, "The school grounds with a basketball court and a covered walkway"),
      facility(12, "A classroom with white desks and aqua chairs"),
      facility(25, "Framed certificates and a painting on a wall"),
      facility(26, "A pink-walled lounge with sofas, a coffee table and a painting"),
    ],
  },
];
