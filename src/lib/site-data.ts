export const siteConfig = {
  name: 'PYPapers.in',
  url: 'https://pypapers.in',
  description:
    'Free previous year papers, sample papers, notes, academic tools, and exam preparation resources for Indian students.',
  adsenseClient: 'ca-pub-8167663924453774',
};

export const coreTools = [
  {
    title: 'Assignment Formatter',
    description: 'Format university assignments with clean margins and PDF output.',
    href: '/assignment-formatter',
    category: 'Academic tools',
  },
  {
    title: 'PDF Page Numberer',
    description: 'Add page numbers to PDFs before submission.',
    href: '/pdf-page-numberer',
    category: 'PDF tools',
  },
  {
    title: 'Notes Cleaner',
    description: 'Improve handwritten note scans for readable PDFs.',
    href: '/notes-cleaner',
    category: 'Study tools',
  },
  {
    title: 'Viva Formatter',
    description: 'Clean Q&A text for viva files and interview prep.',
    href: '/viva-formatter',
    category: 'Academic tools',
  },
  {
    title: 'Practical Index Generator',
    description: 'Create practical file index pages quickly.',
    href: '/practical-index-generator',
    category: 'Academic tools',
  },
  {
    title: 'JPG to PDF Converter',
    description: 'Turn scanned pages and images into one PDF.',
    href: '/jpg-to-pdf-converter',
    category: 'PDF tools',
  },
];

export type EducationResource = {
  title: string;
  slug: string;
  type: 'Previous year papers' | 'Sample papers' | 'Notes' | 'Guide';
  board: string;
  exam: string;
  subjects: string[];
  years: string[];
  audience: string;
  description: string;
  priority: 'Live' | 'Build next' | 'Collecting papers';
};

export const educationResources: EducationResource[] = [
  {
    title: 'CBSE Class 10 Previous Year Question Papers',
    slug: 'cbse-class-10-previous-year-papers',
    type: 'Previous year papers',
    board: 'CBSE',
    exam: 'Class 10 Board',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
    years: ['2025', '2024', '2023', '2022'],
    audience: 'Class 10 students preparing for board exams',
    description:
      'A focused library plan for CBSE Class 10 board papers, marking schemes, and revision checklists.',
    priority: 'Build next',
  },
  {
    title: 'CBSE Class 12 Previous Year Question Papers',
    slug: 'cbse-class-12-previous-year-papers',
    type: 'Previous year papers',
    board: 'CBSE',
    exam: 'Class 12 Board',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Accountancy', 'Economics'],
    years: ['2025', '2024', '2023', '2022'],
    audience: 'Class 12 science, commerce, and humanities students',
    description:
      'Structured landing pages for CBSE Class 12 papers by subject, year, and stream.',
    priority: 'Build next',
  },
  {
    title: 'CUET UG Sample Papers and Practice Sets',
    slug: 'cuet-ug-sample-papers',
    type: 'Sample papers',
    board: 'NTA',
    exam: 'CUET UG',
    subjects: ['General Test', 'English', 'Domain Subjects'],
    years: ['2026', '2025', '2024'],
    audience: 'Students targeting central university admissions',
    description:
      'Practice sets and preparation guides mapped to CUET sections, timing, and scoring patterns.',
    priority: 'Collecting papers',
  },
  {
    title: 'JEE Main Previous Year Papers',
    slug: 'jee-main-previous-year-papers',
    type: 'Previous year papers',
    board: 'NTA',
    exam: 'JEE Main',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    years: ['2025', '2024', '2023', '2022'],
    audience: 'Engineering aspirants practicing timed PYQs',
    description:
      'Exam-shift based paper pages with solutions, formulas, and topic tags.',
    priority: 'Collecting papers',
  },
  {
    title: 'NEET UG Previous Year Papers',
    slug: 'neet-ug-previous-year-papers',
    type: 'Previous year papers',
    board: 'NTA',
    exam: 'NEET UG',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    years: ['2025', '2024', '2023', '2022'],
    audience: 'Medical aspirants revising high-frequency questions',
    description:
      'Year-wise NEET paper collection planned with answer keys and chapter tags.',
    priority: 'Collecting papers',
  },
  {
    title: 'Delhi University Semester Notes',
    slug: 'du-semester-notes',
    type: 'Notes',
    board: 'Delhi University',
    exam: 'DU Semester Exams',
    subjects: ['B.Com', 'B.A.', 'B.Sc.', 'Generic Elective'],
    years: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
    audience: 'DU students looking for clean notes and assignment support',
    description:
      'A notes hub for DU semester revision, practical files, assignments, and viva prep.',
    priority: 'Build next',
  },
  {
    title: 'IGNOU Assignment and Exam Resources',
    slug: 'ignou-assignment-exam-resources',
    type: 'Guide',
    board: 'IGNOU',
    exam: 'TEE and Assignments',
    subjects: ['BAG', 'BCOM', 'BCA', 'MCA', 'MBA'],
    years: ['2026', '2025', '2024'],
    audience: 'Distance-learning students managing assignments and term-end exams',
    description:
      'Submission checklists, assignment formatting, and exam paper organization for IGNOU learners.',
    priority: 'Build next',
  },
  {
    title: 'IPU BCA and BBA Previous Year Papers',
    slug: 'ipu-bca-bba-previous-year-papers',
    type: 'Previous year papers',
    board: 'GGSIPU',
    exam: 'University Semester Exams',
    subjects: ['BCA', 'BBA', 'Management', 'Computer Applications'],
    years: ['2025', '2024', '2023', '2022'],
    audience: 'IPU students preparing from past semester papers',
    description:
      'Semester-wise IPU paper pages designed for quick filtering by course, subject, and year.',
    priority: 'Collecting papers',
  },
];

export const growthGuides = [
  {
    title: 'Previous year paper page template',
    href: '/previous-year-papers',
    description:
      'Create one page per board, exam, subject, and year with original summaries, answer key notes, and internal links.',
  },
  {
    title: 'Student tool landing pages',
    href: '/assignment-formatter',
    description:
      'Pair every useful tool with a helpful guide, FAQs, and examples so the page solves a real student task.',
  },
  {
    title: 'Monthly content update workflow',
    href: '/articles',
    description:
      'Collect new papers, verify filenames, add metadata, regenerate sitemap, and track Search Console growth.',
  },
];
