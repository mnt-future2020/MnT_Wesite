"use client";

import Link from "next/link";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, primaryCta, serviceGroups } from "@/content/site";

/*
 * Phones and tablets: the menu slides in from the right. Same structure as the
 * desktop navbar: Services (the four groups, each jumping to its part of the
 * Services page), Work, and Company (About us, Ways to work with us, Contact),
 * with the booking button at the bottom.
 */

const sectionLabel = "px-3 text-xs font-medium text-brand";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
      >
        <MenuIcon className="size-5" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[86%] gap-0 border-border bg-background/95 font-sans backdrop-blur-xl sm:max-w-sm"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <SheetTitle className="font-heading text-lg font-medium">Menu</SheetTitle>
          <SheetClose
            aria-label="Close menu"
            className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <XIcon className="size-5" aria-hidden="true" />
          </SheetClose>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-5">
          {/* Services: the four groups. */}
          <p className={sectionLabel}>{nav.services.label}</p>
          <ul className="mt-1.5 grid gap-0.5">
            {serviceGroups.map((group) => (
              <li key={group.id}>
                <SheetClose
                  nativeButton={false}
                  render={<Link href={`${nav.services.href}#${group.id}`} />}
                  className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                >
                  <span className="block font-heading text-lg leading-tight font-medium">{group.tab}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{group.short}</span>
                </SheetClose>
              </li>
            ))}
            <li>
              <SheetClose
                nativeButton={false}
                render={<Link href={nav.services.href} />}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                {nav.services.allLabel}
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </SheetClose>
            </li>
          </ul>

          {/* Work. */}
          <div className="mt-4 border-t border-border pt-4">
            <SheetClose
              nativeButton={false}
              render={<Link href={nav.work.href} />}
              className="flex rounded-xl px-3 py-2.5 font-heading text-lg font-medium transition-colors hover:bg-muted"
            >
              {nav.work.label}
            </SheetClose>
          </div>

          {/* Company. */}
          <div className="mt-4 border-t border-border pt-4">
            <p className={sectionLabel}>{nav.company.label}</p>
            <ul className="mt-1.5 grid gap-0.5">
              {nav.company.items.map((item) => (
                <li key={item.href}>
                  <SheetClose
                    nativeButton={false}
                    render={<Link href={item.href} />}
                    className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                  >
                    <span className="block font-heading text-lg leading-tight font-medium">{item.label}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{item.note}</span>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="shrink-0 border-t border-border p-5">
          <SheetClose
            nativeButton={false}
            render={<Link href={primaryCta.href} />}
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary px-5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {primaryCta.label}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
