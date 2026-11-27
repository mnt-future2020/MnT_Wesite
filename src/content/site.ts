/**
 * Shared site content for MnT Future.
 *
 * The positioning, tagline and the ten service areas come from the senior's
 * homepage content (homepage-content.md, 2026-11-26). The rest comes from the
 * live mntfuture.com copy (crawl of August 2026). Do not add numbers, client
 * outcomes, prices or partner tiers that are not already written here: the
 * site's whole position is that every claim on it can be shown.
 *
 * Voice: British spelling (customise, optimise, licence), short declarative
 * sentences, "you" for the reader and "we" for MnT. The method stage is
 * spelled "Optimize" on purpose.
 */

export type Link = { label: string; href: string };

/** The live site's address (Google, share pictures and the sitemap use it). */
export const siteUrl = "https://mntfuture.com";

export const company = {
  name: "MnT Future",
  legalName: "Magizh NexGen Technologies",
  email: "info@mntfuture.com",
  base: "Madurai, India",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/mntfuture" },
    { label: "Instagram", href: "https://www.instagram.com/mnt_future" },
    { label: "Facebook", href: "https://www.facebook.com/mntfuture" },
  ] satisfies Link[],
  ratings: [
    { source: "Clutch", score: "5.0" },
    { source: "Google", score: "5.0" },
  ],
  partners: [
    { name: "AWS", tier: "Official Partner" },
    { name: "Google Cloud", tier: "Official Partner" },
    { name: "Shopify", tier: "Official Partner" },
    { name: "Anthropic", tier: "Claude Partner Network" },
    { name: "NVIDIA", tier: "Developer Program" },
    { name: "OpenAI", tier: "Select Partner" },
  ],
};

/**
 * The navbar: Services (a large dropdown with every area), Work and Insights (plain links)
 * and Company (a small dropdown). Few items, but rich panels (the user's choice).
 */
export const nav = {
  services: { label: "Services", href: "/services", allLabel: "All services" },
  work: { label: "Work", href: "/work" },
  insights: { label: "Insights", href: "/insights" },
  company: {
    label: "Company",
    items: [
      { label: "About us", href: "/about", note: "Who we are, and where we work from" },
      { label: "Contact", href: "/contact", note: "Talk to us or book a session" },
    ],
  },
  /** The card inside the Services menu. */
  sessionCard: {
    title: "Free strategy session",
    text: "Plan your next project with our team. You keep the written plan.",
  },
};

/**
 * The senior's tagline (used in the footer; the hero heading shows it too). Their positioning
 * line, "Enterprise AI, Custom Software & Digital Transformation Solutions", opens the hero's sub-line.
 */
export const positioning = {
  tagline: "Enterprise Technology. Intelligent Transformation.",
};

export const primaryCta: Link = {
  label: "Book a free strategy session",
  href: "/contact?topic=session",
};

/** Homepage hero. */
export const heroIntro = {
  // The senior's tagline, split so the second half gets the gradient.
  lead: "Enterprise technology.",
  highlight: "Intelligent transformation.",
  sub: "Enterprise AI, custom software and digital transformation solutions, built for your business and taken all the way to production.",
  secondaryCta: { label: "See our work", href: "/work" } satisfies Link,
};

/** "What we build" section on the homepage. */
export const whatWeBuild = {
  /** The heading as it is shown: one line each. */
  titleLines: ["Everything your business", "runs on."],
};

/** One service: its name (the senior's, word for word) and one short line saying what it is. */
export type Service = { name: string; line: string };

export type ServiceAreaId =
  | "ai-automation"
  | "enterprise-software"
  | "voice-ai"
  | "saas-product-engineering"
  | "web-mobile-apps"
  | "api-integration"
  | "data-bi"
  | "cloud-devops"
  | "cybersecurity"
  | "ui-ux";

/**
 * A service area. The area and service names are the senior's content, word for word.
 * `summary` and each service's `line` are our draft (services-content.md, 2026-11-26),
 * built with the user's go-ahead before the senior has reviewed them.
 */
export type ServiceArea = {
  /** Short id. The Services page uses it as the area's anchor (href "/services#id") and to pick its picture. */
  id: ServiceAreaId;
  name: string;
  /** One sentence on what the area solves. */
  summary: string;
  /** A few words on what it covers (the Services menu in the navbar). */
  short: string;
  href: string;
  services: Service[];
};

