import { Suspense, type CSSProperties } from "react";
import { MailIcon, MapPinIcon } from "lucide-react";
import { laptopGlowA, laptopGlowB } from "@/components/site/hero-glow";
import { LinkedInMark } from "@/components/site/linkedin-mark";
import { WhatsAppMark } from "@/components/site/whatsapp-mark";
import { contactPage } from "@/content/site";
import { ContactForm, ContactFormFromAddress } from "./contact-form";

/*
 * The whole Contact page, in one screen: light, with the same soft corner glows
 * and dots as the other page heroes. Left: the heading, one line, and how to
 * reach us (email, WhatsApp once its number is set, office, LinkedIn). Right: the form card.
 * Phones and tablets: the form goes under the details.
 */

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const icons = {
  email: <MailIcon className="size-[1.125rem]" aria-hidden="true" />,
  whatsapp: <WhatsAppMark className="size-[1.125rem]" />,
  office: <MapPinIcon className="size-[1.125rem]" aria-hidden="true" />,
  linkedin: <LinkedInMark className="size-4" />,
};

export function ContactSection() {
  const { hero, details } = contactPage;
  return (
    <section
      aria-labelledby="contact-title"
      data-header-theme="light"
      className="relative isolate overflow-hidden rounded-b-[1.75rem] bg-background text-foreground sm:rounded-b-[2.5rem]"
    >
      <div aria-hidden="true" className="hero-anim pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className={`hero-blob hero-blob-a ${laptopGlowA}`} />
        <div className={`hero-blob hero-blob-b ${laptopGlowB}`} />
        <div className="hero-dots" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-28 pb-16 sm:px-8 sm:pt-40 sm:pb-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div>
          <h1
            id="contact-title"
            className="hero-rise font-heading text-[clamp(2.75rem,4.6vw,4.25rem)] leading-none font-medium tracking-[-0.04em]"
            style={delay(0)}
          >
            {hero.titleLines.map((line) => (
              <span key={line} className="block sm:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-rise mt-7 max-w-md text-lg leading-[1.4] sm:text-xl" style={delay(200)}>
            {hero.body}
          </p>

          <dl className="hero-rise mt-10 grid gap-5 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-1" style={delay(320)}>
            {details.map((detail) => (
              <div key={detail.id} className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card text-brand shadow-sm">
                  {icons[detail.id as keyof typeof icons]}
                </span>
                <div className="min-w-0">
                  <dt className="text-sm text-muted-foreground">{detail.label}</dt>
                  <dd className="mt-0.5 font-medium">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        {...(detail.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="underline decoration-foreground/20 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-rise" style={delay(260)}>
          {/* The form shows at once; reading ?topic= from the address fills in the picked topic. */}
          <Suspense fallback={<ContactForm />}>
            <ContactFormFromAddress />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
