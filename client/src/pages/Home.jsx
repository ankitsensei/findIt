import React from "react";
import { NavLink } from "react-router";
import {
  Search,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ArrowLeftRight,
  Zap,
  Bell,
  ChevronDown,
} from "lucide-react";

/* ---------------------------------------------------------------------------
   Handmade atmosphere — faint pencil loops running off the page edges
--------------------------------------------------------------------------- */
const PencilLoops = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
  >
    <svg
      className="absolute -left-28 top-24 h-[460px] w-[340px]"
      viewBox="0 0 340 460"
      fill="none"
    >
      <path
        d="M-30 60 C 120 20, 250 90, 200 200 C 160 290, 30 300, 10 210 C -10 130, 90 110, 170 150 C 250 190, 330 270, 290 400"
        stroke="#78716c"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="46 16 70 12 38 20"
        opacity="0.08"
      />
    </svg>
    <svg
      className="absolute -right-28 top-[520px] h-[420px] w-[320px]"
      viewBox="0 0 320 420"
      fill="none"
    >
      <path
        d="M350 40 C 200 70, 90 160, 140 260 C 180 340, 300 330, 316 250 C 330 180, 240 150, 160 190 C 90 226, 20 300, 60 420"
        stroke="#78716c"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="40 14 60 10"
        opacity="0.08"
      />
    </svg>
  </div>
);

/* ---------------------------------------------------------------------------
   Ink character — leaning over the edge of the product stage
--------------------------------------------------------------------------- */
const StageFigure = () => (
  <svg
    viewBox="0 0 170 140"
    aria-hidden="true"
    className="pointer-events-none absolute -top-10 right-2 z-20 w-[104px] sm:-top-14 sm:right-8 sm:w-[136px]"
  >
    {/* dangling legs over the edge */}
    <path
      d="M104 84 C102 102 104 112 100 126"
      stroke="#1c1917"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M122 80 C126 98 130 110 128 128"
      stroke="#1c1917"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <ellipse cx="99" cy="129" rx="8" ry="4.5" fill="#1c1917" />
    <ellipse cx="128" cy="131" rx="8" ry="4.5" fill="#1c1917" />
    {/* torso, leaning in */}
    <path
      d="M88 42 C104 30 126 36 136 54 C144 70 142 84 132 90 C118 98 100 90 92 74 C86 60 82 48 88 42 Z"
      fill="#1c1917"
    />
    {/* beige sleeve reaching onto the stage */}
    <path
      d="M112 66 C118 78 124 88 132 96"
      stroke="#e5d5bd"
      strokeWidth="9"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M112 66 C118 78 124 88 132 96"
      stroke="#1c1917"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
      opacity="0.45"
    />
    <circle cx="133" cy="98" r="4.5" fill="#f3e7d6" stroke="#1c1917" strokeWidth="1.4" />
    {/* head tilted down toward the board */}
    <circle cx="80" cy="30" r="15" fill="#f3e7d6" stroke="#1c1917" strokeWidth="1.6" />
    <path
      d="M64 26 C62 12 76 4 88 10 C96 14 98 22 94 30 C86 22 74 22 64 26 Z"
      fill="#1c1917"
    />
    {/* round glasses */}
    <circle cx="74" cy="34" r="4.8" fill="none" stroke="#1c1917" strokeWidth="1.6" />
    <circle cx="85" cy="36" r="4.8" fill="none" stroke="#1c1917" strokeWidth="1.6" />
    <path d="M78.8 34.6 L80.2 35.2" stroke="#1c1917" strokeWidth="1.4" />
    {/* dry pencil hatching on the hoodie */}
    <path
      d="M116 52 l8 -6 M120 60 l9 -7 M124 68 l9 -7"
      stroke="#f5f5f4"
      strokeWidth="1.2"
      opacity="0.5"
    />
  </svg>
);