/**
 * A tab in "What we build": the service areas grouped into four tabs (AI, software,
 * data, cloud). The area names and services are the senior's content
 * (homepage-content.md, 2026-11-26), word for word. The tab labels, headlines
 * and leads are our wording, written from that content.
 */
export type ServiceGroup = {
  id: "ai" | "software" | "data" | "cloud";
  /** Tab label on tablets and desktop. */
  tab: string;
  /** Shorter tab label on phones. */
  tabShort: string;
  /** A few words on what the tab covers (Services page hero links). */
  short: string;
  /** Small label above the headline. */
  label: string;
  headline: string;
  /** One line under the headline. */
  lead: string;
  link: Link;
  areas: ServiceArea[];
};

const aiAutomation: ServiceArea = {
  id: "ai-automation",
  name: "AI & Intelligent Automation",
  summary: "AI that does real work inside your business systems, not just answers questions.",
  short: "Agents, workflows and documents",
  href: "/services#ai-automation",
  services: [
    { name: "Enterprise AI Agents", line: "Agents that act inside your systems, within clear limits, logging every step." },
    { name: "AI Workflow Automation", line: "Repeated daily work done automatically, with a person checking where it matters." },
    { name: "Multi-Agent Systems", line: "Several AI agents sharing one job, each handling its own part." },
    { name: "AI Customer Support", line: "Common customer questions answered instantly, with hard cases passed to your team." },
    { name: "AI Sales Automation", line: "Leads followed up, qualified and booked in, without manual chasing." },
    { name: "AI Document Processing", line: "Invoices, forms and contracts read and entered, without retyping." },
    { name: "Enterprise Knowledge Management", line: "Your documents and policies searchable, with answers that show the source." },
  ],
};

const enterpriseSoftware: ServiceArea = {
  id: "enterprise-software",
  name: "Custom Enterprise Software Development",
  summary: "Software built around how your business actually works, not the other way round.",
  short: "ERP, CRM, HRMS and portals",
  href: "/services#enterprise-software",
  services: [
    { name: "Enterprise ERP Development", line: "One system for finance, purchasing, stock and operations, built to your process." },
    { name: "CRM Development", line: "Customers, leads and conversations in one place, shaped to how you sell." },
    { name: "HRMS & Payroll Systems", line: "Attendance, leave, payroll and employee records in one system." },
    { name: "Inventory & Supply Chain Management", line: "Stock, suppliers and orders tracked across every warehouse and outlet." },
    { name: "Workflow Management Systems", line: "Approvals and handovers moved out of email into one tracked flow." },
    { name: "Custom Business Applications", line: "Software for the work no ready-made product handles well." },
    { name: "Enterprise Portals", line: "One secure place for staff, partners or customers to log in." },
  ],
};

const voiceAi: ServiceArea = {
  id: "voice-ai",
  name: "Voice AI & Conversational AI",
  summary: "AI that talks with your customers by phone, WhatsApp and chat.",
  short: "Calls, WhatsApp and chat",
  href: "/services#voice-ai",
  services: [
    { name: "AI Voice Calling Agents", line: "AI agents that make and answer calls in a natural voice." },
    { name: "AI Contact Center Solutions", line: "Calls answered, routed and summarised, so your agents handle what needs them." },
    { name: "AI Receptionist", line: "Enquiries and bookings handled by phone, at any hour." },
    { name: "Multilingual Voice Assistants", line: "Voice assistants that speak with customers in their own language." },
    { name: "WhatsApp AI Automation", line: "Orders, enquiries and updates handled on WhatsApp automatically." },
    { name: "Conversational AI Chatbots", line: "Chat on your website and apps that answers from your own content." },
    { name: "SIP & PBX Integration", line: "Voice AI connected to the phone system you already use." },
  ],
};

