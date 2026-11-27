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
 * for the hero's quick links. On desktop, each group's heading block (label,
 * name and line) stays fixed at the top while you scroll through its areas.
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
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:pt-4">
        {serviceGroups.map((group, index) => (
          <Group key={group.id} group={group} first={index === 0} />
        ))}
      </div>
    </section>
  );
}

function Group({ group, first }: { group: ServiceGroup; first: boolean }) {
  return (
    // Phones and tablets: scroll-mt keeps the group's heading clear of the floating header when a
    // quick link jumps here. Desktop: the heading block makes that room itself (see below).
    <div id={group.id} className={cn("scroll-mt-28 lg:scroll-mt-0", !first && "mt-28 sm:mt-36 lg:mt-24")}>
      {/*
        The group: its label and name, and one line about it.
        Desktop: this block stays fixed at the top of the screen while you scroll through the
        group's areas, and the next group's block takes its place. It starts at the very top of
        the screen (with room for the floating site header) and has the page colour, so the
        areas scroll under it; a soft fade along its bottom edge blends them in.
      */}
      <div className="grid gap-5 lg:sticky lg:top-0 lg:z-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-16 lg:bg-background lg:pt-24 lg:pb-6 lg:after:pointer-events-none lg:after:absolute lg:after:inset-x-0 lg:after:top-full lg:after:h-8 lg:after:bg-linear-to-b lg:after:from-background lg:after:to-transparent">
        <div>
          <p className="text-sm font-medium text-brand">{group.label}</p>
          <h2 className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]">
            {group.tab}
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-[1.4] text-foreground sm:text-xl">{group.lead}</p>
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
    // scroll-mt leaves room for the floating header; on desktop also for the fixed group heading.
    <article
      id={area.id}
      className="grid scroll-mt-28 items-center gap-8 lg:scroll-mt-64 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
    >
      <div className="lg:py-10">
        <Icon className="size-10 text-brand" strokeWidth={1.75} aria-hidden="true" />
        <h3 className="mt-6 font-heading text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-medium tracking-[-0.035em] text-balance">
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
      className="relative h-[26rem] overflow-hidden rounded-[1.75rem] bg-linear-150 from-tint-1 via-p1-soft via-45% to-p1 sm:h-[32rem] lg:h-[36rem] lg:rounded-[2rem]"
    >
      {/* Phones: the picture fills the width and only its bottom runs off. Tablets and desktop: it is
          wider than the space left, so it also runs off the right edge (bigger on large screens). */}
      <div className="absolute top-6 right-5 left-5 *:mx-0 *:max-w-none sm:top-10 sm:right-auto sm:left-10 sm:w-[34rem] lg:top-14 lg:left-14 xl:[zoom:1.25]">
        <Visual />
      </div>
    </motion.div>
  );
}