/* ---------------------------------------------------------------------------
   Ink scene — figure carrying a found box home, small pile behind
--------------------------------------------------------------------------- */
const InterludeScene = () => (
  <svg
    viewBox="0 0 640 240"
    aria-hidden="true"
    className="mx-auto w-full max-w-[620px] px-4"
  >
    {/* thin rising pencil curves behind the scene */}
    <path
      d="M40 216 C120 190 180 140 210 74"
      stroke="#3ba6f1"
      strokeWidth="1.6"
      fill="none"
      opacity="0.55"
    />
    <path
      d="M96 220 C170 200 230 160 258 100"
      stroke="#c4b5fd"
      strokeWidth="1.4"
      fill="none"
      opacity="0.6"
    />
    <path
      d="M20 208 C60 196 88 170 100 140"
      stroke="#d4a24e"
      strokeWidth="1.4"
      fill="none"
      opacity="0.6"
    />

    {/* pile of returned boxes */}
    <g transform="rotate(-3 150 208)">
      <rect x="106" y="188" width="72" height="42" rx="3" fill="#e5d5bd" stroke="#1c1917" strokeWidth="1.6" />
      <path d="M142 188 L142 230" stroke="#1c1917" strokeWidth="1.2" opacity="0.5" />
      <path d="M118 196 l10 -6" stroke="#1c1917" strokeWidth="1" opacity="0.3" />
    </g>
    <g transform="rotate(2 210 196)">
      <rect x="182" y="176" width="58" height="34" rx="3" fill="#f3e7d6" stroke="#1c1917" strokeWidth="1.6" />
      <path d="M211 176 L211 210" stroke="#1c1917" strokeWidth="1.2" opacity="0.5" />
    </g>

    {/* figure carrying a box home */}
    <g>
      <path d="M330 176 C328 196 326 210 322 224" stroke="#1c1917" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M348 174 C352 194 358 208 366 220" stroke="#1c1917" strokeWidth="7" strokeLinecap="round" fill="none" />
      <ellipse cx="320" cy="227" rx="8" ry="4.5" fill="#1c1917" />
      <ellipse cx="369" cy="223" rx="8" ry="4.5" fill="#1c1917" transform="rotate(18 369 223)" />
      <path
        d="M322 96 C338 92 352 100 356 118 C360 138 358 158 352 178 C336 184 322 178 316 164 C308 142 310 104 322 96 Z"
        fill="#1c1917"
      />
      <g transform="rotate(-2 344 140)">
        <rect x="306" y="116" width="76" height="50" rx="3" fill="#e5d5bd" stroke="#1c1917" strokeWidth="1.6" />
        <path d="M344 116 L344 166" stroke="#1c1917" strokeWidth="1.2" opacity="0.5" />
        <path d="M316 124 l12 -4 M316 130 l12 -4" stroke="#1c1917" strokeWidth="1" opacity="0.3" />
      </g>
      <path d="M330 108 C322 118 316 128 314 138" stroke="#e5d5bd" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M356 112 C362 122 366 132 368 142" stroke="#e5d5bd" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="336" cy="74" r="15" fill="#f3e7d6" stroke="#1c1917" strokeWidth="1.6" />
      <path
        d="M320 70 C318 54 334 48 346 54 C354 58 356 66 352 74 C344 66 332 66 320 70 Z"
        fill="#1c1917"
      />
      <path d="M348 52 l6 -8" stroke="#1c1917" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="330" cy="78" r="4.8" fill="none" stroke="#1c1917" strokeWidth="1.6" />
      <circle cx="342" cy="78" r="4.8" fill="none" stroke="#1c1917" strokeWidth="1.6" />
      <path d="M334.8 78 L337.2 78" stroke="#1c1917" strokeWidth="1.4" />
      <path d="M333 88 q4 3 8 0" stroke="#1c1917" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path
        d="M340 100 l8 -5 M344 110 l9 -6 M348 120 l9 -6"
        stroke="#f5f5f4"
        strokeWidth="1.1"
        opacity="0.45"
      />
    </g>
  </svg>
);