const saasProduct: ServiceArea = {
  id: "saas-product-engineering",
  name: "Enterprise SaaS & Product Engineering",
  summary: "Software products, from the first version to a platform many customers use.",
  short: "SaaS platforms and MVPs",
  href: "/services#saas-product-engineering",
  services: [
    { name: "Custom SaaS Development", line: "Your software product, built to be sold by subscription." },
    { name: "Multi-Tenant SaaS Platforms", line: "One platform serving many customers, each with its data kept separate." },
    { name: "White-Label Solutions", line: "Ready software under your brand and name, customised to you." },
    { name: "MVP & Product Development", line: "A first version to test with real users, then the full product." },
    { name: "Enterprise Platform Engineering", line: "Shared foundations your teams build on: accounts, permissions, billing and APIs." },
    { name: "Legacy Software Modernization", line: "Old software rebuilt on modern technology without stopping the business." },
  ],
};

const webMobile: ServiceArea = {
  id: "web-mobile-apps",
  name: "Web & Mobile Application Development",
  summary: "Websites and apps your customers, partners and staff use every day.",
  short: "Web, Android and iOS apps",
  href: "/services#web-mobile-apps",
  services: [
    { name: "Enterprise Web Applications", line: "Browser-based software for your teams, fast and secure." },
    { name: "Android & iOS Applications", line: "Apps for Android and iPhone, published under your company's name." },
    { name: "Progressive Web Applications", line: "Websites that install and work like apps, even on weak connections." },
    { name: "B2B & B2C Platforms", line: "Platforms for selling to businesses, to consumers, or to both." },
    { name: "Customer & Partner Portals", line: "Self-service for customers and partners: orders, documents, tickets and accounts." },
    { name: "Marketplace Development", line: "Many sellers on one platform, with onboarding, commission and payouts handled." },
  ],
};

const apiIntegration: ServiceArea = {
  id: "api-integration",
  name: "API & Enterprise System Integration",
  summary: "Your systems connected, so data flows between them without retyping.",
  short: "APIs and connected systems",
  href: "/services#api-integration",
  services: [
    { name: "API Development", line: "Clean, documented APIs that let your systems and partners connect." },
    { name: "Third-Party API Integration", line: "Outside services connected to your software: couriers, tax, maps and messaging." },
    { name: "ERP & CRM Integration", line: "Sales, finance and operations data kept in step across systems." },
    { name: "Payment Gateway Integration", line: "UPI, card and wallet payments, with refunds and reconciliation." },
    { name: "WhatsApp & Telephony Integration", line: "WhatsApp, calls and SMS connected to your CRM and support tools." },
    { name: "Legacy System Integration", line: "Older systems connected to new ones, without a risky replacement." },
    { name: "Enterprise Middleware Development", line: "The layer that moves and translates data between all your systems." },
  ],
};

const dataBi: ServiceArea = {
  id: "data-bi",
  name: "Data Engineering & Business Intelligence",
  summary: "Your data collected, cleaned and turned into decisions.",
  short: "Pipelines, dashboards, forecasts",
  href: "/services#data-bi",
  services: [
    { name: "Data Engineering", line: "Data from every system collected, cleaned and kept reliable." },
    { name: "Data Pipeline Development", line: "Automated flows that move data where it is needed, on schedule." },
    { name: "Business Intelligence Dashboards", line: "The numbers that matter, live on one screen." },
    { name: "AI-Powered Analytics", line: "Ask questions of your data in plain language and get answers." },
    { name: "Predictive Analytics", line: "Forecasts for sales, demand and stock based on your history." },
    { name: "Data Warehousing", line: "All your business data in one place, ready for reporting." },
    { name: "Reporting Automation", line: "Reports built and sent on their own, on time, every time." },
  ],
};

const cloudDevops: ServiceArea = {
  id: "cloud-devops",
  name: "Cloud & DevOps Engineering",
  summary: "Infrastructure that stays up, scales, and costs no more than it should.",
  short: "AWS, CI/CD and cloud costs",
  href: "/services#cloud-devops",
  services: [
    { name: "AWS & Cloud Solutions", line: "Your systems designed and run on AWS and other clouds." },
    { name: "Cloud Infrastructure Architecture", line: "Cloud set-up planned for uptime, security and growth from the start." },
    { name: "Cloud Migration", line: "Systems moved to the cloud step by step, without downtime surprises." },
    { name: "DevOps Automation", line: "Builds, tests and server set-up automated, so releases are routine." },
    { name: "CI/CD Implementation", line: "Every change tested and deployed automatically, safely and often." },
    { name: "Database Optimization", line: "Slow queries and databases tuned so your software stays fast." },
    { name: "Cloud Cost Optimization", line: "Cloud bills cut by removing waste and right-sizing what you run." },
  ],
};

