import type { Project } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR PROJECTS HERE                                         ║
 * ║  Add a new object to the array to add a project. Order matters — ║
 * ║  the first project is "01", the second "02", and so on.          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * NOTE: The case-study paragraphs below are DRAFT copy written from the
 * technology stack on your CV. Review and rewrite them in your own words.
 *
 * ADDING SCREENSHOTS
 * ------------------
 * 1. Put the files in /public/images/projects/<slug>/
 * 2. Set `cover` to the main image:
 *      cover: { src: "/images/projects/examination-platform/cover.png", alt: "Dashboard view", aspect: "16/10" }
 * 3. Add more to `gallery` (span "full" or "half"):
 *      gallery: [
 *        { src: "/images/projects/examination-platform/quiz.png", alt: "Quiz screen", span: "full", caption: "Timed quiz view" },
 *        { src: "/images/projects/examination-platform/admin.png", alt: "Admin panel", span: "half" },
 *        { src: "/images/projects/examination-platform/demo.mp4", alt: "Walkthrough", type: "video", span: "half" },
 *      ]
 *
 * LINKS
 * -----
 * Each project supports `links.live`, `links.github`, `links.caseStudy`, `links.external`
 * and `links.other: [{ label, href }]`. Leave out any you don't have.
 *
 * CASE-STUDY SECTIONS
 * -------------------
 * overview / problem / solution / architecture / details / outcomes are arrays of
 * paragraphs. Omit any section (or leave it empty) and it won't be rendered.
 */
export const projects: Project[] = [
  {
    slug: "examination-platform",
    title: "Full-Stack Examination Platform",
    category: "Software",
    year: "2025",
    status: "Completed",
    featured: true,
    role: "Full-stack development",
    summary: "A multi-user examination system with background jobs and caching.",
    description:
      "An end-to-end examination platform built as a Vue.js single-page application on a Flask API, with Redis and Celery handling caching and asynchronous background work.",
    technologies: ["Flask", "Vue.js", "Redis", "Celery"],

    // cover: { src: "/images/projects/examination-platform/cover.png", alt: "Examination platform dashboard", aspect: "16/10" },
    // gallery: [],

    overview: [
      "The platform separates two roles: administrators who manage subjects, chapters and quizzes, and users who attempt quizzes and review their results. The client is a single-page application; the server exposes a REST API.",
    ],
    problem: [
      "Examination systems have uneven load — many users hit the same quiz at the same moment, then nothing — and they also need to run scheduled work such as reports and notifications without slowing down the people taking exams.",
    ],
    solution: [
      "The request path is kept thin: Flask serves JSON quickly, while anything slow or scheduled is handed to Celery workers through Redis. Frequently-read data is cached in Redis and invalidated when an administrator changes it.",
    ],
    architecture: [
      "Vue.js on the client with role-based views. Flask serves the API and persistence layer. Redis acts as both the Celery broker and the application cache; Celery runs asynchronous and scheduled jobs.",
    ],
    details: [
      // Add the details you're proud of — e.g. how timers are enforced, how exports are generated, testing approach.
    ],
    outcomes: [
      // Add measured results here when you have them.
    ],
    links: {
      github: "https://github.com/", // ← replace with the repository URL
      // live: "https://…",
    },
  },

  {
    slug: "cinema-audience-forecasting",
    title: "Cinema Audience Forecasting Model",
    category: "AI / ML",
    year: "2025",
    status: "Completed",
    featured: true,
    role: "Data preparation, modelling, evaluation",
    summary: "Gradient-boosted forecasting of cinema attendance from historical and calendar features.",
    description:
      "A forecasting model that predicts cinema audience numbers. Built in Python with Pandas for feature engineering and LightGBM and XGBoost for modelling, with time-aware validation.",
    technologies: ["Python", "Pandas", "LightGBM", "XGBoost"],

    // cover: { src: "/images/projects/cinema-audience-forecasting/cover.png", alt: "Forecast vs. actual attendance", aspect: "16/10" },

    overview: [
      "Cinemas plan staffing, concessions and screen allocation around expected attendance. The aim was a model that forecasts audience size accurately enough to support those decisions.",
    ],
    problem: [
      "Attendance mixes slow signals — seasonality, weekday patterns, holidays — with fast ones such as a film's opening week. Naive approaches either over-fit recent hits or miss the calendar structure entirely.",
    ],
    solution: [
      "Features were engineered in Pandas across calendar, film and historical-baseline groups, then gradient-boosted tree models (LightGBM and XGBoost) were trained and compared under a time-ordered validation scheme so no fold ever saw the future.",
    ],
    architecture: [
      "A reproducible Pandas pipeline turns raw data into a feature matrix. Models are trained with early stopping against time-ordered folds and evaluated on held-out later periods.",
    ],
    details: [
      // e.g. which features mattered most, how leakage was avoided, how the two models compared.
    ],
    outcomes: [
      // Add evaluation metrics (e.g. MAE / MAPE vs. a baseline) when you're ready to publish them.
    ],
    links: {
      github: "https://github.com/", // ← replace with the repository URL
    },
  },

  /* ------------------------------------------------------------------
     TEMPLATE — copy, paste, and fill in to add a project.
  ------------------------------------------------------------------
  {
    slug: "my-new-project",
    title: "My New Project",
    category: "Software",           // "AI / ML" | "Data" | "Software" | "Technology" | "Business" | "Investing" | "Experiments" | "Other"
    year: "2026",
    status: "In progress",          // "Live" | "Completed" | "In progress" | "Archived" | "Concept"
    featured: false,                // true → appears on the home page
    role: "Founder / engineer",
    summary: "One line about the project.",
    description: "Two or three sentences about what it is.",
    technologies: ["FastAPI", "PostgreSQL"],
    cover: { src: "/images/projects/my-new-project/cover.png", alt: "…", aspect: "16/10" },
    gallery: [],
    overview: ["…"],
    problem: ["…"],
    solution: ["…"],
    links: { live: "https://…", github: "https://github.com/…" },
  },
  ------------------------------------------------------------------ */
];
