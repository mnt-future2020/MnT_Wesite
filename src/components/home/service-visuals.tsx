import {
  BatteryFullIcon,
  BellIcon,
  CheckCircle2Icon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  HouseIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LockIcon,
  MegaphoneIcon,
  PackageIcon,
  PanelLeftIcon,
  PlusIcon,
  ReceiptTextIcon,
  RotateCwIcon,
  ScanLineIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  ShieldIcon,
  SignalIcon,
  StarIcon,
  TrendingUpIcon,
  UserPlusIcon,
  UsersIcon,
  WifiIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Product-style pictures for the "What we build" panels.
 * They are drawn with plain HTML so they stay sharp and load instantly,
 * and they use theme colours so they work on light or dark sections.
 * Names and amounts inside them are illustrative UI, not client data.
 */

/**
 * A Mac window. With `url` it is a Safari browser window (toolbar and a centred
 * address bar); with `title` it is an app window (just the title in the middle).
 * Both have the red, yellow and green window buttons.
 */
function Window({
  className,
  children,
  ...bar
}: { className?: string; children: React.ReactNode } & ({ url: string } | { title: string })) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(11_16_36/0.35)]",
        className
      )}
    >
      {"url" in bar ? <BrowserBar url={bar.url} /> : <AppBar title={bar.title} />}
      {children}
    </div>
  );
}

/** The window buttons: close, minimise, zoom. */
function WindowButtons() {
  return (
    <div className="flex shrink-0 gap-1.5">
      <span className="size-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10 ring-inset" />
      <span className="size-2.5 rounded-full bg-[#febc2e] ring-1 ring-black/10 ring-inset" />
      <span className="size-2.5 rounded-full bg-[#28c840] ring-1 ring-black/10 ring-inset" />
    </div>
  );
}

/** An app's title bar: window buttons on the left, the app's name in the middle. */
function AppBar({ title }: { title: string }) {
  return (
    <div className="relative flex h-11 items-center border-b border-border bg-foreground/[0.03] px-3.5">
      <WindowButtons />
      <p className="pointer-events-none absolute inset-x-0 text-center text-xs font-medium text-foreground/70">{title}</p>
    </div>
  );
}

/**
 * Safari's toolbar. Phones show only the window buttons and the address,
 * as the window is too narrow for the rest.
 */
function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-foreground/[0.03] px-3.5 py-2.5 text-foreground/40">
      <WindowButtons />

      {/* Sidebar, back and forward. */}
      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        <PanelLeftIcon className="size-3.5" />
        <span className="flex items-center">
          <ChevronLeftIcon className="size-4" />
          <ChevronRightIcon className="size-4 opacity-50" />
        </span>
      </div>

      {/* Privacy shield, then the address bar with the page's address in the middle. */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <ShieldIcon className="hidden size-3.5 shrink-0 sm:block" />
        <div className="relative flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md bg-foreground/[0.06] px-2 py-1 text-xs text-muted-foreground sm:px-6">
          <LockIcon className="size-3 shrink-0" />
          <span className="truncate">{url}</span>
          <RotateCwIcon className="absolute right-2 hidden size-3 sm:block" />
        </div>
      </div>

      {/* Share, new tab and all tabs. */}
      <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
        <ShareIcon className="size-3.5" />
        <PlusIcon className="size-3.5" />
        <CopyIcon className="size-3.5" />
      </div>
    </div>
  );
}

const products = [
  { name: "Handloom saree", price: "₹2,450", tone: "from-wash-1/45 to-wash-2/20" },
  { name: "Cotton kurta", price: "₹1,299", tone: "from-wash-3/40 to-wash-1/15" },
  { name: "Silk dupatta", price: "₹899", tone: "from-wash-2/40 to-wash-3/15" },
];

