// All resume content for the site lives here. Edit this file to update the portfolio.

export type Job = {
  title: string;
  company: string;
  location?: string;
  period: string;
  highlights: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Project = {
  name: string;
  period: string;
  description: string[];
  tech: string[];
  // Screenshot in public/images, e.g. "/images/pos.png". Empty shows a placeholder graphic.
  image: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export type Language = {
  name: string;
  proficiency: string;
};

export const resume = {
  name: "Eli Daniel Israel Monteroso",
  title: "Software Engineer",
  location: "Cebu City, Cebu, Philippines",
  // Put the photo in public/images and set this to its path, e.g. "/images/eli.jpg". Empty shows a placeholder.
  photo: "",

  contact: {
    email: "monteroso.eli@gmail.com",
    linkedin: "https://www.linkedin.com/in/eli-monteroso-4ba49a292",
    github: "https://github.com/EliiDaniel",
    // PDF lives in the public folder.
    resume: "/Eli-Monteroso-Resume.pdf",
  },

  summary: [
    "Software Engineer with professional experience in C++, web development, software maintenance, and live production environments.",
    "Background spans live MMORPG feature development, university systems support, and full-stack web applications.",
    "Experienced in developing new features, resolving software defects, supporting deployments, maintaining technical documentation, and collaborating with international teams.",
    "Proficient in object-oriented programming, version control systems, and modern software development workflows.",
    "Adaptable, quick to learn new technologies, and committed to delivering reliable, scalable software solutions.",
  ],

  stats: [
    { value: 3, suffix: "+", label: "years of experience" },
    { value: 3, label: "companies" },
    { value: 9, label: "programming languages" },
    { value: 1, label: "live MMORPG" },
  ] satisfies Stat[],

  experience: [
    {
      title: "Software Engineer",
      company: "Gamigo PH",
      period: "May 2025 – Present",
      highlights: [
        "Develop and maintain features for a live MMORPG game using C++, ActionScript, and the Gamebryo Engine, including new functionality, content updates, and system enhancements.",
        "Investigate, debug, and resolve software defects across gameplay, UI, and supporting systems.",
        "Design and maintain UI components in Adobe Flash, and integrate in-game content such as cosmetics, mounts, items, and events.",
        "Support deployments via Jenkins, manage source control with Perforce and Bitbucket, and track tasks and bug reports in Jira.",
        "Collaborate with international developers, QA engineers, designers, and producers, maintaining technical documentation and release notes in Confluence.",
      ],
    },
    {
      title: "Computer Programmer I",
      company: "Visayas State University",
      location: "Baybay City, Leyte, Philippines",
      period: "June 2024 – May 2025",
      highlights: [
        "Performed system maintenance, troubleshooting, and updates for software systems used by university departments and administrative offices.",
        "Addressed technical issues and implemented improvements tailored to organizational needs, ensuring reliability and continuity of internal systems.",
      ],
    },
    {
      title: "Software Developer (Part-Time)",
      company: "Bootyard Technologies",
      location: "Ormoc City, Leyte, Philippines",
      period: "Aug 2023 – Nov 2023",
      highlights: [
        "Implemented new application features, resolved software defects, and developed push and email notification functionality.",
        "Worked with data exports, backend business processes, and background jobs (Sidekiq) across development, staging, and production environments.",
        "Collaborated using GitHub and maintained project documentation.",
      ],
    },
    {
      title: "Software Development Intern",
      company: "Bootyard Technologies",
      location: "Ormoc City, Leyte, Philippines",
      period: "May 2023 – Aug 2023",
      highlights: [
        "Developed and maintained features using Ruby on Rails, Bootstrap, and Stimulus.js, including reading and modifying legacy codebases.",
        "Assisted with debugging, testing, and technical documentation, collaborating via GitHub and participating in project planning.",
      ],
    },
  ] satisfies Job[],

  skills: [
    {
      category: "Programming Languages",
      items: ["C++", "C#", "Java", "Python", "Ruby", "PHP", "JavaScript", "C", "ActionScript"],
    },
    {
      category: "Software Engineering",
      items: [
        "Object-Oriented Programming",
        "Software Maintenance",
        "Feature Development",
        "Bug Investigation & Resolution",
        "Technical Documentation",
        "Release Management",
        "Agile Development",
        "API Integration",
      ],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Bitbucket", "Perforce", "Jenkins", "Jira", "Confluence", "MySQL"],
    },
    {
      category: "Web Technologies",
      items: [
        "HTML",
        "CSS",
        "Laravel",
        "Ruby on Rails",
        "Livewire",
        "Alpine.js",
        "Stimulus.js",
        "Vue.js",
        "jQuery",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      category: "Additional Technologies",
      items: ["Gamebryo Engine", "Adobe Flash", "Relational Databases", "Android (Mobile Development)"],
    },
    {
      category: "Professional Skills",
      items: ["Problem Solving", "Teamwork", "Time Management", "Cross-Team Collaboration"],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      name: "Document Requisition & Appointment Booking PWA (Thesis)",
      period: "2023 – 2024",
      description: [
        "Full Stack Developer for the Office of the University Registrar's document requisition and appointment booking system.",
        "Built as a Progressive Web Application with third-party API integrations.",
      ],
      image: "",
      tech: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    },
    {
      name: "Appointment Booking System",
      period: "Mar 2024 – May 2024",
      description: ["Integrated APIs and external packages to support booking workflows."],
      image: "",
      tech: ["Laravel", "PHP", "Livewire", "Alpine.js", "Tailwind CSS"],
    },
    {
      name: "Point of Sale and Inventory System",
      period: "Jan 2024 – Feb 2024",
      description: ["Point of sale and inventory management system."],
      image: "",
      tech: ["Laravel", "Livewire", "Alpine.js"],
    },
    {
      name: "E-Closet",
      period: "Apr 2021 – May 2021",
      description: ["Database application project."],
      image: "",
      tech: ["Relational Databases"],
    },
    {
      name: "E-Convert",
      period: "Apr 2020 – May 2020",
      description: ["Android mobile application development project."],
      image: "",
      tech: ["Android"],
    },
    {
      name: "Snake and PokeJump",
      period: "Mar 2019 – May 2019",
      description: ["Java-based object-oriented programming projects."],
      image: "",
      tech: ["Java"],
    },
  ] satisfies Project[],

  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "Visayas State University",
    location: "Baybay City, Leyte, Philippines",
    period: "2018 – 2024",
  },

  certifications: [{ name: "Getting Grounded on Analytics", year: "2020" }],

  languages: [
    { name: "English", proficiency: "Full Professional Proficiency" },
    { name: "Filipino/Tagalog", proficiency: "Full Professional Proficiency" },
    { name: "Bisaya/Cebuano", proficiency: "Native Proficiency" },
  ] satisfies Language[],
};
