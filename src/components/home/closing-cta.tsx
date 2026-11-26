import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { closingCta, company, primaryCta } from "@/content/site";

/*
 * The closing banner. Unlike the other sections it is NOT a full-width card:
 * it is a smaller near-black box with the page background around it.
 * Inside: a large heading, one line, one white button, and the email
 * address as a quieter second option. No animation, so no client code.
 */
export function ClosingCta() {
  return (
    <section id="book" aria-labelledby="book-title" data-header-theme="light" className="relative py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#0a0b10] px-6 py-16 text-center text-white sm:rounded-[2.5rem] sm:px-12 sm:py-20 lg:py-24">
          {/* Background, kept very faint: a fine grid that fades out from the middle,
              a large ring, and one soft blue glow at the bottom so the black is not flat. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-size-[56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-176 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-56 left-1/2 -z-10 h-96 w-3/4 -translate-x-1/2 rounded-full bg-p1/25 blur-3xl"
          />

          <p className="text-base font-medium text-white/60">{closingCta.label}</p>
          <h2
            id="book-title"
            className="mx-auto mt-4 font-heading text-[clamp(2.25rem,4.4vw,4rem)] leading-none font-medium tracking-[-0.04em]"
          >
            {/* One clean line each on desktop; balanced wrapping on phones. */}
            {closingCta.titleLines.map((line) => (
              <span key={line} className="block text-balance lg:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.4] text-white sm:text-xl">{closingCta.body}</p>

          <div className="mt-10 flex flex-col items-center gap-5">
            <Link
              href={primaryCta.href}
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-base font-medium text-ink shadow-[0_18px_40px_-16px_rgb(11_16_36/0.55)] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {primaryCta.label}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <p className="text-sm text-white/60">
              {closingCta.emailLead}{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {company.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
