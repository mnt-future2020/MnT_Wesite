import { ourWork, straightAnswers } from "@/content/site";

/*
 * Ask MnT: the website assistant.
 *
 * THIS IS THE DEMO VERSION. There is no AI behind it yet: the answers below are
 * ready-made, so the senior can see and click through the idea before anything
 * is paid for. Every answer is taken from the site's own copy (src/content/site.ts).
 *
 * To switch it off: set `enabled` to false below.
 * To remove it completely: delete this folder (src/components/ask-mnt) and the two
 * lines marked "Ask MnT" in src/components/site/site-shell.tsx and
 * src/components/site/site-header.tsx.
 */

type Switch = "enabled" | "demo" | "nudges" | "logoDots";

/** Each part can be turned off on its own. */
export const askMntSwitches: Record<Switch, boolean> = {
  /** The whole feature: header button, panel and nudges. */
  enabled: true,
  /** Shows the "Demo" label in the panel. */
  demo: true,
  /** Small pop-ups beside "Our work" and the FAQ, once per page load. */
  nudges: true,
  /** While it "thinks", the blue dots from the logo pulse (off: the word "Thinking…"). */
  logoDots: true,
};

export type AnswerSource = { label: string; href: string };

export type DemoAnswer = {
  question: string;
  /** Typed questions containing one of these words get this answer. */
  keywords: string[];
  answer: string;
  source: AnswerSource;
};

const faqAnswer = (question: string) =>
  straightAnswers.items.find((item) => item.question === question)?.answer ?? "";

const fromFaq: AnswerSource = { label: "FAQ", href: "/#straight-answers" };
const fromOurWork: AnswerSource = { label: "Our work", href: "/#our-work" };

/** The ready-made answers. The first three are the suggested questions. */
export const demoAnswers: DemoAnswer[] = [
  {
    question: "How long does a build take?",
    keywords: ["how long", "how much time", "timeline", "weeks"],
    answer: faqAnswer("How long does a build take?"),
    source: fromFaq,
  },
  {
    question: "Can you work with our current systems?",
    keywords: ["system", "erp", "crm", "existing", "integrat"],
    answer: faqAnswer("Can you work with the systems we already have?"),
    source: fromFaq,
  },
  {
    question: "Do you build WhatsApp ordering?",
    keywords: ["whatsapp"],
    answer:
      "Yes. We build WhatsApp automation that handles orders, enquiries and updates, and we connect WhatsApp, calls and SMS to your CRM and support tools. One of our projects is a bakery whose custom cakes, waffles and brownies are ordered on WhatsApp.",
    source: fromOurWork,
  },
  {
    // Asked for the visitor when they click the "Our work" nudge.
    question: "Can you build something like this for us?",
    keywords: ["like this", "similar"],
    answer: `${ourWork.yoursTitle} ${ourWork.yoursBody}`,
    source: fromOurWork,
  },
];

export const suggestedQuestions = demoAnswers.slice(0, 3).map((item) => item.question);

/** Every word the assistant shows. */
export const askMntText = {
  name: "Ask MnT",
  shortName: "Ask",
  subtitle: "Answers from our own pages",
  demoBadge: "Demo",
  greeting: "Ask anything about MnT Future. A real person from our team reads every enquiry.",
  placeholder: "Type your question…",
  footnote: "AI answers can be wrong. Our team checks every enquiry.",
  followUp: "What are you planning to build? Tell me in a line and I will pass it to our team.",
  demoFallback:
    "This is a demo, so I cannot answer that yet. Once it is approved, the real assistant will answer here.",
  understoodIntro:
    "Thank you. Here is what I understood. Change anything that is wrong, and tell us how to reach you.",
  understoodTitle: "What we understood",
  needLabel: "What you need",
  nameLabel: "Your name",
  contactLabel: "Email or WhatsApp number",
  sendLabel: "Send to our team",
  missingDetails: "Please add your name and how we can reach you.",
  sentLabel: "Sent to our team",
  sentReply: "Thank you. Someone from our team will reply to you personally.",
  demoSentNote: "Demo: nothing was actually sent.",
  nudgeAction: "Ask MnT",
  nudgeDismiss: "Dismiss",
};

/** The nudges: which section they appear beside, and what clicking them asks. */
export type Nudge = { id: string; sectionId: string; text: string; question?: string };

export const askMntNudges: Nudge[] = [
  {
    id: "our-work",
    sectionId: "our-work",
    text: "Want something like this?",
    question: "Can you build something like this for us?",
  },
  { id: "faq", sectionId: "straight-answers", text: "Still have a question?" },
];