const cybersecurity: ServiceArea = {
  id: "cybersecurity",
  name: "Cybersecurity & IT Infrastructure",
  summary: "Your software, data and people protected, with proof to show for it.",
  short: "Audits, access and protection",
  href: "/services#cybersecurity",
  services: [
    { name: "Application Security", line: "Security built into your software, from the code to release." },
    { name: "API Security", line: "APIs protected with proper authentication, limits and monitoring." },
    { name: "Cloud Security", line: "Cloud accounts, networks and data locked down and watched." },
    { name: "Vulnerability Assessment", line: "Weak points found and ranked before someone else finds them." },
    { name: "Identity & Access Management", line: "The right people get the right access, and nobody else." },
    { name: "Security Audits", line: "A thorough check of your systems, with a clear list of fixes." },
    { name: "IT Infrastructure Management", line: "Servers, networks and devices kept updated, monitored and running." },
  ],
};

const uiUx: ServiceArea = {
  id: "ui-ux",
  name: "UI/UX & Digital Product Engineering",
  summary: "Software that people find easy to use, and old software made new.",
  short: "Design and modernisation",
  href: "/services#ui-ux",
  services: [
    { name: "Enterprise UI/UX Design", line: "Screens designed around how your staff and customers actually work." },
    { name: "SaaS Product Design", line: "Product design that helps users sign up, get started and stay." },
    { name: "Dashboard & Interface Design", line: "Complex data and controls made clear at a glance." },
    { name: "Product Prototyping", line: "Clickable prototypes to test ideas before anything is built." },
    { name: "Software Re-engineering", line: "Existing software restructured to be faster and easier to change." },
    { name: "Application Modernization", line: "Dated applications given a modern design and technology, keeping your data." },
  ],
};

/** All the service areas, in the senior's order. */
export const serviceAreas: ServiceArea[] = [
  aiAutomation,
  enterpriseSoftware,
  voiceAi,
  saasProduct,
  webMobile,
  apiIntegration,
  dataBi,
  cloudDevops,
  cybersecurity,
  uiUx,
];

/** The four "What we build" tabs. */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "ai",
    tab: "AI",
    tabShort: "AI",
    short: "Automation, AI agents and voice AI",
    label: "AI and voice AI",
    headline: "AI agents, automation and voice AI that work inside your business.",
    lead: "From enterprise AI agents and document processing to voice agents that answer your calls in more than one language.",
    link: { label: "Explore AI services", href: "/services#ai" },
    areas: [aiAutomation, voiceAi],
  },
  {
    id: "software",
    tab: "Software & apps",
    tabShort: "Software",
    short: "Enterprise software, SaaS, apps and design",
    label: "Custom software",
    headline: "Enterprise software, SaaS and apps, built around how you work.",
    lead: "ERP, CRM and HRMS systems, SaaS platforms, web and mobile apps, and the design behind them.",
    link: { label: "Explore software services", href: "/services#software" },
    areas: [enterpriseSoftware, saasProduct, webMobile, uiUx],
  },
  {
    id: "data",
    tab: "Data & integration",
    tabShort: "Data",
    short: "APIs, integration, data and BI",
    label: "Integration and data",
    headline: "Your systems connected, and your data put to work.",
    lead: "APIs that join your ERP, CRM, payments and telephony, and the pipelines and dashboards that turn the data into decisions.",
    link: { label: "Explore data services", href: "/services#data" },
    areas: [apiIntegration, dataBi],
  },
  {
    id: "cloud",
    tab: "Cloud & security",
    tabShort: "Cloud",
    short: "Cloud, DevOps and cybersecurity",
    label: "Cloud and security",
    headline: "Cloud, DevOps and security that keep it all running.",
    lead: "Cloud architecture, migration and CI/CD, with application, API and cloud security checked and audited.",
    link: { label: "Explore cloud services", href: "/services#cloud" },
    areas: [cloudDevops, cybersecurity],
  },
];

