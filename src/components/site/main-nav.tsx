"use client";

import Link from "next/link";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { nav, primaryCta, serviceGroups, type ServiceArea } from "@/content/site";
import { cn } from "@/lib/utils";
import { areaIcons } from "./service-icons";

/*
 * The desktop navbar: Services ▾ · Work · Company ▾.
 * Services opens a wide panel with every service area, grouped like the Services
 * page (AI and Data & integration, Software & apps, Cloud & security), each with
 * its icon and a few words, plus a card for the free strategy session.
 * Company opens a small panel (About us, Ways to work with us, Contact).
 * Opens on hover or click, works with the keyboard; the panel slides and resizes
 * smoothly between the two menus.
 */

const topItem =
  "flex items-center gap-1 rounded-full px-3.5 py-2 text-base text-foreground transition-colors outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring data-[popup-open]:bg-muted dark:text-white dark:hover:bg-white/10 dark:data-[popup-open]:bg-white/10";

/** The Services panel's three columns: which groups go in each. */
const serviceColumns = [["ai", "data"], ["software"], ["cloud"]] as const;

export function MainNav() {
  return (
    <NavigationMenu.Root aria-label="Main" className="hidden lg:block">
      <NavigationMenu.List className="flex items-center gap-1">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={topItem}>
            {nav.services.label}
            <NavigationMenu.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180">
              <ChevronDownIcon className="size-4 opacity-60" aria-hidden="true" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={contentClass}>
            <ServicesPanel />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link render={<Link href={nav.work.href} />} className={topItem}>
            {nav.work.label}
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={topItem}>
            {nav.company.label}
            <NavigationMenu.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180">
              <ChevronDownIcon className="size-4 opacity-60" aria-hidden="true" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={contentClass}>
            <CompanyPanel />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        {/* The panel hangs a little below the floating header. The invisible strip above it
            (before:) bridges the gap, so moving the mouse down into the panel keeps it open. */}
        <NavigationMenu.Positioner
          sideOffset={14}
          collisionPadding={16}
          className="z-[60] transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:inset-x-0 before:-top-4 before:h-4 data-[instant]:transition-none"
        >
          <NavigationMenu.Popup className="relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden rounded-3xl border border-border bg-background/95 text-foreground shadow-[0_28px_70px_-24px_rgb(11_16_36/0.35)] backdrop-blur-xl transition-[opacity,scale,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <NavigationMenu.Viewport className="relative size-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

/** Each panel's content: fades and slides in from the side it was reached from. */
const contentClass =
  "w-max transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[starting-style]:data-[activation-direction=left]:-translate-x-1/4 data-[starting-style]:data-[activation-direction=right]:translate-x-1/4 data-[ending-style]:data-[activation-direction=left]:translate-x-1/4 data-[ending-style]:data-[activation-direction=right]:-translate-x-1/4";

function ServicesPanel() {
  return (
    <div className="w-[58rem] p-3">
      <div className="grid grid-cols-3 gap-2">
        {serviceColumns.map((ids, column) => (
          <div key={column} className="grid content-start gap-4 p-2">
            {ids.map((id) => {
              const group = serviceGroups.find((item) => item.id === id);
              if (!group) return null;
              return (
                <div key={group.id}>
                  <p className="px-3 text-xs font-medium text-brand">{group.tab}</p>
                  <ul className="mt-1.5 grid gap-0.5">
                    {group.areas.map((area) => (
                      <li key={area.id}>
                        <AreaLink area={area} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {/* The last column ends with the strategy session card. */}
            {column === serviceColumns.length - 1 ? <SessionCard /> : null}
          </div>
        ))}
      </div>

      {/* Along the bottom: the whole Services page. */}
      <div className="mt-1 flex items-center justify-between rounded-2xl bg-muted/60 px-5 py-3">
        <p className="text-sm text-muted-foreground">Enterprise AI, custom software, data, cloud and security.</p>
        <NavigationMenu.Link
          closeOnClick
          render={<Link href={nav.services.href} />}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          {nav.services.allLabel}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </NavigationMenu.Link>
      </div>
    </div>
  );
}

function AreaLink({ area }: { area: ServiceArea }) {
  const Icon = areaIcons[area.id];
  return (
    <NavigationMenu.Link
      closeOnClick
      render={<Link href={area.href} />}
      className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-p1/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm leading-snug font-medium">{area.name}</span>
        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{area.short}</span>
      </span>
    </NavigationMenu.Link>
  );
}

/** The free strategy session, as a small blue card in the Services panel. */
function SessionCard() {
  return (
    <NavigationMenu.Link
      closeOnClick
      render={<Link href={primaryCta.href} />}
      className="group mt-2 block overflow-hidden rounded-2xl bg-linear-150 from-p1 to-p2 p-5 text-white shadow-[0_16px_40px_-20px_rgb(15_45_100/0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="block font-heading text-lg leading-tight font-medium">{nav.sessionCard.title}</span>
      <span className="mt-1.5 block text-sm leading-snug text-white/80">{nav.sessionCard.text}</span>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
        Book a session
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </NavigationMenu.Link>
  );
}

function CompanyPanel() {
  return (
    <ul className="grid w-[22rem] gap-0.5 p-3">
      {nav.company.items.map((item) => (
        <li key={item.href}>
          <NavigationMenu.Link
            closeOnClick
            render={<Link href={item.href} />}
            className={cn(
              "group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            )}
          >
            <span>
              <span className="block text-sm font-medium">{item.label}</span>
              <span className="mt-0.5 block text-[0.8125rem] text-muted-foreground">{item.note}</span>
            </span>
            <ArrowRightIcon
              className="size-4 shrink-0 text-muted-foreground opacity-0 transition-[opacity,translate] group-hover:translate-x-0.5 group-hover:opacity-100"
              aria-hidden="true"
            />
          </NavigationMenu.Link>
        </li>
      ))}
    </ul>
  );
}