export function StoreVisual() {
  return (
    <Window url="yourbrand.com" className="mx-auto max-w-lg">
      <div className="grid gap-4 p-5">
        <div className="flex items-end justify-between rounded-xl bg-linear-to-br from-wash-1/25 via-wash-2/15 to-transparent p-5">
          <div>
            <p className="text-xs text-muted-foreground">New season</p>
            <p className="font-heading text-xl font-semibold">The handloom edit</p>
          </div>
          <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
            Shop now
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {products.map((product) => (
            <div key={product.name} className="rounded-xl border border-border bg-foreground/[0.03] p-2.5">
              <div className={cn("aspect-[4/5] rounded-lg bg-linear-to-br", product.tone)} />
              <p className="mt-2 truncate text-xs font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.price}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-xs">
          <span className="flex items-center gap-2">
            <CheckCircle2Icon className="size-4 text-live" aria-hidden="true" />
            Order #1042 paid via UPI
          </span>
          <span className="text-muted-foreground">GST invoice sent</span>
        </div>
      </div>
    </Window>
  );
}

const agentSteps = [
  { label: "Looked up order #1042", note: "read only" },
  { label: "Checked the courier status", note: "read only" },
  { label: "Replied using your shipping policy", note: "logged" },
];

/** The agent's inbox: customers writing in from different channels. The first one is open. */
const conversations = [
  { name: "Priya S.", channel: "WhatsApp" },
  { name: "Arun K.", channel: "Instagram" },
  { name: "Meena R.", channel: "Email" },
];

/**
 * AI systems: a support agent app (a Mac app window, not a browser). A narrow
 * inbox on the left; on the right, the open conversation and what the agent did
 * to answer it. Phones hide the inbox, as the window is too narrow for it.
 */
export function AgentVisual() {
  const [open] = conversations;
  return (
    <Window title="Support agent" className="mx-auto max-w-lg">
      <div className="grid sm:grid-cols-[7.5rem_1fr]">
        <div className="hidden flex-col border-r border-border bg-foreground/[0.025] p-2.5 sm:flex">
          <p className="flex items-center justify-between px-1.5 text-[0.6875rem] font-medium text-muted-foreground">
            Inbox
            <span className="rounded-full bg-foreground/[0.07] px-1.5 tabular-nums">{conversations.length}</span>
          </p>
          <ul className="mt-2 grid gap-1">
            {conversations.map((person) => {
              const isOpen = person === open;
              return (
                <li
                  key={person.name}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-1.5 py-1.5",
                    isOpen && "bg-card shadow-sm ring-1 ring-border"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full text-[0.625rem] font-semibold",
                      isOpen ? "bg-p1 text-white" : "bg-foreground/10 text-foreground/60"
                    )}
                  >
                    {person.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium">{person.name}</span>
                    <span className="block truncate text-[0.625rem] text-muted-foreground">{person.channel}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-auto flex items-center gap-1.5 px-1.5 pt-4 text-[0.6875rem] font-medium text-live">
            <span className="size-1.5 rounded-full bg-live" />
            Agent live
          </p>
        </div>

        <div className="grid min-w-0 gap-3 p-4 text-sm sm:p-5">
          <p className="flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold">{open.name}</span>
            <span className="text-muted-foreground">via {open.channel}</span>
          </p>
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-foreground/[0.06] px-4 py-2.5">
            Where is my order #1042?
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-wash-1/20 px-4 py-2.5">
            It shipped yesterday and should reach you on Thursday. Here is your tracking link.
          </div>
          <div className="mt-1 rounded-xl border border-border p-3.5">
            <p className="text-xs font-medium text-muted-foreground">What the agent did</p>
            <ul className="mt-3 grid gap-2.5">
              {agentSteps.map((step) => (
                <li key={step.label} className="flex items-center justify-between gap-3 text-[0.8125rem]">
                  <span className="flex items-center gap-2">
                    <CheckIcon className="size-4 shrink-0 text-live" aria-hidden="true" />
                    {step.label}
                  </span>
                  <span className="shrink-0 rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[0.6875rem] text-muted-foreground">
                    {step.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between px-1 text-xs">
            <span className="text-muted-foreground">Evaluation checks</span>
            <span className="flex items-center gap-1.5 font-medium text-live">
              <span className="size-1.5 rounded-full bg-live" />
              All passing
            </span>
          </div>
        </div>
      </div>
    </Window>
  );
}

/*
 * Ready apps: the same business app under the client's own name ("Your brand"),
 * shown on a laptop (the full dashboard) and on a phone in front of it (the
 * mobile app). Each screen is a size container and everything inside it is
 * sized in cqw (1% of the screen's width), so the screens scale like a real
 * screenshot and keep the same layout at every size.
 */

/** Dark device frame colour (neutral, so it suits either palette). */
const BEZEL = "#1c1f27";

const kpis = [
  { label: "Sales today", value: "₹12,480", note: "+8%", up: true },
  { label: "Orders", value: "38", note: "+12%", up: true },
  { label: "Open chats", value: "12", note: "9 by AI", up: false },
  { label: "GST bills", value: "24", note: "All sent", up: false },
];

/** Sales this week, Monday to Sunday, as a share of the best day. */
const weekSales = [42, 58, 50, 72, 64, 86, 100];
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const pipeline = [
  { stage: "New leads", count: 14, share: "100%" },
  { stage: "Quoted", count: 6, share: "43%" },
  { stage: "Won", count: 3, share: "21%" },
];

const statusLook = {
  live: "bg-live/10 text-live",
  brand: "bg-brand/10 text-brand",
  amber: "bg-[#f59e0b]/12 text-[#b45309]",
};

const recentOrders = [
  { id: "#1042", customer: "Priya S.", channel: "WhatsApp", amount: "₹2,450", status: "Paid", tone: "live" },
  { id: "#1041", customer: "Arun K.", channel: "Instagram", amount: "₹1,299", status: "Shipped", tone: "brand" },
  { id: "#1040", customer: "Meena R.", channel: "Website", amount: "₹899", status: "Packed", tone: "amber" },
] as const;

const sideNav = [LayoutDashboardIcon, InboxIcon, UsersIcon, ReceiptTextIcon, PackageIcon];

const quickActions = [
  { icon: ReceiptTextIcon, label: "New bill" },
  { icon: MegaphoneIcon, label: "Broadcast" },
  { icon: UserPlusIcon, label: "Add lead" },
  { icon: ScanLineIcon, label: "Scan" },
];

const chats = [
  { name: "Priya S.", text: "Got the tracking link, thanks", tag: "AI replied" },
  { name: "Arun K.", text: "Is the kurta there in size M?", unread: 2 },
  { name: "Meena R.", text: "Invoice received", time: "9:12" },
];

const phoneTabs = [
  { icon: HouseIcon, label: "Home" },
  { icon: InboxIcon, label: "Inbox" },
  { icon: UsersIcon, label: "CRM" },
  { icon: ReceiptTextIcon, label: "Bills" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

export function AppsVisual() {
  return (
    // The laptop takes 78% of the width and the phone 25%, so the phone (about as tall as the
    // laptop) overlaps only the laptop's frame and empty margin: nothing on the screen is hidden.
    <div className="relative pr-[22%] pb-4">
      <Laptop />
      <Phone />
    </div>
  );
}

function Laptop() {
  return (
    <div>
      {/* Screen in a dark frame, with the camera in the top edge. */}
      <div
        className="relative rounded-t-xl p-[4px] pt-[7px] shadow-[0_24px_60px_-24px_rgb(11_16_36/0.35)] sm:rounded-t-2xl sm:p-[7px] sm:pt-[10px]"
        style={{ backgroundColor: BEZEL }}
      >
        <span className="absolute top-[2px] left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-white/15 sm:top-[3.5px] sm:size-1" />
        {/* A real laptop screen shape (16:10). */}
        <div className="@container aspect-[16/10] overflow-hidden rounded-[3px] bg-card">
          <div className="grid h-full grid-cols-[8.5cqw_1fr] leading-[1.35]">
            {/* Side menu: the brand, then the sections; the first one is open. */}
            <div className="flex flex-col items-center gap-[1.6cqw] border-r border-border bg-foreground/[0.025] py-[2.2cqw]">
              <span className="mb-[1cqw] grid size-[5cqw] place-items-center rounded-[1.2cqw] bg-brand text-white">
                <StarIcon className="size-[2.4cqw] fill-current" />
              </span>
              {sideNav.map((Icon, index) => (
                <span
                  key={index}
                  className={cn(
                    "relative grid size-[5cqw] place-items-center rounded-[1.2cqw]",
                    index === 0 ? "bg-p1/10 text-brand" : "text-foreground/40"
                  )}
                >
                  <Icon className="size-[2.6cqw]" />
                  {index === 1 ? (
                    <span className="absolute top-[0.9cqw] right-[0.9cqw] size-[1cqw] rounded-full bg-brand" />
                  ) : null}
                </span>
              ))}
              <SettingsIcon className="mt-auto size-[2.6cqw] text-foreground/40" />
            </div>

            <div className="min-w-0">
              {/* Top bar: page name, search, notifications, profile. */}
              <div className="flex items-center gap-[2cqw] border-b border-border px-[3cqw] py-[1.2cqw]">
                <p className="min-w-0 flex-1 truncate text-[2.6cqw] font-semibold">
                  Dashboard <span className="font-normal text-muted-foreground">· Today</span>
                </p>
                <span className="flex w-[30cqw] items-center gap-[1cqw] rounded-full bg-foreground/[0.05] px-[1.6cqw] py-[0.9cqw] text-[1.7cqw] text-muted-foreground">
                  <SearchIcon className="size-[2cqw] shrink-0" />
                  <span className="truncate">Search orders, customers</span>
                </span>
                <span className="relative">
                  <BellIcon className="size-[2.6cqw] text-foreground/50" />
                  <span className="absolute -top-[0.3cqw] -right-[0.2cqw] size-[1cqw] rounded-full bg-[#ef4444]" />
                </span>
                <span className="size-[4.2cqw] shrink-0 rounded-full bg-linear-to-br from-p1 to-p2" />
              </div>

              <div className="grid gap-[1.3cqw] px-[2.6cqw] py-[1.5cqw]">
                {/* The day's figures: label and change on top, the number below. */}
                <div className="grid grid-cols-4 gap-[1.6cqw]">
                  {kpis.map((kpi) => (
                    <div key={kpi.label} className="rounded-[1.4cqw] border border-border px-[1.6cqw] py-[1.4cqw]">
                      <div className="flex items-center justify-between gap-[1cqw]">
                        <p className="truncate text-[1.7cqw] text-muted-foreground">{kpi.label}</p>
                        <p
                          className={cn(
                            "flex shrink-0 items-center gap-[0.4cqw] text-[1.5cqw] font-medium",
                            kpi.up ? "text-live" : "text-muted-foreground"
                          )}
                        >
                          {kpi.up ? <TrendingUpIcon className="size-[1.7cqw]" /> : null}
                          {kpi.note}
                        </p>
                      </div>
                      <p className="mt-[0.5cqw] text-[3.2cqw] leading-tight font-semibold tracking-tight">{kpi.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-[1.75fr_1fr] gap-[1.6cqw]">
                  {/* Sales this week: a bar per day, today highlighted. */}
                  <div className="flex flex-col rounded-[1.4cqw] border border-border p-[1.4cqw]">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[1.9cqw] font-semibold">Sales this week</p>
                      <p className="text-[1.6cqw] text-muted-foreground">₹58,920</p>
                    </div>
                    {/* The bars fill the card's height, which the pipeline card beside it sets. */}
                    <div className="mt-[1cqw] flex min-h-[5cqw] flex-1 items-end gap-[1.3cqw] border-b border-border">
                      {weekSales.map((share, index) => (
                        <span
                          key={index}
                          className={cn(
                            "flex-1 rounded-t-[0.6cqw]",
                            index === weekSales.length - 1 ? "bg-linear-to-t from-p1 to-p2" : "bg-p1/15"
                          )}
                          style={{ height: `${share}%` }}
                        />
                      ))}
                    </div>
                    <div className="mt-[0.6cqw] flex gap-[1.3cqw] text-[1.4cqw] text-muted-foreground">
                      {weekDays.map((day, index) => (
                        <span key={index} className="flex-1 text-center">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CRM pipeline. */}
                  <div className="rounded-[1.4cqw] border border-border p-[1.4cqw]">
                    <p className="text-[1.9cqw] font-semibold">Pipeline</p>
                    <ul className="mt-[0.8cqw] grid gap-[0.6cqw]">
                      {pipeline.map((row) => (
                        <li key={row.stage}>
                          <p className="flex justify-between text-[1.6cqw]">
                            <span className="text-muted-foreground">{row.stage}</span>
                            <span className="font-semibold">{row.count}</span>
                          </p>
                          <span className="mt-[0.4cqw] block h-[0.8cqw] rounded-full bg-foreground/[0.06]">
                            <span className="block h-full rounded-full bg-p1" style={{ width: row.share }} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recent orders, as a table. */}
                <div className="rounded-[1.4cqw] border border-border px-[1.6cqw] pt-[1.2cqw] pb-[0.3cqw]">
                  <p className="text-[1.9cqw] font-semibold">Recent orders</p>
                  <div className="mt-[0.6cqw] grid grid-cols-[13%_22%_21%_17%_1fr] border-b border-border pb-[0.5cqw] text-[1.5cqw] text-muted-foreground">
                    <span>Order</span>
                    <span>Customer</span>
                    <span>Channel</span>
                    <span>Amount</span>
                    <span className="text-right">Status</span>
                  </div>
                  <ul className="divide-y divide-border">
                    {recentOrders.map((order) => (
                      <li
                        key={order.id}
                        className="grid grid-cols-[13%_22%_21%_17%_1fr] items-center py-[0.6cqw] text-[1.7cqw]"
                      >
                        <span className="font-medium">{order.id}</span>
                        <span className="truncate">{order.customer}</span>
                        <span className="truncate text-muted-foreground">{order.channel}</span>
                        <span className="font-medium">{order.amount}</span>
                        <span className="text-right">
                          <span
                            className={cn(
                              "inline-block rounded-full px-[1cqw] py-[0.2cqw] text-[1.5cqw] font-medium",
                              statusLook[order.tone]
                            )}
                          >
                            {order.status}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* A thin aluminium base with the opening notch. */}
      <div className="relative -mx-[5%] h-2.5 rounded-b-xl bg-linear-to-b from-[#dfe2e8] to-[#b8bcc6] shadow-[0_10px_20px_-10px_rgb(11_16_36/0.4)] sm:h-3.5">
        <span className="absolute top-0 left-1/2 h-1 w-[14%] -translate-x-1/2 rounded-b-md bg-[#a7acb8] sm:h-1.5" />
      </div>
    </div>
  );
}

/** The phone, in front: the same app on mobile, in real phone proportions (9:19). */
function Phone() {
  return (
    <div
      className="absolute right-0 bottom-0 aspect-[9/19] w-[25%] overflow-hidden rounded-[1.1rem] border-[3px] bg-card shadow-[0_28px_60px_-20px_rgb(11_16_36/0.55)] sm:rounded-[1.9rem] sm:border-[6px]"
      style={{ borderColor: BEZEL }}
    >
      <div className="@container flex h-full flex-col">
        {/* Status bar around the camera pill: time, then signal, wifi and battery. */}
        <div className="relative flex items-center justify-between px-[8cqw] pt-[4cqw] text-[4.4cqw] font-semibold">
          <span>9:41</span>
          <span
            className="absolute top-[3cqw] left-1/2 h-[6cqw] w-[28cqw] -translate-x-1/2 rounded-full"
            style={{ backgroundColor: BEZEL }}
          />
          <span className="flex items-center gap-[1.2cqw]">
            <SignalIcon className="size-[4.4cqw]" />
            <WifiIcon className="size-[4.4cqw]" />
            <BatteryFullIcon className="size-[5.4cqw]" />
          </span>
        </div>

        <div className="flex flex-1 flex-col px-[5cqw] pt-[5cqw]">
          {/* App header. */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[2cqw]">
              <span className="grid size-[7cqw] place-items-center rounded-[2cqw] bg-brand text-white">
                <StarIcon className="size-[3.6cqw] fill-current" />
              </span>
              <span className="text-[5cqw] font-semibold">Your brand</span>
            </span>
            <span className="relative">
              <BellIcon className="size-[5.4cqw] text-foreground/60" />
              <span className="absolute -top-[0.5cqw] -right-[0.3cqw] size-[2cqw] rounded-full bg-[#ef4444]" />
            </span>
          </div>

          {/* Today's sales, with a small chart of the day. */}
          <div className="mt-[4cqw] overflow-hidden rounded-[5cqw] bg-linear-to-br from-brand to-p2 text-white">
            <div className="px-[5cqw] pt-[4.5cqw]">
              <p className="text-[4cqw] text-white/80">Sales today</p>
              <p className="text-[8.5cqw] leading-tight font-semibold tracking-tight">₹12,480</p>
              <p className="mt-[0.5cqw] flex items-center gap-[1cqw] text-[3.6cqw] text-white/85">
                <TrendingUpIcon className="size-[4cqw]" />
                +8% on yesterday
              </p>
            </div>
            <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="mt-[2cqw] block h-[11cqw] w-full">
              <path d="M0 20 C 12 18, 18 12, 28 14 S 44 8, 54 11 S 70 4, 80 7 S 94 2, 100 3 L 100 24 L 0 24 Z" className="fill-white/15" />
              <path
                d="M0 20 C 12 18, 18 12, 28 14 S 44 8, 54 11 S 70 4, 80 7 S 94 2, 100 3"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                className="opacity-90"
              />
            </svg>
          </div>

          {/* Quick actions. */}
          <div className="mt-[4.5cqw] grid grid-cols-4 gap-[1cqw]">
            {quickActions.map((action) => (
              <span key={action.label} className="flex flex-col items-center gap-[1.5cqw]">
                <span className="grid size-[12cqw] place-items-center rounded-full bg-p1/10 text-brand">
                  <action.icon className="size-[5.4cqw]" />
                </span>
                <span className="text-[3.6cqw] whitespace-nowrap text-muted-foreground">{action.label}</span>
              </span>
            ))}
          </div>

          {/* Latest chats. */}
          <div className="mt-[5cqw] flex items-baseline justify-between">
            <p className="text-[4.6cqw] font-semibold">Chats</p>
            <p className="text-[3.6cqw] font-medium text-brand">See all</p>
          </div>
          <ul className="mt-[2cqw] grid gap-[3cqw]">
            {chats.map((chat) => (
              <li key={chat.name} className="flex items-center gap-[2.5cqw]">
                <span className="grid size-[9cqw] shrink-0 place-items-center rounded-full bg-foreground/[0.07] text-[3.4cqw] font-semibold text-foreground/70">
                  {initials(chat.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[4cqw] font-semibold">{chat.name}</span>
                  <span className="block truncate text-[3.7cqw] text-muted-foreground">{chat.text}</span>
                </span>
                {chat.unread ? (
                  <span className="grid size-[5.4cqw] shrink-0 place-items-center rounded-full bg-p1 text-[3.2cqw] font-semibold text-white">
                    {chat.unread}
                  </span>
                ) : chat.tag ? (
                  <span className="shrink-0 rounded-full bg-live/10 px-[1.8cqw] py-[0.6cqw] text-[3.3cqw] font-medium text-live">
                    {chat.tag}
                  </span>
                ) : (
                  <span className="shrink-0 text-[3.2cqw] text-muted-foreground">{chat.time}</span>
                )}
              </li>
            ))}
          </ul>

          {/* Bottom tab bar. */}
          <div className="-mx-[5cqw] mt-auto grid grid-cols-4 border-t border-border pt-[2.5cqw] pb-[4cqw]">
            {phoneTabs.map((tab, index) => (
              <span
                key={tab.label}
                className={cn(
                  "flex flex-col items-center gap-[1cqw] text-[3.4cqw] font-medium",
                  index === 0 ? "text-brand" : "text-muted-foreground"
                )}
              >
                <tab.icon className="size-[5.4cqw]" />
                {tab.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