/**
 * Homepage "Why MnT Future": a bento grid that a switch flips between the
 * usual agency and MnT. The MnT side is the site's "Why MnT Future" reasons
 * in short form; the usual side is simply their opposite, as the original copy
 * draws it ("no per-seat licence, no commission", "rather than billing hours",
 * "nothing that stops working the day our contract ends"). The method reason is
 * left out because "How we work" shows it. Never compare junior and senior
 * people: the company works as one team (the user's rule).
 */
export const whyMnt = {
  label: "Why MnT Future",
  titleLines: ["Not the usual", "agency."],
  body: "Flip the switch to see the difference.",
  options: { usual: "The usual agency", mnt: "MnT Future" },
  team: {
    label: "Who builds it",
    usual: "Handed from person to person.",
    mnt: "One team, start to finish.",
    badge: { usual: "Handed off", mnt: "One team" },
  },
  ownership: {
    label: "Who owns it",
    usual: "They do. You pay to use it.",
    mnt: "You do. All of it.",
    items: ["Platform", "Data", "Servers", "Code"],
  },
  way: {
    label: "How it is built",
    usual: "From outside, by the hour.",
    mnt: "Inside your team.",
    circles: { yours: "Your team", usual: "Agency", mnt: "MnT" },
  },
  after: {
    label: "When the contract ends",
    usual: "Things stop working.",
    mnt: "Nothing stops working.",
    status: { usual: "Switched off", mnt: "Running" },
    marker: "Contract ends",
  },
};

/** The five-stage method, with what you get at each stage. This IS a sequence, so numbering it is honest. */
export const method = [
  { name: "Discover", short: "A costed path to production, with the hard parts named out loud." },
  { name: "Design", short: "An agreed definition of working, before anyone writes code." },
  { name: "Build", short: "Working software you review as it appears." },
  { name: "Deploy", short: "A live system on real data, with somebody watching it." },
  { name: "Optimize", short: "Evidence it works, and a team that can run it without us." },
];

/** Homepage "How we work" section. */
export const howWeWork = {
  label: "How we work",
  titleLines: ["One method.", "Five steps."],
  body: "Written down, and followed on every engagement.",
};

export type FeaturedProject = {
  client: string;
  /** The client's live website. Cards link here. */
  url: string;
  /** One short line saying what the business is. */
  tagline: string;
  /** Screenshot of the website's first screen, in /public/work. */
  image: string;
};

/** Live websites shown as cards in the homepage "Our work" section, in this order. */
export const featuredWork: FeaturedProject[] = [
  {
    client: "iSuite AI",
    url: "https://isuite.ai/",
    tagline: "Industry-specific business software with built-in AI.",
    image: "/work/isuite-ai.png",
  },
  {
    client: "Choco Rush",
    url: "https://www.chocorush.in/",
    tagline: "Custom cakes, waffles and brownies, ordered on WhatsApp.",
    image: "/work/choco-rush.png",
  },
  {
    client: "Shiv Foto",
    url: "https://shivfoto.in/",
    tagline: "Wedding, newborn and event photography from Madurai.",
    image: "/work/shiv-foto.png",
  },
  {
    client: "Lia Fashion",
    url: "https://www.liafashion.in/",
    tagline: "Ethnic wear sold online and in store from one stock pool.",
    image: "/work/lia-fashion.png",
  },
  {
    client: "Sai Nandhini Tasty World",
    url: "https://sntasty.com/",
    tagline: "Homemade cookies, cakes and sweets, shipped across India.",
    image: "/work/sai-nandhini.png",
  },
];

/** "Our work" section on the homepage. */
export const ourWork = {
  label: "Our work",
  /** The heading as it is shown: one line each. */
  titleLines: ["Real platforms,", "shipped."],
  body: "Judge us on what we ship, not on a logo wall.",
  cta: { label: "See all our work", href: "/work" } satisfies Link,
  yoursTitle: "Your platform could be next.",
  yoursBody: "Let's plan your next project together.",
} as const;

/** Homepage closing banner (the strategy session in short). */
export const closingCta = {
  label: "Strategy session",
  titleLines: ["Let's plan your next", "project together."],
  body: "Meet our team for free and get a clear written plan.",
  emailLead: "Or email us at",
};

/**
 * Homepage FAQ ("Straight answers"): six questions in a normal FAQ list.
 * Questions and answers are the site's own "we will tell you no" lines and FAQs, word for word,
 * except the first one (existing systems), written from the senior's integration services, and
 * the first sentence of "How long does a build take?" (the old storefront timeline was removed).
 */