/* ---------------------------------------------------------------------------
   Ink vignette — figure waving up thin rising lines (blue, lavender, ochre)
--------------------------------------------------------------------------- */
const ClosingFigure = () => (
  <svg viewBox="0 0 380 250" aria-hidden="true" className="h-full w-full">
    <path d="M150 244 C 190 210 216 160 224 92" stroke="#3ba6f1" strokeWidth="1.8" fill="none" />
    <path d="M196 246 C 240 218 266 172 272 108" stroke="#c4b5fd" strokeWidth="1.6" fill="none" />
    <path d="M250 248 C 292 226 316 190 322 136" stroke="#d4a24e" strokeWidth="1.6" fill="none" />
    <circle cx="204" cy="180" r="3" fill="#3ba6f1" opacity="0.7" />
    <circle cx="220" cy="130" r="3" fill="#3ba6f1" opacity="0.5" />

    <g>
      <path d="M96 176 C94 196 92 210 90 226" stroke="#1c1917" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M112 174 C116 194 120 208 126 224" stroke="#1c1917" strokeWidth="7" strokeLinecap="round" fill="none" />
      <ellipse cx="88" cy="229" rx="8" ry="4.5" fill="#1c1917" />
      <ellipse cx="128" cy="227" rx="8" ry="4.5" fill="#1c1917" />
      <path
        d="M90 96 C106 92 120 100 124 118 C128 138 126 158 120 178 C104 184 92 178 86 164 C78 142 80 102 90 96 Z"
        fill="#1c1917"
      />
      <path d="M118 104 C128 96 140 88 152 82" stroke="#e5d5bd" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="154" cy="81" r="4.5" fill="#f3e7d6" stroke="#1c1917" strokeWidth="1.4" />
      <path d="M92 116 C86 126 82 136 82 146" stroke="#e5d5bd" strokeWidth="9" strokeLinecap="round" fill="none" />
      <g transform="rotate(-4 82 158)">
        <rect x="62" y="144" width="44" height="30" rx="3" fill="#e5d5bd" stroke="#1c1917" strokeWidth="1.6" />
        <path d="M84 144 L84 174" stroke="#1c1917" strokeWidth="1.1" opacity="0.5" />
      </g>
      <circle cx="102" cy="72" r="15" fill="#f3e7d6" stroke="#1c1917" strokeWidth="1.6" />
      <path
        d="M86 68 C84 52 100 46 112 52 C120 56 122 64 118 72 C110 64 98 64 86 68 Z"
        fill="#1c1917"
      />
      <circle cx="96" cy="76" r="4.8" fill="none" stroke="#1c1917" strokeWidth="1.6" />
      <circle cx="108" cy="76" r="4.8" fill="none" stroke="#1c1917" strokeWidth="1.6" />
      <path d="M100.8 76 L103.2 76" stroke="#1c1917" strokeWidth="1.4" />
      <path d="M97 86 q5 4 10 0" stroke="#1c1917" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path
        d="M106 102 l8 -5 M110 112 l9 -6 M114 122 l9 -6"
        stroke="#f5f5f4"
        strokeWidth="1.1"
        opacity="0.45"
      />
    </g>
  </svg>
);

/* ---------------------------------------------------------------------------
   Product stage — a quiet, believable view of the findIt board
--------------------------------------------------------------------------- */
const stageReports = [
  { name: "Blue water bottle", place: "Library, 2nd floor", kind: "lost", time: "12 min" },
  { name: "Set of keys, red fob", place: "North gate", kind: "found", time: "38 min" },
  { name: "Black umbrella", place: "Café Aurora", kind: "found", time: "1 hr" },
  { name: "Reading glasses", place: "Bus 14 stop", kind: "lost", time: "2 hrs" },
];

const sidebarItems = [
  ["All reports", "128", false],
  ["Lost", "64", false],
  ["Found", "57", false],
  ["Matches", "7", true],
  ["Map", null, false],
];

