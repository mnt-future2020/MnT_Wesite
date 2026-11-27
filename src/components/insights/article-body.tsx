import Link from "next/link";
import { Fragment } from "react";

/*
 * Shows an article's text (`body` in src/content/insights). It understands a
 * small, simple set of writing marks, enough for an article:
 *   ## Heading   ### Smaller heading   - bullet   1. numbered   > highlighted line
 *   **bold**   [link text](/address)
 * Blocks are separated by an empty line. Everything is turned into normal page
 * elements (no raw HTML), so the text cannot break the page.
 */

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] };

function parse(body: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of body.trim().split(/\n\s*\n/)) {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;
    const [first, ...rest] = lines;

    if (first.startsWith("### ") || first.startsWith("## ")) {
      const level = first.startsWith("### ") ? "h3" : "h2";
      blocks.push({ type: level, text: first.replace(/^#{2,3} /, "") });
      // Text written straight under a heading, without an empty line, is its own paragraph.
      if (rest.length) blocks.push({ type: "p", text: rest.join(" ") });
    } else if (lines.every((line) => /^[-*] /.test(line))) {
      blocks.push({ type: "ul", items: lines.map((line) => line.slice(2)) });
    } else if (lines.every((line) => /^\d+\. /.test(line))) {
      blocks.push({ type: "ol", items: lines.map((line) => line.replace(/^\d+\. /, "")) });
    } else if (lines.every((line) => line.startsWith(">"))) {
      blocks.push({ type: "quote", text: lines.map((line) => line.replace(/^>\s?/, "")).join(" ") });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

/** Bold words and links inside a line. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const className =
            "font-medium text-brand underline decoration-p1/35 underline-offset-4 transition-colors hover:decoration-p1";
          if (href.startsWith("/")) {
            return (
              <Link key={index} href={href} className={className}>
                {label}
              </Link>
            );
          }
          // Email and phone links open the visitor's app, not a new tab.
          if (href.startsWith("mailto:") || href.startsWith("tel:")) {
            return (
              <a key={index} href={href} className={className}>
                {label}
              </a>
            );
          }
          return (
            <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={className}>
              {label}
            </a>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="text-lg leading-[1.7] text-foreground/80">
      {parse(body).map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="mt-14 font-heading text-[1.75rem] leading-tight font-medium tracking-[-0.025em] text-foreground first:mt-0 sm:text-[2rem]"
              >
                <Inline text={block.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="mt-10 font-heading text-xl leading-snug font-medium text-foreground">
                <Inline text={block.text} />
              </h3>
            );
          case "p":
            return (
              <p key={index} className="mt-5 first:mt-0">
                <Inline text={block.text} />
              </p>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-10 border-l-[3px] border-p1 pl-6 font-heading text-[1.375rem] leading-snug font-medium tracking-[-0.02em] text-foreground sm:text-2xl"
              >
                <Inline text={block.text} />
              </blockquote>
            );
          case "ul":
            return (
              <ul key={index} className="mt-5 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-p1" />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="mt-6 space-y-4">
                {block.items.map((item, number) => (
                  <li key={item} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-tint-1 text-sm font-medium text-brand"
                    >
                      {number + 1}
                    </span>
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
        }
      })}
    </div>
  );
}
