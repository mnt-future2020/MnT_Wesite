import {
  ArrowRightIcon,
  BatteryFullIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  LockIcon,
  MailIcon,
  PanelLeftIcon,
  PlusIcon,
  RotateCwIcon,
  SearchIcon,
  ShareIcon,
  ShieldCheckIcon,
  ShieldIcon,
  SignalIcon,
  StarIcon,
  TrendingDownIcon,
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
export function Window({
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
 * Safari's toolbar. A narrow window (bar under 22rem: phones, and small pictures on
 * laptops) shows only the window buttons and the address, so the address is not
 * squeezed. The bar is a size container, so this follows the window's width.
 */
function BrowserBar({ url }: { url: string }) {
  return (
    <div className="@container flex items-center gap-3 border-b border-border bg-foreground/[0.03] px-3.5 py-2.5 text-foreground/40">
      <WindowButtons />

      {/* Sidebar, back and forward. */}
      <div className="hidden shrink-0 items-center gap-2 @[22rem]:flex">
        <PanelLeftIcon className="size-3.5" />
        <span className="flex items-center">
          <ChevronLeftIcon className="size-4" />
          <ChevronRightIcon className="size-4 opacity-50" />
        </span>
      </div>

      {/* Privacy shield, then the address bar with the page's address in the middle. */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <ShieldIcon className="hidden size-3.5 shrink-0 @[22rem]:block" />
        <div className="relative flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md bg-foreground/[0.06] px-2 py-1 text-xs text-muted-foreground @[22rem]:px-6">
          <LockIcon className="size-3 shrink-0" />
          <span className="truncate">{url}</span>
          <RotateCwIcon className="absolute right-2 hidden size-3 @[22rem]:block" />
        </div>
      </div>

      {/* Share, new tab and all tabs. */}
      <div className="hidden shrink-0 items-center gap-2.5 @[22rem]:flex">
        <ShareIcon className="size-3.5" />
        <PlusIcon className="size-3.5" />
        <CopyIcon className="size-3.5" />
      </div>
    </div>
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
  { name: "Meena R.", channel: "Voice call" },
];

/**
 * AI (tab 1): a support agent app (a Mac app window, not a browser). A narrow
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

/** The business systems feeding the analytics app (API and system integration). */
const dataSources = ["ERP", "CRM", "Payments", "WhatsApp"];

/** The month's figures. Phones show the short words (`short`), as the three cards are narrow there. */
const dataKpis = [
  { label: "Revenue", value: "₹48.2L", note: "+12% on last month", short: "+12%" },
  { label: "Orders", value: "3,940", note: "+8% on last month", short: "+8%" },
  { label: "Forecast", value: "₹52.6L", note: "Next month, by AI", short: "By AI", forecast: true },
];

/*
 * Revenue by month for the chart, drawn in a 300 x 90 box (smaller numbers sit
 * higher). January to October are actual; October to December are the forecast.
 */
const revenueActual = [70, 64, 66, 55, 58, 47, 50, 40, 36, 30];
const revenueForecast = [30, 25, 19];
const monthStep = 300 / 11;
const chartPoint = (value: number, month: number) => `${(month * monthStep).toFixed(1)} ${value}`;
const actualLine = "M" + revenueActual.map(chartPoint).join(" L");
const actualArea = `${actualLine} L${((revenueActual.length - 1) * monthStep).toFixed(1)} 90 L0 90 Z`;
const forecastLine =
  "M" + revenueForecast.map((value, index) => chartPoint(value, index + revenueActual.length - 1)).join(" L");
const monthInitials = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/**
 * Data & integration: an analytics app (a Mac app window). Along the top, the
 * systems it is connected to; then the month's figures with an AI forecast, the
 * revenue chart with the forecast dashed, and the report it sends on its own.
 */
export function DataVisual() {
  return (
    <Window title="Analytics" className="mx-auto max-w-lg">
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5 text-[0.6875rem]">
          <span className="mr-1 text-muted-foreground">Connected</span>
          {dataSources.map((source) => (
            <span key={source} className="flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-medium">
              <span className="size-1.5 rounded-full bg-live" />
              {source}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {dataKpis.map((kpi) => (
            <div
              key={kpi.label}
              className={cn(
                "min-w-0 rounded-xl border p-2.5 sm:p-3",
                kpi.forecast ? "border-p1/30 bg-p1/[0.05]" : "border-border"
              )}
            >
              <p className="truncate text-[0.6875rem] text-muted-foreground">{kpi.label}</p>
              <p className="mt-1 text-base leading-tight font-semibold tracking-tight sm:text-lg">{kpi.value}</p>
              <p className={cn("mt-0.5 truncate text-[0.6875rem] font-medium", kpi.forecast ? "text-brand" : "text-live")}>
                <span className="sm:hidden">{kpi.short}</span>
                <span className="max-sm:hidden">{kpi.note}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border p-3.5">
          <div className="flex items-center justify-between gap-3 text-xs">
            <p className="font-semibold">Revenue</p>
            <p className="flex items-center gap-3 text-[0.6875rem] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-3 rounded-full bg-brand" />
                Actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 border-t-2 border-dashed border-brand/60" />
                Forecast
              </span>
            </p>
          </div>
          <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="mt-3 block h-24 w-full">
            {[22, 45, 68].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} className="stroke-border" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            <path d={actualArea} className="fill-p1/10" />
            <path d={actualLine} fill="none" className="stroke-brand" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <path
              d={forecastLine}
              fill="none"
              className="stroke-brand/60"
              strokeWidth="2"
              strokeDasharray="5 4"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="mt-1.5 flex justify-between text-[0.625rem] text-muted-foreground">
            {monthInitials.map((month, index) => (
              <span key={index} className="w-2 text-center">
                {month}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-xs">
          <span className="flex items-center gap-2">
            <MailIcon className="size-4 text-brand" aria-hidden="true" />
            Weekly report sent to 6 people
          </span>
          <span className="text-muted-foreground">Mondays, 9:00</span>
        </div>
      </div>
    </Window>
  );
}

/** The CI/CD pipeline of the release going out: every step passed. */
const releaseSteps = [
  { step: "Build", note: "1m 12s" },
  { step: "Tests", note: "214 passed" },
  { step: "Security scan", note: "0 critical" },
  { step: "Deploy", note: "Live" },
];

const infrastructure = [
  { name: "API", detail: "4 instances" },
  { name: "Database", detail: "Primary + replica" },
  { name: "CDN", detail: "Edge cache" },
];

const securityChecks = ["MFA for every user", "Secrets rotated weekly", "Security audit passed"];

/**
 * Cloud & security: the production environment (a Mac app window). The release
 * that just went out and its pipeline, the health of the infrastructure, the
 * security checks, and the month's cloud cost.
 */
export function CloudVisual() {
  return (
    <Window title="Production · Mumbai" className="mx-auto max-w-lg">
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold">Release v2.14</p>
            <p className="truncate text-[0.6875rem] text-muted-foreground">main · 3f9c2a1 · deployed 4 min ago</p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-live/10 px-2.5 py-1 text-xs font-medium text-live">
            <span className="size-1.5 rounded-full bg-live" />
            Live
          </span>
        </div>

        <ol className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {releaseSteps.map((item) => (
            <li key={item.step} className="min-w-0 rounded-lg border border-border px-2.5 py-2">
              <span className="block h-1 rounded-full bg-live" />
              <p className="mt-2 truncate text-[0.6875rem] font-semibold">{item.step}</p>
              <p className="truncate text-[0.625rem] text-muted-foreground">{item.note}</p>
            </li>
          ))}
        </ol>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-3.5">
            <p className="text-xs font-medium text-muted-foreground">Infrastructure</p>
            <ul className="mt-2.5 grid gap-2">
              {infrastructure.map((item) => (
                <li key={item.name} className="flex items-center justify-between gap-2 text-[0.8125rem]">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-live" />
                    <span className="truncate">{item.name}</span>
                  </span>
                  <span className="shrink-0 text-[0.6875rem] text-muted-foreground">{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-3.5">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheckIcon className="size-3.5 text-brand" aria-hidden="true" />
              Security
            </p>
            <ul className="mt-2.5 grid gap-2">
              {securityChecks.map((check) => (
                <li key={check} className="flex items-center gap-2 text-[0.8125rem]">
                  <CheckIcon className="size-3.5 shrink-0 text-live" aria-hidden="true" />
                  <span className="truncate">{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-xs">
          <span>Cloud cost this month</span>
          <span className="flex items-center gap-1.5 font-medium text-live">
            <TrendingDownIcon className="size-4" aria-hidden="true" />
            18% lower than last month
          </span>
        </div>
      </div>
    </Window>
  );
}

/*
 * Software & apps (tab 2): the client's website in a browser, and their app's page in the
 * app store on a phone in front of it, published under the client's own name
 * ("Your brand", from "Your Company Pvt Ltd"). Both screens are size containers
 * and everything inside them is sized in cqw (1% of the screen's width), so they
 * scale like a real screenshot and keep the same layout at every size.
 */

/** Dark phone frame colour (a neutral near-black). */
const BEZEL = "#1c1f27";

const client = { brand: "Your brand", company: "Your Company Pvt Ltd", url: "yourbrand.in" };

/** The website's three short points, under its hero. */
const sitePoints = [
  { title: "Book in seconds", text: "Pick a time, pay, done." },
  { title: "Track every order", text: "Live status on the web and the app." },
  { title: "Pay your way", text: "UPI, cards and wallets." },
];

/** The numbers at the top of the store page. */
const storeStats = [
  { value: "4.8", label: "2.3K reviews", star: true },
  { value: "50K+", label: "Downloads" },
  { value: "Free", label: "Price" },
];

/** Share of reviews at 5, 4, 3, 2 and 1 stars. */
const ratingShares = ["82%", "11%", "4%", "2%", "1%"];

/*
 * A QR code for "Scan to get the app": 21 x 21 squares with the three corner
 * markers. The squares in between are a fixed made-up pattern (it does not scan).
 */
const QR_SIZE = 21;
const qrCorners = [
  [0, 0],
  [14, 0],
  [0, 14],
];
const qrSquares = (() => {
  const nearCorner = (x: number, y: number) => qrCorners.some(([cx, cy]) => x >= cx - 1 && x <= cx + 7 && y >= cy - 1 && y <= cy + 7);
  const on = (x: number, y: number) => {
    let h = Math.imul(x + 1, 374761393) + Math.imul(y + 1, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) & 1) === 1;
  };
  let path = "";
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      if (!nearCorner(x, y) && on(x, y)) path += `M${x} ${y}h1v1h-1z`;
    }
  }
  return path;
})();

function QrCode({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className={cn("text-ink", className)} aria-hidden="true" shapeRendering="crispEdges">
      <path d={qrSquares} fill="currentColor" />
      {qrCorners.map(([x, y]) => (
        <g key={`${x}-${y}`} fill="currentColor">
          <path d={`M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z`} fillRule="evenodd" />
          <path d={`M${x + 2} ${y + 2}h3v3h-3z`} />
        </g>
      ))}
    </svg>
  );
}

/** The client's logo: a "Y" (for "Your brand") on a brand-blue square. Size it with className. */
function BrandMark({ className }: { className: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center bg-linear-to-br from-brand to-p2 leading-none font-semibold text-white",
        className
      )}
    >
      Y
    </span>
  );
}

export function AppsVisual() {
  return (
    // The browser takes 78% of the width and the phone 25%, so the phone overlaps only the
    // browser's empty right margin: nothing on the website is hidden.
    <div className="relative pr-[22%] pb-4">
      <Website />
      <StorePhone />
    </div>
  );
}

/** The client's website, in a browser window. */
function Website() {
  return (
    <Window url={client.url}>
      <div className="@container aspect-[16/10] overflow-hidden">
        <div className="flex h-full flex-col px-[5cqw] leading-[1.35]">
          {/* Site header: logo, links and the app button. */}
          <div className="flex items-center gap-[3cqw] py-[2.4cqw]">
            <span className="flex items-center gap-[1cqw]">
              <BrandMark className="size-[3.6cqw] rounded-[1cqw] text-[2cqw]" />
              <span className="text-[2.1cqw] font-semibold tracking-tight">{client.brand}</span>
            </span>
            <span className="ml-auto flex gap-[2.6cqw] text-[1.6cqw] text-muted-foreground">
              <span>Products</span>
              <span>Services</span>
              <span>About</span>
              <span>Contact</span>
            </span>
            <span className="rounded-full bg-primary px-[1.8cqw] py-[0.8cqw] text-[1.5cqw] font-medium text-primary-foreground">
              Get the app
            </span>
          </div>

          {/* Hero, centred in the space between the header and the bottom points: the pitch on the
              left, the app one scan away on the right. */}
          <div className="my-auto grid grid-cols-[1.2fr_1fr] items-center gap-[4cqw]">
            <div>
              <span className="inline-flex rounded-full bg-p1/10 px-[1.4cqw] py-[0.5cqw] text-[1.4cqw] font-medium text-brand">
                Now on Android and iPhone
              </span>
              <p className="mt-[1.8cqw] text-[5.2cqw] leading-[1.04] font-semibold tracking-[-0.03em]">
                Order, book and pay in one place.
              </p>
              <p className="mt-[1.6cqw] text-[1.7cqw] text-muted-foreground">
                One account on our website and in our app, with your history on both.
              </p>
              <div className="mt-[2.4cqw] flex gap-[1.2cqw]">
                <span className="rounded-full bg-primary px-[2.2cqw] py-[1cqw] text-[1.6cqw] font-medium text-primary-foreground">
                  Get started
                </span>
                <span className="flex items-center gap-[0.7cqw] rounded-full border border-border px-[2cqw] py-[1cqw] text-[1.6cqw] font-medium">
                  <DownloadIcon className="size-[1.7cqw]" />
                  Download the app
                </span>
              </div>
            </div>

            <div className="grid h-[30cqw] place-items-center rounded-[2cqw] bg-linear-to-br from-wash-1/25 via-wash-2/10 to-wash-3/30">
              <div className="flex flex-col items-center rounded-[1.6cqw] bg-card p-[1.8cqw] shadow-[0_1cqw_2.4cqw_-1cqw_rgb(11_16_36/0.3)]">
                <QrCode className="size-[13cqw]" />
                <p className="mt-[1.2cqw] text-[1.6cqw] font-semibold">Scan to get the app</p>
                <p className="text-[1.4cqw] text-muted-foreground">Android and iPhone</p>
              </div>
            </div>
          </div>

          {/* Three short points, along the bottom of the page. */}
          <div className="mb-[4cqw] grid grid-cols-3 gap-[3cqw] border-t border-border pt-[2.2cqw]">
            {sitePoints.map((point) => (
              <div key={point.title}>
                <p className="text-[1.6cqw] font-semibold">{point.title}</p>
                <p className="mt-[0.3cqw] text-[1.4cqw] text-muted-foreground">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

/** One of the app's screenshots on the store page, drawn as a simple outline of the app. */
function AppScreenshot({ kind }: { kind: "home" | "book" | "track" }) {
  const line = "block h-[1.6cqw] rounded-full bg-foreground/10";
  return (
    <div className="flex aspect-[9/17] w-[28cqw] shrink-0 flex-col gap-[2cqw] overflow-hidden rounded-[3cqw] border border-border bg-tint-3 p-[2.4cqw]">
      {kind === "home" ? (
        <>
          <span className="block h-[11cqw] rounded-[2cqw] bg-linear-to-br from-brand to-p2" />
          {[0, 1, 2].map((row) => (
            <span key={row} className="flex items-center gap-[1.6cqw]">
              <span className="size-[5cqw] shrink-0 rounded-full bg-p1/20" />
              <span className="grid flex-1 gap-[1cqw]">
                <span className={line} />
                <span className={cn(line, "w-2/3")} />
              </span>
            </span>
          ))}
        </>
      ) : null}
      {kind === "book" ? (
        <>
          <span className={cn(line, "w-1/2 bg-foreground/20")} />
          <span className="grid grid-cols-4 gap-[1.2cqw]">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((day) => (
              <span key={day} className={cn("aspect-square rounded-[1.2cqw]", day === 2 ? "bg-brand" : "bg-foreground/[0.07]")} />
            ))}
          </span>
          {[0, 1, 2].map((slot) => (
            <span key={slot} className={cn("block h-[4cqw] rounded-[1.2cqw]", slot === 1 ? "bg-p1/25" : "bg-foreground/[0.07]")} />
          ))}
          <span className="mt-auto block h-[5cqw] rounded-full bg-primary" />
        </>
      ) : null}
      {kind === "track" ? (
        <>
          <span className="block flex-1 rounded-[2cqw] bg-linear-to-br from-wash-3/40 to-wash-1/15" />
          <span className="grid gap-[1.2cqw] rounded-[2cqw] bg-card p-[2cqw]">
            <span className={cn(line, "w-3/4 bg-foreground/20")} />
            <span className="grid grid-cols-3 gap-[1cqw]">
              <span className="h-[1.2cqw] rounded-full bg-brand" />
              <span className="h-[1.2cqw] rounded-full bg-brand" />
              <span className="h-[1.2cqw] rounded-full bg-foreground/10" />
            </span>
          </span>
        </>
      ) : null}
    </div>
  );
}

/** The phone, in front: the app's page in the app store, in real phone proportions (9:19). */
function StorePhone() {
  return (
    <div
      className="absolute right-0 bottom-0 aspect-[9/19] w-[25%] overflow-hidden rounded-[1.1rem] border-[3px] bg-card shadow-[0_28px_60px_-20px_rgb(11_16_36/0.55)] sm:rounded-[1.9rem] sm:border-[6px]"
      style={{ borderColor: BEZEL }}
    >
      <div className="@container flex h-full flex-col leading-[1.35]">
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

        <div className="flex flex-1 flex-col px-[6cqw] pt-[4cqw]">
          {/* Back and search. */}
          <div className="flex items-center justify-between text-foreground/50">
            <ChevronLeftIcon className="size-[6cqw]" />
            <SearchIcon className="size-[4.6cqw]" />
          </div>

          {/* The app: its icon and name, and the company that publishes it (the client). */}
          <div className="mt-[3cqw] flex items-center gap-[4cqw]">
            <BrandMark className="size-[19cqw] rounded-[4.6cqw] text-[9cqw] shadow-[0_2cqw_4cqw_-2cqw_rgb(11_16_36/0.4)]" />
            <div className="min-w-0">
              <p className="truncate text-[5.6cqw] leading-tight font-semibold">{client.brand}</p>
              <p className="mt-[1cqw] truncate text-[3.4cqw] font-medium text-brand">{client.company}</p>
            </div>
          </div>

          {/* Rating, downloads and price, then the install button. */}
          <div className="mt-[5cqw] grid grid-cols-3 divide-x divide-border text-center">
            {storeStats.map((stat) => (
              <div key={stat.label}>
                <p className="flex items-center justify-center gap-[0.8cqw] text-[4cqw] font-semibold">
                  {stat.value}
                  {stat.star ? <StarIcon className="size-[3.4cqw] fill-current" /> : null}
                </p>
                <p className="text-[3cqw] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <span className="mt-[4.5cqw] rounded-full bg-brand py-[2.4cqw] text-center text-[4cqw] font-semibold text-white">
            Install
          </span>

          {/* The app's screenshots; the third runs off the edge, as in a real store. */}
          <div className="-mr-[6cqw] mt-[5cqw] flex gap-[2.5cqw] overflow-hidden">
            <AppScreenshot kind="home" />
            <AppScreenshot kind="book" />
            <AppScreenshot kind="track" />
          </div>

          {/* About this app. */}
          <p className="mt-[5cqw] flex items-center justify-between text-[4.4cqw] font-semibold">
            About this app
            <ArrowRightIcon className="size-[4.4cqw] text-foreground/40" />
          </p>
          <p className="mt-[1.4cqw] text-[3.4cqw] text-muted-foreground">
            Order, book and pay from your phone, with the same account as our website.
          </p>

          {/* Ratings: the average, and the share of reviews at each star level. */}
          <p className="mt-[5cqw] text-[4.4cqw] font-semibold">Ratings and reviews</p>
          <div className="mt-[2.5cqw] flex items-center gap-[4cqw]">
            <div className="text-center">
              <p className="text-[10cqw] leading-none font-semibold tracking-tight">4.8</p>
              <p className="mt-[1.4cqw] flex text-star">
                {[0, 1, 2, 3, 4].map((star) => (
                  <StarIcon key={star} className="size-[2.8cqw] fill-current" />
                ))}
              </p>
            </div>
            <div className="grid flex-1 gap-[1cqw]">
              {ratingShares.map((share, index) => (
                <span key={index} className="flex items-center gap-[1.6cqw] text-[2.6cqw] text-muted-foreground">
                  {5 - index}
                  <span className="block h-[1.4cqw] flex-1 rounded-full bg-foreground/[0.07]">
                    <span className="block h-full rounded-full bg-brand" style={{ width: share }} />
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* The top review. */}
          <div className="mt-[5cqw] rounded-[4cqw] border border-border p-[3.5cqw]">
            <p className="flex items-center gap-[2cqw]">
              <span className="grid size-[7cqw] shrink-0 place-items-center rounded-full bg-p1/15 text-[3cqw] font-semibold text-brand">
                PS
              </span>
              <span className="min-w-0 flex-1 truncate text-[3.6cqw] font-semibold">Priya S.</span>
              <span className="flex text-star">
                {[0, 1, 2, 3, 4].map((star) => (
                  <StarIcon key={star} className="size-[2.8cqw] fill-current" />
                ))}
              </span>
            </p>
            <p className="mt-[1.6cqw] text-[3.2cqw] text-muted-foreground">
              Booking takes seconds, and my orders show up on the website too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
