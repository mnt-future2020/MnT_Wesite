"use client";

import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, primaryCta } from "@/content/site";

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
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <SheetTitle className="font-heading text-lg font-medium">Menu</SheetTitle>
          <SheetClose
            aria-label="Close menu"
            className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <XIcon className="size-5" aria-hidden="true" />
          </SheetClose>
        </div>

        <nav aria-label="Main" className="px-3 py-4">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <SheetClose
                  nativeButton={false}
                  render={<Link href={item.href} />}
                  className="flex rounded-xl px-3 py-3 font-heading text-xl font-medium transition-colors hover:bg-muted"
                >
                  {item.label}
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t border-border p-5">
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
