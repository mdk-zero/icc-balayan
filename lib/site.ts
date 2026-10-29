export const site = {
  name: "Immaculate Conception College of Balayan, Inc.",
  short: "ICC Balayan",
  monogram: "ICC",
  founded: 1935,
  address: "Plaza Mabini St., Balayan, Batangas 4213, Philippines",
  email: "mail@iccbalayan.edu.ph",
  phone: "(043) 727-6760",
  fax: "(043) 407-1034",
  facebook: "https://www.facebook.com/ICCBalayanIncOfficial/",
  mission:
    "A life-giving and innovating school community committed to transforming ICCnians into Christ-centered members of society.",
  visionIntro: "ICCBI commits to:",
  commitments: [
    "Strengthen God-filled friendship.",
    "Facilitate development towards transformation.",
    "Practice Christian leadership.",
    "Develop environmentally caring global leaders.",
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export const levels = [
  { name: "Elementary", detail: "Grades 1–6", students: "700+" },
  { name: "Junior High", detail: "Grades 7–10", students: "422+" },
  { name: "Senior High", detail: "Grades 11–12", students: "260+" },
  { name: "College", detail: "Undergraduate", students: "850+" },
];

export type ProgrammeRow = {
  name: string;
  detail?: string;
  accreditation?: string;
};

export type ProgrammeGroup = {
  id: string;
  heading: string;
  note?: string;
  intro: string;
  rows: ProgrammeRow[];
};

export const programmes: ProgrammeGroup[] = [
  {
    id: "basic-education",
    heading: "Basic Education",
    note: "PAASCU Accredited Level 2 — Grade School and Junior High School",
    intro:
      "The foundation years, taught in the Catholic tradition the school was founded on. English, Filipino, mathematics, science and the humanities, with Christian living and values formation running through every level.",
    rows: [
      { name: "Elementary", detail: "Grades 1 to 6" },
      { name: "Junior High School", detail: "Grades 7 to 10" },
    ],
  },
  {
    id: "senior-high",
    heading: "Senior High School",
    note: "K to 12 · Government Permit (R-IV-A) No. SHS-50s 2015",
    intro:
      "Two tracks, four strands and a technical-vocational route, each with the national certificates that let graduates work or continue to college.",
    rows: [
      {
        name: "Academic Track",
        detail:
          "Science, Technology, Engineering and Mathematics (STEM) · Accountancy, Business and Management (ABM) · Humanities and Social Sciences (HUMSS)",
      },
      {
        name: "Technical-Vocational Track",
        detail:
          "Home Economics — Cookery, Bartending, Food and Beverage Services · ICT — Computer Systems Servicing",
      },
    ],
  },
  {
    id: "college",
    heading: "College",
    note: "PACUCOA Levels 1 and 2 · TESDA-registered qualifications",
    intro:
      "Teacher education, business and accountancy, hospitality and tourism, and computing — with the licensure and TESDA qualifications built into the curriculum rather than added on afterwards.",
    rows: [
      {
        name: "Bachelor of Elementary Education",
        accreditation: "PACUCOA Level 2",
      },
      {
        name: "Bachelor of Science in Business Administration",
        accreditation: "PACUCOA Level 2",
      },
      {
        name: "Bachelor of Secondary Education",
        detail: "Majors in English, Mathematics, Filipino and Social Science",
        accreditation: "PACUCOA Level 1",
      },
      {
        name: "Bachelor of Science in Accountancy",
        detail: "With embedded Bookkeeping NC III and Computerized Accounting (SAP)",
        accreditation: "PACUCOA Level 1",
      },
      {
        name: "Bachelor of Science in Hotel and Restaurant Management",
        detail:
          "Food and Beverage Services NC II · Bartending NC II · Cookery NC II",
        accreditation: "PACUCOA Level 1",
      },
      { name: "Bachelor of Science in Computer Science" },
      { name: "Bachelor of Science in Tourism Management" },
      { name: "Associate in Computer Secretarial" },
      { name: "Associate in Computer Technology" },
    ],
  },
];

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

export const history: Milestone[] = [
  {
    year: "1935",
    title: "Foundation",
    body: "Reverend Father Aniceto Cordero founded the Immaculate Conception College in Balayan, with the approval of His Excellency Msgr. Alfredo Verzosa, Bishop of Lipa. Its aim was to give the Filipino youth a solid, well-grounded Catholic education. The old convent was ceded by Fr. Cordero to the Augustinian Recollect Sisters, who were invited to manage the school under Sor Rita de la Immaculada Maria.",
  },
  {
    year: "1937",
    title: "Primary course",
    body: "The A.R. Sisters offered the Primary course, with recognition granted on April 16, 1937.",
  },
  {
    year: "1938",
    title: "Intermediate and secondary",
    body: "The General Intermediate Course was offered and recognised on April 7, 1938. The Secondary course was also opened and given recognition.",
  },
  {
    year: "1941",
    title: "The name",
    body: "The school's name was changed to Immaculate Conception College.",
  },
  {
    year: "1942",
    title: "College offerings",
    body: "Collegiate courses were opened — Preparatory Law, Associate in Commercial Science and Junior Normal — under Sor Augustias del Divino Amor.",
  },
  {
    year: "1947",
    title: "Boys Department",
    body: "Rev. Fr. Estanislao Cabrera, assisted by Ms. Corazon Ramos, opened the Boys Department of the school.",
  },
  {
    year: "1958",
    title: "Bachelor of Science in Education",
    body: "The BS Education programme was given recognition with the full cooperation of Rev. Fr. Estanislao Cabrera and the teachers of the school. Fr. Cabrera also recognised the need for co-education.",
  },
  {
    year: "1962",
    title: "New courses",
    body: "Bachelor of Science in Elementary Education, Bachelor of Science in Home Economics, and Bachelor of Science in Commerce were added.",
  },
  {
    year: "1963",
    title: "College Building",
    body: "Construction of the College Building was finished and blessed by His Excellency the Bishop of Lipa, Msgr. Olalia.",
  },
  {
    year: "1988",
    title: "High School Building",
    body: "The High School building was built, and made ready in 1990.",
  },
  {
    year: "1995",
    title: "Accountancy",
    body: "Bachelor of Science in Accountancy was offered.",
  },
  {
    year: "2001",
    title: "Technology courses",
    body: "Associate in Computer Technology, Computer Secretarial Course and Bachelor of Science in Computer Engineering were opened.",
  },
  {
    year: "2002",
    title: "Talangpaz Building",
    body: "Named after the A.R. foundresses, Mother Dionisia and Mother Cecilia Rosa Talangpaz, the building was constructed and blessed on December 2, 2007.",
  },
  {
    year: "2003",
    title: "Computing",
    body: "Bachelor of Science in Computer Science and Bachelor of Science in Information Technology were opened.",
  },
  {
    year: "2005",
    title: "Hospitality",
    body: "BS Hotel and Restaurant Management was added. All programmes have since gone through the PACUCOA, PAASCU and TESDA accreditation processes.",
  },
  {
    year: "2011",
    title: "Tourism and TESDA",
    body: "BS Tourism Management opened, and Bookkeeping NC III was embedded in the Accountancy curriculum and recognised by TESDA.",
  },
  {
    year: "2016",
    title: "Senior High School",
    body: "With the K to 12 curriculum, ICC opened its Senior High School programme under Government Permit (R-IV-A) No. SHS-50s 2015 — Academic strands ABM, STEM and HUMSS, and Tech-Voc in Home Economics and ICT.",
  },
  {
    year: "2019–present",
    title: "Commitment to excellence",
    body: "The two-storey Regina Angelorum Building was raised for the growing Senior High population, alongside the three-storey ANNEX Building for the college and elementary pupils, as the school continues its linkages here and abroad.",
  },
];