export const straightAnswers = {
  label: "Frequently asked questions",
  titleLines: ["Straight answers.", "Even when it is no."],
  moreLead: "Have another question? Email us at",
  items: [
    {
      question: "Can you work with the systems we already have?",
      answer:
        "Yes. We connect new work to your ERP, CRM, payment gateways, WhatsApp and telephony, including older systems, rather than asking you to replace everything.",
    },
    {
      question: "We built one already and it is struggling.",
      answer:
        "We will audit it and tell you whether it needs fixing or replacing, including when the answer is fixing.",
    },
    {
      question: "How do we know it is worth it?",
      answer:
        "If the numbers do not justify the build, we will tell you before you spend anything.",
    },
    {
      question: "How long does a build take?",
      answer:
        "It depends on the scope, and we give you a costed plan before anything starts. A discovery sprint for AI work takes 1 to 2 weeks, and a first useful deployment follows 6 to 12 weeks after it. Anyone promising you production AI in two weeks is describing a demo.",
    },
    {
      question: "Do you only work with one AI provider?",
      answer:
        "No. We work with Claude, OpenAI and open-weight models you can run yourself, and the choice is made on your requirements rather than our preference.",
    },
    {
      question: "Do we have to build it with you?",
      answer:
        "No. The plan is yours and it is written to be usable by anyone. Plenty of clients take it to their own team, and that is a fine outcome.",
    },
  ],
};

/**
 * Services page (/services). The hero is our wording, written from the senior's
 * positioning; it never states how many services there are (the user's rule).
 */
export const servicesPage = {
  hero: {
    /** The heading as it is shown: one line each on larger screens. */
    titleLines: ["Make your business", "run smarter."],
    body: "Enterprise AI, custom software, integration, data, cloud and security. Choose one service, or bring us the whole problem and we will plan it with you.",
  },
  /**
   * "Ways to work with us": the old site's three engagement models (discovery sprint,
   * embedded team, discovery to production) in plain words: each card starts with the
   * customer's own question. No "engineer" or "senior". No durations, prices or payment terms:
   * the senior has not confirmed them, so the site does not promise them (the user's rule).
   */
  ways: {
    label: "Ways to work with us",
    titleLines: ["Three ways", "to work with us."],
    body: "Pick the one that fits where you are today.",
    options: [
      {
        id: "sprint",
        question: "Not sure yet?",
        title: "Start with a plan",
        text: "We study your problem and your data, then give you a written plan. You decide what happens next.",
        goodFor: "New ideas, unclear needs",
        youGet: "A written plan",
      },
      {
        id: "team",
        question: "Lots to build?",
        title: "Get a team",
        badge: "Our core offering",
        text: "Our people join your team and work with you, for as long as you need them. They build, launch and stay.",
        goodFor: "Ongoing work, many projects",
        youGet: "People inside your team",
      },
      {
        id: "project",
        question: "One clear project?",
        title: "Build one project",
        text: "You know what you want built. We agree the scope up front, then build it stage by stage.",
        goodFor: "One clear goal",
        youGet: "One finished system",
      },
    ],
    help: { lead: "Not sure which fits?", link: { label: "Ask us in a free strategy session", href: "/contact?topic=session" } },
  },
};

/**
 * Work page (/work): what we have built for real clients.
 */
