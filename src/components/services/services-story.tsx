"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { serviceGroups, type Service, type ServiceArea, type ServiceAreaId, type ServiceGroup } from "@/content/site";
import { cn } from "@/lib/utils";
import { areaIcons } from "@/components/site/service-icons";
import { AgentVisual, AppsVisual, CloudVisual, DataVisual } from "@/components/home/service-visuals";
import {
  DesignVisual,
  ErpVisual,
  IntegrationVisual,
  SaasVisual,
  SecurityVisual,
  VoiceVisual,
} from "./area-visuals";

/*
 * Services page: every service area, one row each, in the style of the Gemini
 * site (a reference the user gave): on the left a small blue icon, a big
 * heading and one short paragraph, with the area's services as small pills
 * (hover or tap one to read its one line); on the right a large rounded panel
 * in a light-to-blue gradient with the area's product picture, shown big and
 * running off the panel's edge. Light on text, heavy on picture.
 *
 * Grouped like the homepage tabs; each group has an id (#ai, #software, ...)
 * for the hero's quick links. Each group's heading (label, name and line) sits
 * in a soft blue rounded card, so it reads clearly as the parent of the areas
 * below it (whose titles are a size smaller). On every screen that card stays
 * fixed at the top while you scroll through the group's areas, with its label,
 * name and line (smaller on phones, so the card stays compact).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const areaVisuals: Record<ServiceAreaId, React.ComponentType> = {
  "ai-automation": AgentVisual,
  "voice-ai": VoiceVisual,
  "enterprise-software": ErpVisual,
  "saas-product-engineering": SaasVisual,
  "web-mobile-apps": AppsVisual,
  "ui-ux": DesignVisual,
  "api-integration": IntegrationVisual,
  "data-bi": DataVisual,
  "cloud-devops": CloudVisual,
  cybersecurity: SecurityVisual,
};


export function ServicesStory() {
  return (
    <section aria-label="All services" data-header-theme="light" className="bg-background text-foreground">
      {/* Top padding: on phones and tablets it leaves room for the first card's solid strip (see Group);
          on desktop each group's fixed heading strip brings its own room. */}
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-20 sm:px-8 sm:pt-[5.25rem] sm:pb-28 lg:pt-4">
        {serviceGroups.map((group, index) => (
          <Group key={group.id} group={group} first={index === 0} />
        ))}
      </div>
    </section>
  );
}

function Group({ group, first }: { group: ServiceGroup; first: boolean }) {
  return (
    // A quick link jumps to the group's top. Phones and tablets: scroll-mt keeps its card clear of the floating
    // header. Desktop: the fixed heading strip makes that room itself.
    <div
      id={group.id}
      className={cn("scroll-mt-[4.5rem] sm:scroll-mt-[4.75rem] lg:scroll-mt-0", !first && "mt-28 sm:mt-36 lg:mt-24")}
    >
      {/*
        The group's heading card: its label, name and one line about it, on a soft blue card.
        It stays fixed at the top of the screen while you scroll through the group's areas, and
        the next group's card takes its place.
        Phones and tablets: it sticks just under the floating site header, and a solid strip in the
        page colour (before:) fills the space above it up to the top of the screen, so what you
        have scrolled past disappears there, as on desktop. Desktop: it sticks at the very top
        inside a strip with room for the header.
        The strip has the page colour, so the areas scroll under it; a soft fade along its bottom
        edge blends them in.
      */}
      <div className="sticky top-[4.5rem] z-20 bg-background pb-3 before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-[4.5rem] before:bg-background sm:before:h-[4.75rem] lg:before:hidden after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-linear-to-b after:from-background after:to-transparent sm:top-[4.75rem] lg:top-0 lg:pt-24 lg:pb-5 lg:after:h-8">
        <div className="relative grid gap-2.5 overflow-hidden rounded-[1.5rem] bg-linear-150 from-tint-1 via-p1-soft/55 to-p1/35 px-5 py-4 shadow-[0_18px_44px_-30px_rgb(11_16_36/0.4)] sm:rounded-[1.75rem] sm:px-7 sm:py-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-16 lg:px-10 lg:py-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-white/40 blur-3xl"
          />
          <div className="relative">
            <p className="text-xs font-medium text-brand sm:text-sm">{group.label}</p>
            <h2 className="mt-1.5 font-heading text-[clamp(1.625rem,3.8vw,3.75rem)] leading-none font-medium tracking-[-0.04em] lg:mt-2">
              {group.tab}
            </h2>
          </div>
          <p className="relative max-w-2xl text-sm leading-snug text-foreground/80 sm:text-base lg:text-xl lg:leading-[1.4]">
            {group.lead}
          </p>
        </div>
      </div>

      {/* Its areas: one row each. Desktop: the panels sit close together, one under the other. */}
      <div className="mt-12 space-y-20 sm:mt-16 lg:mt-10 lg:space-y-5">
        {group.areas.map((area) => (
          <AreaRow key={area.id} area={area} />
        ))}
      </div>
    </div>
  );
}

