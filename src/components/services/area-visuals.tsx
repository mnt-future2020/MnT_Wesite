import {
  ArrowRightLeftIcon,
  BuildingIcon,
  CalendarCheckIcon,
  CheckIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  LockIcon,
  MessageCircleIcon,
  MousePointer2Icon,
  PackageIcon,
  PhoneIcon,
  PlusIcon,
  ReceiptTextIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { Window } from "@/components/home/service-visuals";
import { cn } from "@/lib/utils";

/*
 * Product pictures for the Services page, one per service area that does not
 * already have one on the homepage. Same style as the homepage pictures: plain
 * HTML screens in a Mac window, theme colours, illustrative names and numbers
 * (not client data).
 */

/* ---------------------------------------------------------------- voice AI */

/** Heights of the call's sound bars, as a share of the bar area. */
const soundBars = [30, 55, 80, 45, 95, 60, 35, 70, 100, 50, 25, 65, 85, 40];

/**
 * Voice AI: an AI receptionist answering a call. The live call on top, the
 * conversation (the caller spoke Tamil; shown translated), then the booking it made.
 */
export function VoiceVisual() {
  return (
    <Window title="Voice agent" className="mx-auto max-w-lg">
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="flex items-center gap-3 rounded-xl bg-linear-to-br from-brand to-p2 p-4 text-white">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15">
            <PhoneIcon className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Call · Clinic front desk</p>
            <p className="truncate text-xs text-white/75">AI receptionist answering · 01:24</p>
          </div>
          <div aria-hidden="true" className="hidden h-8 shrink-0 items-center gap-[3px] sm:flex">
            {soundBars.map((height, index) => (
              <span key={index} className="w-[3px] rounded-full bg-white/80" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div className="grid gap-2.5 text-sm">
          <div className="max-w-[85%]">
            <p className="mb-1 flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
              Caller
              <span className="rounded-full bg-foreground/[0.06] px-1.5 py-px">Tamil, translated</span>
            </p>
            <p className="rounded-2xl rounded-tl-md bg-foreground/[0.06] px-4 py-2.5">
              Is there an appointment free tomorrow morning?
            </p>
          </div>
          <div className="ml-auto max-w-[85%]">
            <p className="mb-1 text-right text-[0.6875rem] text-muted-foreground">AI receptionist</p>
            <p className="rounded-2xl rounded-tr-md bg-wash-1/20 px-4 py-2.5">
              Yes, 11:30 tomorrow is free. Shall I book it for you?
            </p>
          </div>
          <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-foreground/[0.06] px-4 py-2.5">Yes, please book it.</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-xs">
          <span className="flex items-center gap-2 font-medium">
            <CalendarCheckIcon className="size-4 text-live" aria-hidden="true" />
            Booked: Tuesday, 11:30
          </span>
          <span className="text-muted-foreground">Saved to the CRM</span>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------- enterprise software */

const erpModules = [
  { icon: LayoutDashboardIcon, label: "Dashboard" },
  { icon: WalletIcon, label: "Finance" },
  { icon: ShoppingCartIcon, label: "Purchase", active: true },
  { icon: PackageIcon, label: "Inventory" },
  { icon: UsersIcon, label: "HR" },
  { icon: ReceiptTextIcon, label: "Sales" },
];

const purchaseOrders = [
  { id: "PO-2207", item: "Steel sheets", amount: "₹1,84,000", status: "Waiting", waiting: true },
  { id: "PO-2206", item: "Packaging", amount: "₹42,500", status: "Approved" },
  { id: "PO-2205", item: "Spare parts", amount: "₹18,900", status: "Approved" },
];

const lowStock = [
  { item: "Steel sheets", left: "12%" },
  { item: "Cartons", left: "28%" },
];

/**
 * Custom enterprise software: an ERP (a Mac app window). The modules down the
 * side; Purchase is open, with orders waiting for approval and stock running low.
 */
export function ErpVisual() {
  return (
    <Window title="Operations" className="mx-auto max-w-lg">
      <div className="grid sm:grid-cols-[7.5rem_1fr]">
        <ul className="hidden flex-col gap-0.5 border-r border-border bg-foreground/[0.025] p-2.5 sm:flex">
          {erpModules.map((module) => (
            <li
              key={module.label}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs",
                module.active ? "bg-card font-medium text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground"
              )}
            >
              <module.icon className={cn("size-3.5 shrink-0", module.active && "text-brand")} aria-hidden="true" />
              <span className="truncate">{module.label}</span>
            </li>
          ))}
        </ul>

        <div className="grid min-w-0 gap-4 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Purchase approvals</p>
            <span className="rounded-full bg-[#f59e0b]/12 px-2 py-0.5 text-[0.6875rem] font-medium text-[#b45309]">
              1 waiting
            </span>
          </div>
          <ul className="divide-y divide-border rounded-xl border border-border">
            {purchaseOrders.map((order) => (
              <li key={order.id} className="flex items-center gap-3 px-3.5 py-2.5 text-xs">
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{order.item}</span>
                  <span className="block text-[0.6875rem] text-muted-foreground">{order.id}</span>
                </span>
                <span className="font-medium tabular-nums">{order.amount}</span>
                {order.waiting ? (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[0.6875rem] font-medium text-primary-foreground">
                    Approve
                  </span>
                ) : (
                  <span className="rounded-full bg-live/10 px-2 py-0.5 text-[0.6875rem] font-medium text-live">
                    {order.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-border p-3.5">
            <p className="text-xs font-medium text-muted-foreground">Stock running low</p>
            <ul className="mt-2.5 grid gap-2.5">
              {lowStock.map((stock) => (
                <li key={stock.item} className="text-xs">
                  <span className="flex justify-between">
                    <span>{stock.item}</span>
                    <span className="text-muted-foreground">{stock.left} left</span>
                  </span>
                  <span className="mt-1.5 block h-1.5 rounded-full bg-foreground/[0.07]">
                    <span className="block h-full rounded-full bg-[#f59e0b]" style={{ width: stock.left }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ SaaS */

const saasKpis = [
  { label: "Revenue", value: "₹6.4L", note: "+9%" },
  { label: "Tenants", value: "128", note: "+11" },
  { label: "Churn", value: "1.2%", note: "Down" },
];

const tenants = [
  { name: "Acme Retail", plan: "Pro", users: "42 users", status: "Active" },
  { name: "Sunrise Clinics", plan: "Business", users: "118 users", status: "Active" },
  { name: "Nova Foods", plan: "Trial", users: "6 users", status: "Trial", trial: true },
];

/**
 * SaaS and product: the admin of a SaaS product (a browser window). The
 * product's numbers, and its customer workspaces, each with its own data.
 */
export function SaasVisual() {
  return (
    <Window url="app.yourproduct.com" className="mx-auto max-w-lg">
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Customers</p>
          <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[0.6875rem] font-medium text-primary-foreground">
            <PlusIcon className="size-3" aria-hidden="true" />
            New workspace
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {saasKpis.map((kpi) => (
            <div key={kpi.label} className="min-w-0 rounded-xl border border-border p-2.5 sm:p-3">
              <p className="truncate text-[0.6875rem] text-muted-foreground">{kpi.label}</p>
              <p className="mt-1 text-base leading-tight font-semibold tracking-tight sm:text-lg">{kpi.value}</p>
              <p className="mt-0.5 text-[0.6875rem] font-medium text-live">{kpi.note}</p>
            </div>
          ))}
        </div>
        <ul className="divide-y divide-border rounded-xl border border-border">
          {tenants.map((tenant) => (
            <li key={tenant.name} className="flex items-center gap-3 px-3.5 py-2.5 text-xs">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-p1/10 text-brand">
                <BuildingIcon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{tenant.name}</span>
                <span className="block text-[0.6875rem] text-muted-foreground">
                  {tenant.plan} · {tenant.users}
                </span>
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[0.6875rem] font-medium",
                  tenant.trial ? "bg-[#f59e0b]/12 text-[#b45309]" : "bg-live/10 text-live"
                )}
              >
                {tenant.status}
              </span>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-xs">
          <LockIcon className="size-4 text-brand" aria-hidden="true" />
          Each customer&apos;s data is kept separate
        </p>
      </div>
    </Window>
  );
}

/* ----------------------------------------------------------- integration */

/** The systems around the hub, placed around a circle (left and top as % of the diagram). */
const hubSystems = [
  { name: "ERP", left: 50, top: 9 },
  { name: "CRM", left: 86, top: 30 },
  { name: "Payments", left: 86, top: 72 },
  { name: "WhatsApp", left: 50, top: 92 },
  { name: "Courier", left: 14, top: 72 },
  { name: "Accounting", left: 14, top: 30 },
];

const syncLog = [
  { event: "Order #2081", to: "ERP", time: "120 ms" },
  { event: "Payment", to: "Accounting", time: "95 ms" },
  { event: "Tracking link", to: "WhatsApp", time: "Sent" },
];

/**
 * API and integration: your platform in the middle, joined to the systems the
 * business already runs, and the latest data moving between them.
 */
export function IntegrationVisual() {
  return (
    <Window title="Integrations" className="mx-auto max-w-lg">
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="relative aspect-[16/9] rounded-xl bg-foreground/[0.025]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 size-full">
            {hubSystems.map((system) => (
              <line
                key={system.name}
                x1="50"
                y1="50"
                x2={system.left}
                y2={system.top}
                className="stroke-brand/35"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-xl bg-linear-to-br from-brand to-p2 px-3 py-2 text-xs font-semibold text-white shadow-lg">
            <ArrowRightLeftIcon className="size-3.5" aria-hidden="true" />
            Your platform
          </span>
          {hubSystems.map((system) => (
            <span
              key={system.name}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[0.6875rem] font-medium shadow-sm"
              style={{ left: `${system.left}%`, top: `${system.top}%` }}
            >
              <span className="size-1.5 rounded-full bg-live" />
              {system.name}
            </span>
          ))}
        </div>
        <ul className="divide-y divide-border rounded-xl border border-border">
          {syncLog.map((row) => (
            <li key={row.event} className="flex items-center gap-2 px-3.5 py-2.5 text-xs">
              <CheckIcon className="size-3.5 shrink-0 text-live" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">
                {row.event} <span className="text-muted-foreground">to</span> {row.to}
              </span>
              <span className="shrink-0 text-[0.6875rem] text-muted-foreground tabular-nums">{row.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

/* -------------------------------------------------------------- security */

const findings = [
  { level: "Critical", count: "0", dot: "bg-[#dc2626]" },
  { level: "High", count: "1", dot: "bg-[#f97316]" },
  { level: "Medium", count: "4", dot: "bg-[#f59e0b]" },
  { level: "Low", count: "9", dot: "bg-foreground/30" },
];

const securityControls = [
  { icon: KeyRoundIcon, label: "MFA on for every user" },
  { icon: ScanSearchIcon, label: "Vulnerability scan: today, 06:00" },
  { icon: LockIcon, label: "API keys rotated 3 days ago" },
];

/** Share of the score ring that is filled (94 out of 100). */
const SCORE = 94;

/**
 * Cybersecurity: a security dashboard. The overall score, open findings by
 * severity, and the controls that are in place.
 */
export function SecurityVisual() {
  const circumference = 2 * Math.PI * 42;
  return (
    <Window title="Security" className="mx-auto max-w-lg">
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="flex items-center gap-4 rounded-xl border border-border p-4">
          <div className="relative size-20 shrink-0">
            <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="9" className="stroke-foreground/[0.07]" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="9"
                strokeLinecap="round"
                className="stroke-live"
                strokeDasharray={`${(SCORE / 100) * circumference} ${circumference}`}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-xl font-semibold tracking-tight">{SCORE}</span>
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <ShieldCheckIcon className="size-4 text-live" aria-hidden="true" />
              Security score
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Up from 71 last quarter</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {findings.map((finding) => (
            <div key={finding.level} className="min-w-0 rounded-xl border border-border px-2.5 py-2.5">
              <p className="flex items-center gap-1.5 truncate text-[0.6875rem] text-muted-foreground">
                <span className={cn("size-1.5 shrink-0 rounded-full", finding.dot)} />
                {finding.level}
              </p>
              <p className="mt-1 text-lg leading-tight font-semibold">{finding.count}</p>
            </div>
          ))}
        </div>

        <ul className="grid gap-2.5 rounded-xl border border-border p-3.5">
          {securityControls.map((control) => (
            <li key={control.label} className="flex items-center gap-2.5 text-xs">
              <control.icon className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{control.label}</span>
              <CheckIcon className="size-3.5 shrink-0 text-live" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- design */

const swatches = ["bg-ink", "bg-brand", "bg-wash-3", "bg-tint-2"];

/**
 * UI/UX: a design canvas. A phone screen and a dashboard being designed, the
 * selected button with its handles, a teammate's cursor and comment, and the
 * style panel on the side.
 */
export function DesignVisual() {
  const bar = "block rounded-full bg-foreground/10";
  return (
    <Window title="Design · Checkout" className="mx-auto max-w-lg">
      <div className="grid sm:grid-cols-[1fr_8rem]">
        {/* The canvas, with a dotted background. */}
        <div
          className="relative flex min-h-64 items-center justify-center gap-4 p-5"
          style={{ backgroundImage: "radial-gradient(rgb(12 26 46 / 0.12) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
        >
          {/* Phone screen. */}
          <div className="w-28 shrink-0 rounded-[1.1rem] border border-border bg-card p-2.5 shadow-md">
            <span className="mx-auto block h-1 w-8 rounded-full bg-foreground/15" />
            <span className="mt-3 block h-14 rounded-lg bg-linear-to-br from-wash-1/40 to-wash-3/30" />
            <span className={cn(bar, "mt-2.5 h-1.5 w-3/4")} />
            <span className={cn(bar, "mt-1.5 h-1.5 w-1/2")} />
            <span className={cn(bar, "mt-1.5 h-1.5 w-2/3")} />
            {/* The selected button, with its resize handles. */}
            <span className="relative mt-4 block">
              <span className="block h-6 rounded-md bg-primary" />
              <span className="absolute -inset-1 rounded-md border border-brand" />
              {["-top-1.5 -left-1.5", "-top-1.5 -right-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"].map((spot) => (
                <span key={spot} className={cn("absolute size-1.5 border border-brand bg-white", spot)} />
              ))}
            </span>
          </div>

          {/* Dashboard frame. */}
          <div className="hidden w-40 shrink-0 rounded-lg border border-border bg-card p-2.5 shadow-md sm:block">
            <span className={cn(bar, "h-1.5 w-1/2 bg-foreground/20")} />
            <span className="mt-2.5 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((tile) => (
                <span key={tile} className="h-6 rounded bg-foreground/[0.06]" />
              ))}
            </span>
            <span className="mt-2.5 flex h-12 items-end gap-1 rounded bg-foreground/[0.03] p-1.5">
              {[40, 65, 50, 80, 60, 95].map((height, index) => (
                <span key={index} className="flex-1 rounded-sm bg-p1/40" style={{ height: `${height}%` }} />
              ))}
            </span>
          </div>

          {/* A teammate's cursor and comment. */}
          <span className="absolute bottom-6 left-[38%] flex items-start gap-1">
            <MousePointer2Icon className="size-4 fill-brand text-brand" aria-hidden="true" />
            <span className="mt-3 rounded-md bg-brand px-1.5 py-0.5 text-[0.625rem] font-medium text-white">Priya</span>
          </span>
          <span className="absolute top-4 right-4 flex max-w-40 items-start gap-1.5 rounded-xl border border-border bg-card px-2.5 py-2 text-[0.6875rem] shadow-md">
            <MessageCircleIcon className="mt-px size-3.5 shrink-0 text-brand" aria-hidden="true" />
            Make the button full width?
          </span>
        </div>

        {/* Style panel. */}
        <div className="hidden border-l border-border p-3 text-[0.6875rem] sm:block">
          <p className="font-medium">Button</p>
          <p className="text-muted-foreground">Primary, large</p>
          <p className="mt-3 font-medium">Colours</p>
          <span className="mt-1.5 flex gap-1.5">
            {swatches.map((swatch) => (
              <span key={swatch} className={cn("size-4 rounded-full ring-1 ring-border", swatch)} />
            ))}
          </span>
          <p className="mt-3 font-medium">Text</p>
          <p className="text-muted-foreground">Google Sans, 16</p>
          <p className="mt-3 font-medium">Corners</p>
          <p className="text-muted-foreground">8 px</p>
        </div>
      </div>
    </Window>
  );
}
