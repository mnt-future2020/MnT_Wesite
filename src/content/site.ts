/**
 * Shared site content for MnT Future.
 *
 * Every claim, number and quote here comes from the live mntfuture.com copy
 * (crawl of August 2026). Do not add numbers, client outcomes, prices or
 * partner tiers that are not already written here: the site's whole position
 * is that every claim on it can be shown.
 *
 * Voice: British spelling (customise, optimise, licence), short declarative
 * sentences, "you" for the reader and "we" for MnT. The method stage is
 * spelled "Optimize" on purpose.
 */

export type Link = { label: string; href: string };

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

export const nav: Link[] = [
  { label: "Ecommerce", href: "/ecommerce" },
  { label: "AI", href: "/ai" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const primaryCta: Link = {
  label: "Book a free strategy session",
  href: "/strategy-session",
};

/** Homepage hero. */
export const heroIntro = {
  lead: "Commerce platforms and AI systems",
  highlight: "your business actually runs on.",
  sub: "Built by senior engineers, owned by you, and taken all the way to production.",
  secondaryCta: { label: "See our work", href: "/work" } satisfies Link,
};

/** "What we build" section on the homepage. */
export const whatWeBuild = {
  /** The heading as it is shown: one line each. */
  titleLines: ["Three things we build.", "Nothing else."],
  menuLabels: { ecommerce: "Ecommerce", ai: "AI systems", products: "Ready apps" },
  linkLabels: {
    ecommerce: "Explore ecommerce platforms",
    ai: "Explore AI services",
    products: "Explore the three apps",
  },
} as const;

type Service = { name: string; summary: string; href: string };

export type Line = {
  id: "ecommerce" | "ai" | "products";
  name: string;
  headline: string;
  /** One line under the headline. */
  lead: string;
  href: string;
  services: Service[];
};

/** The three service lines. */
export const lines: Line[] = [
  {
    id: "ecommerce",
    name: "Ecommerce platforms",
    headline: "A store you own, not one you rent.",
    lead: "Your own platform rather than a rented one, with no percentage of every order going somewhere else.",
    href: "/ecommerce",
    services: [
      {
        name: "Platform development",
        summary:
          "A full platform built for how your business actually sells, with tax, payment gateways and courier integrations handled properly from the start.",
        href: "/ecommerce/platform-development",
      },
      {
        name: "D2C storefronts",
        summary:
          "Sell straight to your customers on a storefront you own, with your customer data, your margins and no commission on every order.",
        href: "/ecommerce/d2c-storefront",
      },
      {
        name: "Marketplace platforms",
        summary:
          "Many sellers on one platform: onboarding, catalogue control, commission, split payouts and settlement. The complicated parts, done properly.",
        href: "/ecommerce/marketplace",
      },
      {
        name: "B2B and wholesale",
        summary:
          "Customer-specific pricing, quotes and RFQ, bulk ordering, credit terms and approval flows, connected to the ERP you already run.",
        href: "/ecommerce/b2b-wholesale",
      },
      {
        name: "Integrations and automation",
        summary:
          "Your ERP, warehouse, courier, payment gateway and accounting, joined into one flow so nobody is retyping orders into a second system.",
        href: "/ecommerce/integrations",
      },
      {
        name: "Managed support",
        summary:
          "We run and maintain the platform against an SLA: monitoring, updates, security patching and a person who answers when something breaks at 9pm.",
        href: "/ecommerce/managed-support",
      },
    ],
  },
  {
    id: "ai",
    name: "AI that reaches production",
    headline: "Your AI pilot works in the demo. Ours goes live.",
    lead: "Senior engineers embedded in your team who stay until the system runs in production.",
    href: "/ai",
    services: [
      {
        name: "AI consultation",
        summary:
          "What is genuinely worth doing with AI in your business, whether your data can support it, and what reaching production would cost. Ends in a costed path, not a maturity score.",
        href: "/ai/consultation",
      },
      {
        name: "AI automation",
        summary:
          "The work your team repeats every day, automated. Document handling, data entry, classification, routing, reporting. A person stays in the loop wherever the cost of being wrong is real.",
        href: "/ai/automation",
      },
      {
        name: "AI agent development",
        summary:
          "Agents that do work inside your systems rather than just answer questions, with clear limits on what they may act on alone and a record of everything they did.",
        href: "/ai/agents",
      },
      {
        name: "Customised AI applications",
        summary:
          "A complete application built for your business with AI inside it, from nothing. For when the shape of your problem means no ready product fits.",
        href: "/ai/custom-applications",
      },
    ],
  },
  {
    id: "products",
    name: "Applications ready to brand",
    headline: "Software that already works, made yours.",
    lead: "Three applications we host, brand and customise for you. Weeks, not a year.",
    href: "/products",
    services: [
      {
        name: "MnT AI Desk",
        summary:
          "Every customer message in one inbox, with AI answering the repeats. WhatsApp, Instagram, Facebook, email and website chat on one screen.",
        href: "/products/ai-desk",
      },
      {
        name: "MnT AI CRM",
        summary:
          "Your whole WhatsApp business on one screen: one official number for many agents, a visible sales pipeline and safe broadcasts.",
        href: "/products/ai-crm",
      },
      {
        name: "MnT Commerce India",
        summary:
          "Your own store, with GST done properly. Gapless invoice serials, automatic credit notes and tax decided per order.",
        href: "/products/commerce-india",
      },
    ],
  },
];

/**
 * Homepage "Why MnT Future": a bento grid that a switch flips between the
 * usual agency and MnT. The MnT side is the site's "Why MnT Future" reasons
 * in short form; the usual side is simply their opposite, as the original copy
 * draws it ("no juniors", "no per-seat licence, no commission", "rather than
 * billing hours", "nothing that stops working the day our contract ends").
 * The method reason is left out because "How we work" shows it.
 */
export const whyMnt = {
  label: "Why MnT Future",
  titleLines: ["Not the usual", "agency."],
  body: "Flip the switch to see the difference.",
  options: { usual: "The usual agency", mnt: "MnT Future" },
  team: {
    label: "Who builds it",
    usual: "Juniors learn on your project.",
    mnt: "Senior engineers only.",
    badge: { usual: "Mostly junior", mnt: "All senior" },
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
  body: "Judge our engineering on what we ship, not on a logo wall.",
  cta: { label: "See all our work", href: "/work" } satisfies Link,
  yoursTitle: "Your platform could be next.",
  yoursBody: "Bring your bottleneck. Leave with a plan you can execute.",
} as const;

/** Homepage closing banner (the strategy session in short). */
export const closingCta = {
  label: "Strategy session",
  titleLines: ["Bring your bottleneck.", "Leave with a plan you can execute."],
  body: "45 minutes with a senior consultant. You keep the written plan, whether or not you build it with us.",
  emailLead: "Or email us at",
};

/**
 * Homepage FAQ ("Straight answers"): six questions in a normal FAQ list.
 * Questions and answers are the site's own "we will tell you no" lines and FAQs, word for word.
 */
export const straightAnswers = {
  label: "Frequently asked questions",
  titleLines: ["Straight answers.", "Even when it is no."],
  moreLead: "Have another question? Email us at",
  items: [
    {
      question: "Should we move off Shopify?",
      answer:
        "Not always. At modest volume Shopify is genuinely the right answer and we will say so rather than sell you a build.",
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
        "A focused D2C storefront takes 8 to 16 weeks. A discovery sprint for AI work takes 1 to 2 weeks, and a first useful deployment follows 6 to 12 weeks after it. Anyone promising you production AI in two weeks is describing a demo.",
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

export const footer = {
  tagline:
    "We build the commerce platforms and AI systems businesses actually run on.",
  columns: [
    { title: "Ecommerce", links: lines[0].services.map(({ name, href }) => ({ label: name, href })) },
    { title: "AI", links: lines[1].services.map(({ name, href }) => ({ label: name, href })) },
    { title: "Products", links: lines[2].services.map(({ name, href }) => ({ label: name, href })) },
    {
      title: "Company",
      links: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Strategy session", href: "/strategy-session" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ] satisfies { title: string; links: Link[] }[],
};