function AreaRow({ area }: { area: ServiceArea }) {
  const Icon = areaIcons[area.id];
  return (
    // The id is the anchor for links like /services#voice-ai (homepage "Learn more", footer).
    // scroll-mt leaves room for the floating header; on desktop also for the fixed group heading card.
    <article
      id={area.id}
      className="grid scroll-mt-[15rem] items-center gap-8 sm:scroll-mt-[16rem] lg:scroll-mt-[19rem] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
    >
      <div className="lg:py-10">
        <Icon className="size-10 text-brand" strokeWidth={1.75} aria-hidden="true" />
        <h3 className="mt-6 font-heading text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
          {area.name}
        </h3>
        <p className="mt-5 max-w-md text-lg leading-[1.4] text-foreground sm:text-xl">{area.summary}</p>
        <ServicePills services={area.services} />
      </div>
      <PicturePanel area={area} />
    </article>
  );
}

/** The area's services as small pills. Hovering, focusing or tapping one shows its one line below. */
function ServicePills({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-8 max-w-md">
      <ul className="flex flex-wrap gap-2">
        {services.map((service, index) => {
          const isActive = index === active;
          return (
            <li key={service.name}>
              <button
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  isActive
                    ? "border-brand bg-p1/[0.08] text-brand"
                    : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground"
                )}
              >
                {service.name}
              </button>
            </li>
          );
        })}
      </ul>
      {/* Room for two lines, so the text below does not jump as the line changes. */}
      <p aria-live="polite" className="mt-4 min-h-[2.8em] text-[0.9375rem] leading-[1.4] text-foreground/75">
        {services[active].line}
      </p>
    </div>
  );
}

/**
 * The picture panel: light at the top left, the logo blue at the bottom right.
 * The product picture sits big inside it and runs off the right and bottom
 * edges, like a close-up of a real screen. It rises in as it comes into view.
 */
function PicturePanel({ area }: { area: ServiceArea }) {
  const Visual = areaVisuals[area.id];
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative max-h-[26rem] overflow-hidden rounded-[1.75rem] bg-linear-150 from-tint-1 via-p1-soft via-45% to-p1 sm:h-[32rem] sm:max-h-none lg:h-[36rem] lg:rounded-[2rem]"
    >
      {/* Phones: the picture fills the width and the panel fits its height (up to 26rem): a short,
          wide picture (website + phone) gets a shorter panel instead of an empty space below it,
          and a tall one still runs off the bottom. Tablets and desktop: fixed height, and the
          picture is wider than the space left, so it also runs off the right edge (bigger on
          large screens). */}
      <div className="relative px-5 pt-6 pb-6 *:mx-0 *:max-w-none sm:absolute sm:top-10 sm:right-auto sm:left-10 sm:w-[34rem] sm:p-0 lg:top-14 lg:left-14 xl:[zoom:1.25]">
        <Visual />
      </div>
    </motion.div>
  );
}
