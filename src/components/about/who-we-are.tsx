import { Logo } from "@/components/brand/logo";
import { aboutPage } from "@/content/site";

/*
 * About page: "Who we are". Light section. Left: one big statement, with its
 * key words in the blue gradient, and a short paragraph under it. Right: a
 * "company profile" card, like an official record: a soft blue band with the
 * logo, then the details in labelled rows.
 * Phones and tablets: the card goes under the statement.
 */

export function WhoWeAre() {
  const { story } = aboutPage;
  return (
    <section aria-labelledby="who-title" data-header-theme="light" className="bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
        <div>
          <p className="text-sm font-medium text-brand">{story.label}</p>
          <h2
            id="who-title"
            className="mt-4 font-heading text-[clamp(2.125rem,3.7vw,3.625rem)] leading-[1.06] font-medium tracking-[-0.035em] text-balance"
          >
            {story.statement.map((piece) =>
              piece.accent ? (
                <span key={piece.text} className="bg-linear-to-r from-p1 to-p2 bg-clip-text text-transparent">
                  {piece.text}
                </span>
              ) : (
                <span key={piece.text}>{piece.text}</span>
              )
            )}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-[1.45] text-muted-foreground sm:text-xl">{story.body}</p>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_30px_70px_-40px_rgb(11_16_36/0.35)]">
          <div className="flex items-center justify-between gap-4 bg-linear-150 from-tint-1 via-p1-soft/70 to-p1/45 px-6 py-7 sm:px-8">
            <Logo tone="light" className="h-7 sm:h-8" />
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-foreground/70 backdrop-blur-sm">
              {story.card.label}
            </span>
          </div>
          <dl>
            {story.card.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-t border-border px-6 py-4 first:border-t-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5 sm:px-8 sm:py-5"
              >
                <dt className="text-sm text-muted-foreground sm:pt-0.5">{row.label}</dt>
                <dd className="leading-snug font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
