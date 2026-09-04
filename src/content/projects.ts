import type { Project } from "./types";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  EDIT YOUR PROJECTS HERE                                         ║
 * ║  Add a new object to the array to add a project. Order matters — ║
 * ║  the first project is "01", the second "02", and so on.          ║
 * ╚══════════════════════════════════════════════════════════════════╝
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
 * and `links.other: [{ label, href }]`. Leave out any you don't have — the button
 * simply won't render.
 *
 * CASE-STUDY SECTIONS
 * -------------------
 * overview / problem / solution / approach / architecture / details / outcomes are
 * arrays of paragraphs. Omit any section and it won't render.
 */
export const projects: Project[] = [
  {
    slug: "examination-platform",
    title: "Full-Stack Examination Platform",
    category: "Software",
    year: "2025",
    status: "Completed",
    featured: true,
    onHome: true,
    role: "Full-stack development",
    summary: "A multi-user examination platform with live dashboards, automated alerts and cached, sub-200ms responses.",
    description:
      "An end-to-end examination platform built as a Vue.js single-page application on a Flask REST API, with Redis caching and Celery background workers handling asynchronous and scheduled work.",
    technologies: ["Flask", "Vue.js", "Redis", "Celery"],

    metrics: [
      { value: "50+", label: "REST APIs" },
      { value: "40%", label: "Less database query load from caching" },
      { value: "sub-200ms", label: "Response times" },
      { value: "50+", label: "Secured API endpoints" },
    ],

    // cover: { src: "/images/projects/examination-platform/cover.png", alt: "Examination platform dashboard", aspect: "16/10" },
    // gallery: [],

    overview: [
      "The platform separates two roles: administrators who manage subjects, chapters and quizzes, and users who attempt timed quizzes and review live results. The client is a Vue.js single-page application; the server is a Flask REST API with PostgreSQL behind it.",
      "It was built as a full-stack engineering project and graded 9/10 — the emphasis was on a system that stays responsive under real, uneven load rather than a demo that works for one user.",
    ],
    problem: [
      "Examination systems have spiky load — many candidates hit the same quiz at the same moment, then nothing — and they also need scheduled work such as score reports and email notifications without slowing down the people actively taking exams.",
      "Authentication had to be safe across both user roles, and the interface needed to show live scores as results came in rather than after a page refresh.",
    ],
    solution: [
      "The request path is kept thin: Flask serves JSON quickly, while anything slow or scheduled is handed to Celery workers through Redis. Frequently-read data is cached in Redis and invalidated whenever an administrator changes it.",
      "Live score dashboards update as quizzes are submitted, and automated email alerts are dispatched by background jobs so they never block a request.",
    ],
    approach: [
      "Security was treated as part of the architecture, not an afterthought: OTP verification and OAuth 2.0 authentication sit in front of 50+ API endpoints, with role-based views on the client.",
      "More than 50 REST APIs were designed around the two user roles, and Redis caching reduced database query load by 40% while keeping response times under 200 milliseconds.",
    ],
    architecture: [
      "Vue.js on the client with role-based views; Flask serving the API and persistence layer; Redis acting as both the Celery broker and the application cache; Celery running asynchronous and scheduled jobs such as alerts and reports.",
    ],
    details: [
      "Background jobs handle everything a user shouldn't wait on — emails, score aggregation and scheduled reports — while cache invalidation is triggered by admin writes so dashboards never serve stale data.",
    ],
    outcomes: [
      "Shipped a complete multi-role platform with live score dashboards and automated email alerts.",
      "Created 50+ REST APIs with Redis caching that cut database query load by 40% and held response times under 200ms.",
      "Secured the application with OTP verification and OAuth 2.0 across 50+ endpoints.",
      "Graded 9/10 as a full-stack engineering project.",
    ],
    links: {
      github: "https://github.com/daiwik-project",
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
    onHome: true,
    role: "Data preparation, modelling, evaluation",
    summary: "Gradient-boosted forecasting of cinema attendance from 300,000+ rows of historical and calendar data.",
    description:
      "A forecasting model that predicts cinema audience numbers from historical attendance. Built in Python with Pandas for feature engineering and LightGBM and XGBoost for modelling, validated under a time-aware scheme.",
    technologies: ["Python", "Pandas", "LightGBM", "XGBoost"],

    metrics: [
      { value: "300K+", label: "Rows of historical data" },
      { value: "25+", label: "Engineered features" },
      { value: "14.8", label: "Mean absolute error" },
      { value: "9/10", label: "Project grade" },
    ],

    // cover: { src: "/images/projects/cinema-audience-forecasting/cover.png", alt: "Forecast vs. actual attendance", aspect: "16/10" },

    overview: [
      "Cinemas plan staffing, concessions and screen allocation around expected attendance. The goal was a model that forecasts audience size accurately enough to support those operational decisions, built from a dataset of more than 300,000 historical entries.",
    ],
    problem: [
      "Attendance mixes slow signals — seasonality, weekday patterns, holidays — with fast ones such as a film's opening week. Naive approaches either over-fit recent hits or miss the calendar structure entirely, and random train/test splits let future data leak into training.",
    ],
    solution: [
      "More than 25 features were engineered in Pandas using rolling windows, lag variables and time-based aggregations, then gradient-boosted tree models (LightGBM and XGBoost) were trained and compared.",
      "Validation was time-ordered so no fold ever saw the future, and hyperparameters were tuned against held-out later periods.",
    ],
    approach: [
      "The modelling work focused on features a cinema can reason about — recent performance, day-of-week and holiday effects, and film-specific momentum — rather than opaque interactions.",
      "LightGBM and XGBoost were benchmarked against each other with early stopping, keeping the model that generalised best on the most recent periods.",
    ],
    architecture: [
      "A reproducible Pandas pipeline turns raw attendance data into a feature matrix. Models train with early stopping against time-ordered folds and are evaluated on held-out later periods.",
    ],
    details: [
      "Rolling-window and lag features capture recent momentum; calendar features capture the predictable structure of a week and a year; leakage was avoided by computing every feature from information available at forecast time only.",
    ],
    outcomes: [
      "Predicted cinema attendance from 300,000+ historical records.",
      "Engineered 25+ features using rolling windows, lag variables and time-based aggregations.",
      "Reached a mean absolute error of 14.8 with tuned LightGBM and XGBoost models.",
      "Graded 9/10 as a machine-learning project.",
    ],
    links: {
      github: "https://github.com/daiwik-project",
    },
  },

  /* ------------------------------------------------------------------
     TEMPLATE — copy, paste, and fill in to add a project.
  ------------------------------------------------------------------
  {
    slug: "my-new-project",
    title: "My New Project",
    category: "Software",      // "AI / ML" | "Data" | "Software" | "Technology" | "Business" | "Investing" | "Experiments" | "Other"
    year: "2026",
    status: "In progress",     // "Live" | "Completed" | "In progress" | "Archived" | "Concept"
    featured: false,           // true → large editorial block on /work
    onHome: false,             // true → appears in home "Selected work"
    role: "Founder / engineer",
    summary: "One line about the project.",
    description: "Two or three sentences about what it is.",
    technologies: ["FastAPI", "PostgreSQL"],
    metrics: [{ value: "2x", label: "Faster" }],
    cover: { src: "/images/projects/my-new-project/cover.png", alt: "…", aspect: "16/10" },
    gallery: [],
    overview: ["…"],
    problem: ["…"],
    solution: ["…"],
    links: { live: "https://…", github: "https://github.com/…" },
  },
  ------------------------------------------------------------------ */
];