export const workPage = {
  hero: {
    /** The heading as it is shown: one line each on larger screens. */
    titleLines: ["Real platforms,", "still running."],
    body: "Websites, apps and platforms we built for businesses in India and abroad. Every one of them is live: open it and see it working.",
    /**
     * The row along the bottom: the kinds of work in the projects below (true for every
     * confirmed project). It replaced the old site's counts (19 / 13 / 3), which were not reliable.
     */
    builtLabel: "What we built for them",
    built: [
      { id: "stores", label: "Online stores" },
      { id: "software", label: "Business software" },
      { id: "websites", label: "Websites" },
      { id: "ai", label: "AI features" },
      { id: "payments", label: "Payments & shipping" },
    ],
  },
  /**
   * The projects, as one bento grid: iSuite AI first and larger, the rest as smaller cards
   * (screenshot, name, industry). The user wants little text on this page. Only projects
   * the user has confirmed MnT built go here (Leats, on the old site's list, was not built
   * by MnT); more are added once the team confirms the old list and screenshots are taken.
   */
  projects: {
    label: "Case studies",
    titleLines: ["Selected work."],
    /** The last tile of the grid on desktop, filling the space after the projects. */
    next: {
      title: "Your project could be next.",
      text: "Tell us what you need, and we will plan it with you in a free strategy session.",
    },
    items: [
      {
        client: "iSuite AI",
        url: "https://isuite.ai/",
        domain: "isuite.ai",
        image: "/work/isuite-ai.png",
        label: "Business software · AI",
        line: "Industry-specific business software with built-in AI.",
      },
      {
        client: "Lia Fashion",
        url: "https://www.liafashion.in/",
        domain: "liafashion.in",
        image: "/work/lia-fashion.png",
        label: "Fashion · Online and in store",
      },
      {
        client: "Sai Nandhini Tasty World",
        url: "https://sntasty.com/",
        domain: "sntasty.com",
        image: "/work/sai-nandhini.png",
        label: "Food · Shipped across India",
      },
      {
        client: "Choco Rush",
        url: "https://www.chocorush.in/",
        domain: "chocorush.in",
        image: "/work/choco-rush.png",
        label: "Bakery · Orders on WhatsApp",
      },
      {
        client: "Shiv Foto",
        url: "https://shivfoto.in/",
        domain: "shivfoto.in",
        image: "/work/shiv-foto.png",
        label: "Photography · Madurai",
      },
    ],
  },
};

/**
 * About page. DRAFT text until the user sends the reference for this page (do not take it from
 * the old site). Never call the team "small", "senior" or an "engineering team", and never state
 * a number of services (the user's rules).
 */
export const aboutPage = {
  hero: {
    /** The heading as it is shown: one line each on larger screens. */
    titleLines: ["We build it.", "We stay until it runs."],
    body: "We build enterprise AI, custom software and digital transformation solutions from Madurai. We work inside your team and your environment.",
    facts: [
      { value: "Madurai", label: "Where we are based" },
      { value: "End to end", label: "From the first plan to the live system" },
      { value: "Inside your team", label: "We work in your environment" },
      { value: "5 stages", label: "Discover to Optimize, every engagement" },
    ],
  },
  /**
   * "Who we are": a big statement on the left, a company profile card on the right.
   * DRAFT text, made only from lines already on the new site: the user will send the real
   * reference. Do not take About text from the old site (the user's rule).
   */
  story: {
    label: "Who we are",
    /** The statement, in pieces: `accent` pieces are shown in the blue gradient. */
    statement: [
      { text: "We plan, build and launch " },
      { text: "software and AI", accent: true },
      { text: " for businesses, and we " },
      { text: "stay with it", accent: true },
      { text: " after it goes live." },
    ],
    body: "MnT Future is a technology company in Madurai, India. We build AI systems, custom software, websites and mobile apps, and connect them to the systems you already use.",
    card: {
      label: "Company profile",
      rows: [
        { label: "What we build", value: "AI systems, custom software, websites and mobile apps" },
        { label: "Based in", value: "Madurai, India" },
        { label: "How we work", value: "Closely with your team, in your own systems" },
        { label: "Who builds it", value: "One team, from the first plan to launch" },
        { label: "Our steps", value: "Discover, Design, Build, Deploy, Optimize" },
      ],
    },
  },
  /**
   * "What we believe": four big cards that stack on top of each other as you scroll, each with
   * a small drawn picture (`picture`). DRAFT text from lines already on the new site.
   */
  beliefs: {
    label: "What we believe",
    titleLines: ["What you can", "expect from us."],
    body: "Four simple promises we make to every client.",
    items: [
      {
        picture: "live" as const,
        line: "We stay until it is live.",
        text: "Not just a demo. We stay until your system is working with your real data and real users.",
      },
      {
        picture: "own" as const,
        line: "You own everything we build.",
        text: "The code, the data and the servers are yours. Nothing stops working if you stop working with us.",
      },
      {
        picture: "honest" as const,
        line: "We give you honest advice.",
        text: "If something is not worth building, we will tell you before you spend money on it.",
      },
      {
        picture: "inside" as const,
        line: "We work as part of your team.",
        text: "We work closely with your people, in your own systems, not from a distance.",
      },
    ],
  },
  /**
   * "Our team": four even cards in one row, one per person, text only (no photos, the user's choice), each
   * with a link to the person's LinkedIn profile. PLACEHOLDERS until the user sends the real
   * names, roles, lines and LinkedIn links. A card with an empty `linkedin` shows the button
   * without a link.
   */
  team: {
    label: "Our team",
    titleLines: ["The people", "behind the work."],
    body: "One team plans it, builds it and stays with it after it goes live.",
    people: [
      { name: "Full name", role: "Role", line: "One short line about this person.", linkedin: "" },
      { name: "Full name", role: "Role", line: "One short line about this person.", linkedin: "" },
      { name: "Full name", role: "Role", line: "One short line about this person.", linkedin: "" },
      { name: "Full name", role: "Role", line: "One short line about this person.", linkedin: "" },
    ],
  },
};