const ProductStage = () => (
  <div className="relative">
    <StageFigure />
    <div className="overflow-hidden rounded-lg border border-[rgba(214,211,209,0.3)] bg-soft-surface p-3 shadow-stage sm:p-5">
      <div className="overflow-hidden rounded-md border border-edge bg-card">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-edge px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-pale-ink" />
          <span className="h-2.5 w-2.5 rounded-full bg-pale-ink" />
          <span className="h-2.5 w-2.5 rounded-full bg-pale-ink" />
          <span className="ml-3 rounded-md bg-soft-surface px-2 py-0.5 text-[11px] text-muted">
            findit.app/reports
          </span>
        </div>

        <div className="grid md:grid-cols-[200px_1fr]">
          {/* sidebar */}
          <aside className="hidden flex-col border-r border-edge p-3 md:flex">
            <div className="mb-2 flex items-center gap-2 px-2 pt-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue text-[10px] font-bold text-on-blue">
                f
              </span>
              <span className="font-display text-[13px] text-ink">findIt board</span>
            </div>
            <div className="flex flex-col gap-0.5">
              {sidebarItems.map(([label, count, active]) => (
                <div
                  key={label}
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] ${
                    active ? "bg-blue-wash font-medium text-blue-ink" : "text-body"
                  }`}
                >
                  <span>{label}</span>
                  {count && <span className="text-[10px] text-muted">{count}</span>}
                </div>
              ))}
            </div>
            <div className="mt-16 flex items-center gap-2 rounded-md bg-soft-surface p-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pale-ink text-[9px] font-medium text-body">
                AK
              </span>
              <div>
                <div className="text-[11px] font-medium text-ink">Ankit</div>
                <div className="text-[9px] text-muted">2 open reports</div>
              </div>
            </div>
          </aside>

          {/* main panel */}
          <div className="grid gap-4 p-4 sm:grid-cols-[1fr_236px] sm:p-5">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium text-ink">This week around campus</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-surface px-2 py-0.5 text-[10px] text-body">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {stageReports.map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center gap-3 rounded-md border border-edge px-3 py-2"
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        r.kind === "lost" ? "bg-red-400" : "bg-emerald-500"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12px] font-medium text-ink">{r.name}</div>
                      <div className="truncate text-[10px] text-muted">{r.place}</div>
                    </div>
                    <span className="shrink-0 text-[10px] text-muted">{r.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* match card */}
            <div className="rounded-md border border-blue/25 bg-blue-wash/60 p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-ink">
                <Bell size={12} strokeWidth={2} />
                Match found
              </div>
              <div className="mt-2.5 space-y-1">
                <div className="rounded-md bg-card px-2.5 py-1.5 text-[11px] text-ink ring-1 ring-edge">
                  Lost · Blue water bottle
                </div>
                <div className="flex justify-center py-0.5">
                  <ChevronDown size={12} className="text-blue" strokeWidth={2.4} />
                </div>
                <div className="rounded-md bg-card px-2.5 py-1.5 text-[11px] text-ink ring-1 ring-edge">
                  Found · Bottle by the fountain
                </div>
              </div>
              <div className="mt-2.5 rounded-md bg-blue py-1.5 text-center text-[11px] font-medium text-on-blue">
                Say hello
              </div>
              <div className="mt-3 border-t border-blue/15 pt-2.5">
                <p className="text-[10px] text-body">Reports this week</p>
                <div className="mt-1.5 flex h-10 items-end gap-1">
                  {[35, 55, 40, 70, 52, 88, 64].map((h, i) => (
                    <span
                      key={i}
                      className="w-full rounded-sm bg-blue"
                      style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.35 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   Content
--------------------------------------------------------------------------- */
const largeFeatures = [
  {
    icon: Zap,
    title: "Report in seconds",
    tag: "Under a minute",
    body: "A photo, a sentence and a pin. That's a complete report — no account maze, no form longer than a sticky note.",
    link: { to: "/createlostitem", label: "Try a report" },
    fragment: "form",
  },
  {
    icon: ArrowLeftRight,
    title: "Match lost to found",
    tag: "Automatic",
    body: "Every new found report is checked against open lost reports. When two sides look like a pair, both people hear about it.",
    link: { to: "/foundit", label: "See found items" },
    fragment: "match",
  },
];

const smallFeatures = [
  {
    icon: Search,
    title: "Search everything",
    body: "Filter reports by name, description or place until the one you care about shows up.",
  },
  {
    icon: MapPin,
    title: "Pin the exact spot",
    body: "Every report carries a map pin, so helpers know where to look first.",
  },
  {
    icon: Users,
    title: "Community powered",
    body: "Reports are public. More eyes on the noticeboard means faster reunions.",
  },
];

const steps = [
  {
    number: "01",
    title: "Report your item",
    body: "Describe what you lost or found, upload a photo, and pin the location on the map.",
  },
  {
    number: "02",
    title: "We watch for matches",
    body: "Lost and found entries are continuously compared for likely pairs.",
  },
  {
    number: "03",
    title: "Reconnect & claim",
    body: "Get a nudge when something looks like yours, verify the details, and take it home.",
  },
];

const quotes = [
  {
    initial: "M",
    name: "Mira",
    role: "found a set of keys",
    before: "Posted a set of keys by the north gate before my coffee went cold. ",
    mark: "The owner messaged before lunch the same day.",
  },
  {
    initial: "D",
    name: "Dev",
    role: "got a bag back",
    before: "Reported my laptop bag on a Tuesday night, half-hoping. ",
    mark: "Someone had already posted it as found.",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Home", to: "/" },
      { label: "Lost items", to: "/lostit" },
      { label: "Found items", to: "/foundit" },
    ],
  },
  {
    title: "Your reports",
    links: [
      { label: "Lost by me", to: "/mylosts" },
      { label: "Found by me", to: "/myfounds" },
      { label: "Report a loss", to: "/createlostitem" },
      { label: "Report a find", to: "/createfounditem" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", to: "/signin" },
      { label: "Create account", to: "/signup" },
      { label: "Your profile", to: "/profile" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "How it works", to: "/#how-it-works" },
      { label: "Why findIt", to: "/#why-findit" },
    ],
  },
];

/* Fragments clipped inside the large feature cards */
const ReportFormFragment = () => (
  <div className="absolute inset-x-8 -bottom-10 -rotate-1 rounded-md border border-edge bg-card p-4 shadow-card">
    <div className="space-y-3">
      <div>
        <p className="text-[11px] font-medium text-ink">Item name</p>
        <div className="mt-1 rounded-md bg-soft-surface px-2.5 py-1.5 text-[12px] text-body">
          Blue water bottle
        </div>
      </div>
      <div>
        <p className="text-[11px] font-medium text-ink">Where last seen</p>
        <div className="mt-1 flex items-center gap-1.5 rounded-md bg-soft-surface px-2.5 py-1.5 text-[12px] text-body">
          <MapPin size={11} strokeWidth={2} className="shrink-0 text-blue" />
          Library, 2nd floor
        </div>
      </div>
      <div className="rounded-md bg-blue py-1.5 text-center text-[11px] font-medium text-on-blue">
        Post report
      </div>
    </div>
  </div>
);

const MatchFragment = () => (
  <div className="absolute inset-x-8 -bottom-8 rotate-1 rounded-md border border-edge bg-card p-4 shadow-card">
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-ink">
      <Bell size={12} strokeWidth={2} />
      Possible match
    </div>
    <div className="mt-2 space-y-1.5">
      <div className="rounded-md bg-soft-surface px-2.5 py-1.5 text-[11px] text-body">
        Lost · Black backpack
      </div>
      <div className="rounded-md bg-soft-surface px-2.5 py-1.5 text-[11px] text-body">
        Found · Backpack by the north gate
      </div>
    </div>
    <div className="mt-2 flex items-center justify-between">
      <span className="text-[10px] text-muted">Matched 2 minutes ago</span>
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue">
        View pair <ArrowUpRight size={11} strokeWidth={2.4} />
      </span>
    </div>
  </div>
);

/* ---------------------------------------------------------------------------
   Page
--------------------------------------------------------------------------- */
const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas pt-[52px]">
      <PencilLoops />

      <main className="relative">
        {/* --- First screen: highlighted promise + product stage --- */}
        <section
          id="top"
          className="mx-auto max-w-[1024px] scroll-mt-16 px-4 pt-16 sm:px-6 md:pt-24"
        >
          <h1 className="type-display max-w-[780px]">
            Lost it? <span className="mark-wash">Found&nbsp;it?</span>
            <br className="hidden md:block" />{" "}
            <span>Post it. We&rsquo;ll match it.</span>
          </h1>

          <p className="type-lead mt-6 max-w-[680px] text-secondary">
            Report what you lost — or what you found — with a photo and a pin.
            findIt keeps watch over both boards and tells you when the two sides
            look like a pair.
          </p>

          <div className="mt-6 flex w-full max-w-[400px] flex-col gap-3 sm:flex-row sm:gap-4">
            <NavLink to="/createlostitem" className="btn-primary flex-1">
              Report a lost item
            </NavLink>
            <NavLink to="/createfounditem" className="btn-secondary flex-1">
              Report a found item
              <ArrowUpRight size={14} strokeWidth={2.2} />
            </NavLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={1.8} />
              Location based
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} strokeWidth={1.8} />
              Listed instantly
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} strokeWidth={1.8} />
              Free for everyone
            </span>
          </div>

          <div className="mt-12 md:mt-16">
            <ProductStage />
          </div>
        </section>

        {/* --- Capability mosaic --- */}
        <section
          id="why-findit"
          className="mx-auto max-w-[1024px] scroll-mt-16 px-4 py-24 sm:px-6 md:px-10"
        >
          <h2 className="type-heading max-w-[680px]">
            Everything you need{" "}
            <span className="text-pale-ink">to bring things home.</span>
          </h2>
          <div className="mt-4 grid gap-4 text-secondary md:grid-cols-[7fr_5fr] md:gap-10">
            <p className="type-body-lg">
              Every report is a small, complete record: what it is, where it was
              last seen, and a photo so nobody has to guess.
            </p>
            <p className="type-body-lg">
              Behind the scenes, findIt compares new found reports against open
              lost reports and flags the pairs worth a message.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {largeFeatures.map((f) => (
              <div key={f.title} className="card relative flex flex-col overflow-hidden p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <f.icon size={18} strokeWidth={2} className="shrink-0 text-blue" />
                    <h3 className="type-card-heading">{f.title}</h3>
                  </div>
                  <span className="tag">{f.tag}</span>
                </div>
                <p className="mt-3 max-w-[430px] text-sm leading-[23px] text-body">
                  {f.body}
                </p>
                <NavLink
                  to={f.link.to}
                  className="link-blue mt-2 inline-flex items-center gap-1 text-sm font-medium"
                >
                  {f.link.label}
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </NavLink>
                <div className="relative mt-8 h-[150px]">
                  {f.fragment === "form" ? <ReportFormFragment /> : <MatchFragment />}
                </div>
              </div>
            ))}
          </div>

          {/* proof, interrupting the grid */}
          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-y-8">
            {quotes.map((q) => (
              <figure key={q.name}>
                <blockquote className="type-body-lg text-body">
                  &ldquo;{q.before}
                  <span className="mark-quote">{q.mark}</span>&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-surface text-sm font-medium text-secondary">
                    {q.initial}
                  </span>
                  <span className="text-sm text-ink">
                    {q.name} <span className="text-muted">· {q.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {smallFeatures.map((f) => (
              <div key={f.title} className="card p-6">
                <f.icon size={18} strokeWidth={2} className="text-blue" />
                <h3 className="type-card-heading mt-3">{f.title}</h3>
                <p className="mt-2 text-sm leading-[23px] text-body">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- How it works --- */}
        <section
          id="how-it-works"
          className="mx-auto max-w-[1024px] scroll-mt-16 px-4 pb-24 sm:px-6 md:px-10"
        >
          <h2 className="type-heading max-w-[680px]">
            How it works{" "}
            <span className="text-pale-ink">from report to reunion.</span>
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.number} className="card p-6">
                <span className="font-display text-sm text-muted">{s.number}</span>
                <h3 className="type-card-heading mt-3">{s.title}</h3>
                <p className="mt-2 text-sm leading-[23px] text-body">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Illustrated action interlude --- */}
        <section className="relative mx-auto max-w-[1024px] px-4 pb-24 pt-4 sm:px-6 md:px-10">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 60"
            fill="none"
            className="absolute left-2 top-24 hidden w-20 opacity-60 lg:block"
          >
            <path d="M2 54 L96 12" stroke="#3ba6f1" strokeWidth="1.4" />
            <path d="M10 44 L86 8" stroke="#78716c" strokeWidth="1" opacity="0.4" />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 100 60"
            fill="none"
            className="absolute right-2 top-56 hidden w-20 opacity-60 lg:block"
          >
            <path d="M98 54 L4 12" stroke="#3ba6f1" strokeWidth="1.4" />
            <path d="M90 44 L14 8" stroke="#78716c" strokeWidth="1" opacity="0.4" />
          </svg>

          <InterludeScene />

          <div className="mx-auto mt-8 max-w-[720px] text-center">
            <h2 className="type-heading">Post one report. See matches in minutes.</h2>
            <p className="type-body-lg mt-4 text-secondary">
              Describe it once, pin the spot, and get on with your day. We&rsquo;ll
              watch the found board for you.
            </p>
            <div className="mx-auto mt-8 flex w-full max-w-[400px] flex-col gap-3 sm:flex-row sm:gap-4">
              <NavLink to="/createlostitem" className="btn-primary flex-1">
                Report a lost item
              </NavLink>
              <NavLink to="/createfounditem" className="btn-secondary flex-1">
                Report a found item
                <ArrowUpRight size={14} strokeWidth={2.2} />
              </NavLink>
            </div>
            <p className="mt-4 text-sm text-muted">
              Free to use · No credit card · Not even an ad
            </p>
          </div>
        </section>

        {/* --- Illustrated closing card --- */}
        <section className="mx-auto max-w-[1024px] px-4 pb-24 sm:px-6 md:px-10">
          <div className="card relative p-6 md:p-8">
            <div className="max-w-[560px]">
              <h2 className="type-heading">
                Every item deserves a way home.{" "}
                <span className="text-pale-ink">Help one along today.</span>
              </h2>
              <p className="type-body-lg mt-4 max-w-[520px] text-secondary">
                Browse what&rsquo;s already been posted, or add yours — it takes
                about a minute, and someone nearby is probably looking right now.
              </p>
              <div className="mt-6 flex w-full max-w-[400px] flex-col gap-3 sm:flex-row sm:gap-4">
                <NavLink to="/lostit" className="btn-primary flex-1">
                  Browse lost items
                </NavLink>
                <NavLink to="/foundit" className="btn-secondary flex-1">
                  Browse found items
                </NavLink>
              </div>
            </div>
            <div className="pointer-events-none absolute -top-8 bottom-6 right-4 hidden w-[320px] lg:block xl:right-8 xl:w-[360px]">
              <ClosingFigure />
            </div>
          </div>
        </section>

        {/* --- Open directory footer --- */}
        <footer className="mx-auto max-w-[1024px] px-4 pb-10 pt-8 sm:px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-6 md:gap-6">
            <div className="md:col-span-2">
              <NavLink to="/" className="inline-flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md ring-1 ring-edge">
                  <img
                    src="/logo.jpeg"
                    alt="findIt logo"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="font-display text-lg font-medium tracking-[-0.01em] text-ink">
                  findIt
                </span>
              </NavLink>
              <p className="mt-4 max-w-[250px] text-sm leading-[23px] text-body">
                Lost &amp; found for neighbours, campuses and café noticeboards.
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Matching live
              </p>
            </div>

            {footerColumns.map((col) => (
              <nav key={col.title}>
                <p className="text-sm font-medium text-ink">{col.title}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.to.startsWith("/#") ? (
                        <a
                          href={link.to.replace("/#", "#")}
                          className="text-sm text-body transition-colors hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <NavLink
                          to={link.to}
                          className="text-sm text-body transition-colors hover:text-ink"
                        >
                          {link.label}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-24 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} findIt</span>
            <span>No ads. No fees. Just stuff going home.</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
