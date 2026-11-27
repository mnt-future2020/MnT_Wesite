import { company } from "./site";

/*
 * Privacy policy page (/privacy). A DRAFT in plain words, written for the site
 * as it is today: the Contact form, emails, and the basic technical records any
 * website host keeps. No advertising or tracking cookies are used.
 *
 * BEFORE GOING LIVE: the senior (and ideally a lawyer) should check it, and it
 * must be updated if anything changes, for example when the Contact form is
 * connected to an email service or visitor analytics are added.
 *
 * The text uses the same simple writing marks as the Insights articles
 * (## heading, - bullet, **bold**, [link](/address)).
 */
export const privacyPage = {
  title: "Privacy policy.",
  intro: "How we collect, use and protect your information, in plain words.",
  /** Change this whenever the policy changes. */
  updated: "2026-11-27",
  updatedLabel: "Last updated",
  body: `
This policy explains what information ${company.name} collects when you use this website or contact us, why we collect it, and the choices you have. ${company.name} is a brand of ${company.legalName}, based in ${company.base}. In this policy, "we", "us" and "our" mean ${company.legalName}.

## What information we collect

**Information you give us.** When you fill in our contact form or email us, we receive the details you choose to share: your name, company, email address, phone number, the topics you are interested in and your message.

**Information collected automatically.** Like most websites, the service that hosts this site keeps basic technical records when you visit: your IP address, browser type, the pages you open and the time of your visit. These records are used to keep the site running and secure.

We do not ask for sensitive information such as financial, health or identity documents through this website. Please do not send it in the contact form.

## How we use your information

- To reply to your message and answer your questions
- To arrange and hold a strategy session you have asked for
- To prepare proposals and provide our services, if you choose to work with us
- To keep this website secure and working properly
- To meet our legal obligations

We do not sell, rent or trade your personal information, and we do not use it to send you marketing you have not asked for.

## Who we share it with

We share your information only when needed:

- With service providers who help us run this website and our communication, such as website hosting and email services. They may use your information only to provide their service to us.
- When the law requires it, or to protect our rights, our clients or the public.

## Cookies

This website does not use advertising or tracking cookies. Only what is strictly needed for the site to work may be stored in your browser. If we add visitor analytics in the future, we will update this policy first.

## How long we keep it

We keep your information only for as long as we need it for the reasons above, for example while we are talking with you or working together, and for as long as the law requires us to keep business records. After that, we delete it or make it anonymous.

## How we protect it

We use reasonable technical and organisational measures to protect your information from loss, misuse and unauthorised access. No method of sending or storing data online is completely secure, but we work to keep your information safe.

## Your rights

Under India's Digital Personal Data Protection Act, 2023 and other laws that apply, you can ask us to:

- Tell you what personal information we hold about you
- Correct information that is wrong or incomplete
- Delete your information, unless we must keep it by law
- Stop using your information, where you had given us your consent

To make a request or raise a concern, email us at [${company.email}](mailto:${company.email}). We will reply as soon as we can.

## Links to other websites

This website links to other websites, such as our clients' websites and our social media pages. We are not responsible for how those websites handle your information. Please read their privacy policies.

## Changes to this policy

We may update this policy from time to time. The date at the top of this page shows when it was last changed.

## Contact us

If you have any questions about this policy or your information, email us at [${company.email}](mailto:${company.email}).

${company.legalName}, ${company.base}.
`,
};