/**
 * Contact page: how to reach us on the left, the form on the right.
 * The phone number and office address are PLACEHOLDERS until the user sends the real ones.
 * The form is not connected yet (the company will decide where messages go): sending shows a
 * note pointing to the email address instead. "Book a free strategy session" buttons open this
 * page as /contact?topic=session, which ticks that topic in the form.
 */
export const contactPage = {
  hero: {
    titleLines: ["Let's talk about", "your project."],
    body: "Tell us what you need, and our team will get back to you. Or book a free strategy session.",
  },
  details: [
    { id: "email", label: "Email", value: company.email, href: `mailto:${company.email}` },
    /** PLACEHOLDER: the real number comes from the user. No link until then. */
    { id: "phone", label: "Phone", value: "+91 00000 00000", href: "" },
    /** PLACEHOLDER: the real address comes from the user. */
    { id: "office", label: "Office", value: "Office address, Madurai, Tamil Nadu", href: "" },
    { id: "linkedin", label: "LinkedIn", value: "MnT Future", href: "https://www.linkedin.com/company/mntfuture" },
  ],
  form: {
    title: "Send us a message",
    fields: {
      name: { label: "Your name", placeholder: "Full name" },
      company: { label: "Company", placeholder: "Company name" },
      email: { label: "Email", placeholder: "you@company.com" },
      phone: { label: "Phone", placeholder: "Phone number" },
      message: { label: "Message", placeholder: "Tell us a little about what you want to build or fix." },
    },
    topicsLabel: "What can we help with?",
    /** Tap to pick one or more. "session" is ticked when the page is opened from a Book button. */
    topics: [
      { id: "session", label: "Free strategy session" },
      ...serviceGroups.map((group) => ({ id: group.id as string, label: group.tab })),
      { id: "other", label: "Something else" },
    ],
    optional: "Optional",
    submit: "Send message",
    privacyNote: "We use your details only to reply to you. See our",
    /** Shown after Send until the form is connected. */
    notConnected: "Thank you. Online sending is not switched on yet, so please email us your message at",
  },
};

/** The "page not found" (404) page. */
export const notFoundPage = {
  label: "Page not found",
  title: "This page does not exist.",
  body: "The link may be old, or the page may have moved. Everything else is still here.",
  home: "Back to home",
  linksLead: "Or go straight to",
  links: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies Link[],
};

/** The Privacy policy link: footer Company column (under Contact) and under the Contact form. */
export const privacyLink: Link = { label: "Privacy policy", href: "/privacy" };

/** Footer links to the service areas of the given tabs. */
function areaLinks(ids: ServiceGroup["id"][]): Link[] {
  return serviceGroups
    .filter((group) => ids.includes(group.id))
    .flatMap((group) => group.areas)
    .map(({ name, href }) => ({ label: name, href }));
}

export const footer = {
  tagline: positioning.tagline,
  // The service areas in three columns (AI, software, data and cloud), then the company links.
  columns: [
    { title: "AI", links: areaLinks(["ai"]) },
    { title: "Software", links: areaLinks(["software"]) },
    { title: "Data and cloud", links: areaLinks(["data", "cloud"]) },
    {
      title: "Company",
      links: [
        { label: "Work", href: "/work" },
        { label: "Insights", href: "/insights" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        privacyLink,
      ],
    },
  ] satisfies { title: string; links: Link[] }[],
};
