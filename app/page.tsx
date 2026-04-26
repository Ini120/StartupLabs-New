"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Menu,
  X,
  Link as LinkIcon,
  ArrowUpDown,
  Briefcase,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import type { MetricKey } from "@/types";
import { STARTUPS } from "@/data/startups";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import FinanceTab from "@/components/FinanceTab";
import TeamTab from "@/components/TeamTab";
import VisualizationsTab from "@/components/VisualizationsTab";
import MilestonesTab from "@/components/MilestonesTab";
import StatusBadge from "@/components/StatusBadge";

type StartupKey = keyof typeof STARTUPS;

type DashboardTab =
  | "info"
  | "finance"
  | "visualizations"
  | "milestones"
  | "team";
type CompanyTab = "company" | "jobs" | "news";
type MobileSheet = "search" | "filters" | "top" | "menu" | null;

interface CompanyProfile {
  founded: string;
  batch: string;
  teamSize: string;
  location: string;
  website: string;
  about: string[];
  jobs: Array<{ title: string; location: string; type: string }>;
  news: Array<{ title: string; date: string; summary: string }>;
}

interface StartupMetadata {
  batch: string;
  industry: string;
}

const BATCH_OPTIONS = ["W24", "S23", "W23", "S22", "W22", "S21"];
const INDUSTRY_OPTIONS = [
  "SaaS",
  "Developer Tools",
  "AI/ML",
  "Logistics",
  "Fintech",
  "Climate Tech",
  "Audio AI",
];

const STARTUP_METADATA: Record<StartupKey, StartupMetadata> = {
  Vertex: { batch: "W24", industry: "SaaS" },
  Voxel: { batch: "S23", industry: "Developer Tools" },
  "Pulse.ai": { batch: "W23", industry: "AI/ML" },
  Kinetik: { batch: "S22", industry: "Logistics" },
  Nomad: { batch: "S21", industry: "Fintech" },
  Orbis: { batch: "W22", industry: "Climate Tech" },
  Synth: { batch: "S23", industry: "Audio AI" },
};

const TABS: Array<{ key: DashboardTab; label: string }> = [
  { key: "info", label: "Info" },
  { key: "finance", label: "Finance" },
  { key: "visualizations", label: "Visualizations" },
  { key: "milestones", label: "Milestones" },
  { key: "team", label: "Team" },
];

function getHealthScore(statuses: Array<"red" | "green" | "gray">) {
  const total = statuses.reduce((acc, status) => {
    if (status === "green") return acc + 1;
    if (status === "gray") return acc + 0.6;
    return acc + 0.2;
  }, 0);
  return Math.round((total / statuses.length) * 100);
}

function getHealthLabel(score: number) {
  if (score >= 75) return "Strong";
  if (score >= 50) return "Watch";
  return "At Risk";
}

function statusLabel(status: "red" | "green" | "gray") {
  if (status === "green") return "HEALTHY";
  if (status === "red") return "AT RISK";
  return "WATCH";
}

function parseCurrency(value: string) {
  return Number.parseFloat(value.replace(/[$,]/g, "")) || 0;
}

function getTopCompanies() {
  return Object.entries(STARTUPS)
    .map(([key, startup]) => ({
      key,
      startup,
      arr: parseCurrency(startup.financials.arr),
    }))
    .sort((left, right) => right.arr - left.arr)
    .slice(0, 4);
}

const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  Vertex: {
    founded: "2021",
    batch: "W24",
    teamSize: "34",
    location: "San Francisco, CA",
    website: "vertex.ai",
    about: [
      "Vertex was founded to help operations-heavy SaaS teams make faster product decisions using deeply contextual dashboards. The company started with a narrow focus on customer health scoring for enterprise accounts.",
      "After onboarding design partners across fintech and logistics, Vertex expanded its platform into a full decision layer, combining activity telemetry, revenue signals, and lifecycle risk models.",
      "Today, the team is focused on delivering reliable executive reporting and automated playbooks so growth and product teams can act on one source of truth.",
    ],
    jobs: [
      {
        title: "Senior Product Designer",
        location: "Remote (US)",
        type: "Full-time",
      },
      { title: "Enterprise AE", location: "New York, NY", type: "Full-time" },
      {
        title: "Staff Frontend Engineer",
        location: "San Francisco, CA",
        type: "Full-time",
      },
    ],
    news: [
      {
        title: "Vertex launches Dashboard V2",
        date: "Apr 12, 2026",
        summary: "New onboarding workflows reduced first-value time by 32%.",
      },
      {
        title: "Vertex opens NYC sales hub",
        date: "Mar 28, 2026",
        summary:
          "The team expanded go-to-market support for enterprise buyers.",
      },
    ],
  },
};

export default function Home() {
  const [activeStartup, setActiveStartup] = useState<StartupKey>("Vertex");
  const [activeMetric, setActiveMetric] = useState<MetricKey>("arr");
  const [activeTab, setActiveTab] = useState<DashboardTab>("info");
  const [activeCompanyTab, setActiveCompanyTab] =
    useState<CompanyTab>("company");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSheet, setMobileSheet] = useState<MobileSheet>(null);
  const [mobileSearch, setMobileSearch] = useState("");
  const [batchFilters, setBatchFilters] = useState<string[]>([]);
  const [industryFilters, setIndustryFilters] = useState<string[]>([]);
  const [mobileHidden, setMobileHidden] = useState(false);

  const startup = STARTUPS[activeStartup];
  const healthScore = getHealthScore(startup.kpis.map((item) => item.status));
  const profile = COMPANY_PROFILES[activeStartup] ?? COMPANY_PROFILES.Vertex;
  const startupMeta = STARTUP_METADATA[activeStartup];
  const topCompanies = useMemo(() => getTopCompanies(), []);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastY + 8;
      const goingUp = currentY < lastY - 8;
      if (goingDown) setMobileHidden(true);
      if (goingUp) setMobileHidden(false);
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileSheet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSheet]);

  const filteredSearchResults = useMemo(() => {
    const query = mobileSearch.trim().toLowerCase();
    return Object.entries(STARTUPS)
      .filter(([key, item]) => {
        const directoryInfo = STARTUP_METADATA[key as StartupKey];
        const matchesQuery =
          query.length === 0 ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          directoryInfo.industry.toLowerCase().includes(query);
        const matchesBatch =
          batchFilters.length === 0 || batchFilters.includes(directoryInfo.batch);
        const matchesIndustry =
          industryFilters.length === 0 ||
          industryFilters.includes(directoryInfo.industry);
        return matchesQuery && matchesBatch && matchesIndustry;
      })
      .map(([key, item]) => ({ key, item }));
  }, [batchFilters, industryFilters, mobileSearch]);

  function toggleValue(list: string[], value: string) {
    return list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
  }

  function closeSheets() {
    setMobileSheet(null);
  }

  function selectStartup(key: string) {
    setActiveStartup(key as StartupKey);
    setActiveTab("info");
    setActiveCompanyTab("company");
    closeSheets();
  }

  return (
    <div
      className="dashboard-shell min-h-screen bg-bg pb-22 text-slate-900 md:pb-0"
      data-sidebar-collapsed={sidebarCollapsed ? "true" : "false"}
    >
      <Sidebar
        activeStartup={activeStartup}
        setActiveStartup={setActiveStartup}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main className="min-h-screen min-w-0 bg-bg">
        <Topbar startup={startup} />

        <div className="space-y-6  p-6">
          <section className="rounded-2xl border border-border bg-card p-2">
            <nav className="flex flex-wrap items-center gap-2">
              {TABS.map((tab, index) => {
                const active = tab.key === activeTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-xl px-4 py-2 font-space text-[12px] font-semibold transition-all duration-150 ${active ? "bg-brand-accent text-white" : "text-brand-muted hover:bg-bg-3 hover:text-slate-900"}`}
                  >
                    {tab.label}
                    {index < TABS.length - 1 ? (
                      <span className="ml-3 text-brand-dim">||</span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </section>

          {activeTab === "info" ? (
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <article className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
                <header className="flex flex-col gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center border border-gray-200 bg-gray-100 font-syne text-lg font-extrabold text-slate-900 sm:h-12 sm:w-12">
                      {startup.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-syne text-2xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-3xl">
                        {startup.name}
                      </h2>
                      <p className="mt-1 font-space text-base text-gray-500 sm:text-lg">
                        {startup.description}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 sm:text-sm">
                    {profile.jobs.length} Jobs
                  </span>
                </header>

                <nav className="mt-4 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3 sm:gap-3">
                  {(["company", "jobs", "news"] as CompanyTab[]).map((tab) => {
                    const active = tab === activeCompanyTab;
                    const label = tab.charAt(0).toUpperCase() + tab.slice(1);
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveCompanyTab(tab)}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 ${active ? "bg-violet-100 text-violet-700" : "text-gray-600 hover:bg-gray-100"}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </nav>

                {activeCompanyTab === "company" ? (
                  <div className="mt-5 space-y-4">
                    <h3 className="font-syne text-2xl font-bold text-slate-900 sm:text-[32px]">
                      About
                    </h3>
                    {profile.about.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 28)}
                        className="text-base leading-relaxed text-gray-700 sm:text-[20px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}

                {activeCompanyTab === "jobs" ? (
                  <div className="mt-5 space-y-3">
                    <h3 className="font-syne text-2xl font-bold text-slate-900 sm:text-[32px]">
                      Open Roles
                    </h3>
                    {profile.jobs.map((job) => (
                      <div
                        key={`${job.title}-${job.location}`}
                        className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-syne text-base font-bold text-slate-900 sm:text-lg">
                            {job.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {job.location} · {job.type}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}

                {activeCompanyTab === "news" ? (
                  <div className="mt-5 space-y-3">
                    <h3 className="font-syne text-2xl font-bold text-slate-900 sm:text-[32px]">
                      What&apos;s New
                    </h3>
                    {profile.news.map((item) => (
                      <div
                        key={`${item.title}-${item.date}`}
                        className="rounded-xl border border-gray-200 p-4"
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                          <p className="font-syne text-base font-bold text-slate-900 sm:text-lg">
                            {item.title}
                          </p>
                          <span className="text-xs text-gray-500 sm:text-sm">
                            {item.date}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {item.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>

              <aside className="self-start rounded-2xl border border-gray-200 bg-white p-5 xl:sticky xl:top-6">
                <div>
                  <h2 className="font-syne text-2xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-[30px]">
                    {startup.name}
                  </h2>
                  <p className="mt-1 font-space text-base text-gray-500 sm:text-[20px]">
                    {startup.description}
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                    <span className="text-gray-500">Founded</span>
                    <span className="font-medium text-slate-900">
                      {profile.founded}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                    <span className="text-gray-500">Batch</span>
                    <span className="font-medium text-slate-900">
                      {profile.batch}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                    <span className="text-gray-500">Team Size</span>
                    <span className="font-medium text-slate-900">
                      {profile.teamSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium text-slate-900">
                      {profile.location}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[1px] text-gray-500">
                    Website
                  </p>
                  <a
                    href={`https://${profile.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:text-violet-800"
                  >
                    <LinkIcon size={14} />
                    {profile.website}
                  </a>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[1px] text-gray-500">
                    Social
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="LinkedIn"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-gray-600 transition-colors duration-150 hover:bg-brand-accent hover:text-white"
                    >
                      <span className="text-[10px] font-semibold">in</span>
                    </button>
                    <button
                      type="button"
                      aria-label="X"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-gray-600 transition-colors duration-150 hover:bg-brand-accent hover:text-white"
                    >
                      <span className="text-[11px] font-semibold">X</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Crunchbase"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-gray-600 transition-colors duration-150 hover:bg-brand-accent hover:text-white"
                    >
                      <span className="text-[10px] font-semibold">CB</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <StatusBadge
                    status={startup.status}
                    label={statusLabel(startup.status)}
                  />
                  <p className="mt-2 font-space text-xs text-brand-muted">
                    Health score {healthScore}/100 ·{" "}
                    {getHealthLabel(healthScore)}
                  </p>
                </div>
              </aside>
            </section>
          ) : null}

          {activeTab === "finance" ? <FinanceTab startup={startup} /> : null}

          {activeTab === "visualizations" ? (
            <VisualizationsTab
              startup={startup}
              activeMetric={activeMetric}
              setActiveMetric={setActiveMetric}
            />
          ) : null}

          {activeTab === "milestones" ? (
            <MilestonesTab startup={startup} />
          ) : null}

          {activeTab === "team" ? <TeamTab startup={startup} /> : null}

          <div className="h-6" aria-hidden>
            <div className="h-full" />
          </div>
        </div>
      </main>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/80 pb-[calc(env(safe-area-inset-bottom)+12px)] backdrop-blur-[10px] transition-transform duration-200 md:hidden ${mobileHidden ? 'translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex max-w-105 items-center justify-between px-4 pt-3">
          <button
            type="button"
            onClick={() => setMobileSheet('search')}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-gray-600 transition-colors duration-150 hover:text-brand-accent"
            aria-label="Search startups"
          >
            <Search size={20} />
            <span className="text-[10px] font-medium">Search</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileSheet('filters')}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-gray-600 transition-colors duration-150 hover:text-brand-accent"
            aria-label="Open filters"
          >
            <SlidersHorizontal size={20} />
            <span className="text-[10px] font-medium">Filter</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileSheet('top')}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-gray-600 transition-colors duration-150 hover:text-brand-accent"
            aria-label="Top companies"
          >
            <Sparkles size={20} />
            <span className="text-[10px] font-medium">Top</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileSheet('menu')}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-gray-600 transition-colors duration-150 hover:text-brand-accent"
            aria-label="More options"
          >
            <Menu size={20} />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </div>

      {mobileSheet === 'search' ? (
        <div className="fixed inset-0 z-50 bg-white/95 p-4 md:hidden">
          <div className="mx-auto flex h-full max-w-105 flex-col rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-syne text-lg font-bold text-slate-900">Search Startups</h3>
              <button onClick={closeSheets} className="rounded-full border border-gray-200 p-2" aria-label="Close search">
                <X size={18} />
              </button>
            </div>
            <input
              autoFocus
              value={mobileSearch}
              onChange={(event) => setMobileSearch(event.target.value)}
              placeholder="Search companies"
              className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-brand-accent"
            />
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-gray-500">
              <span className="rounded-full border border-gray-200 px-3 py-1">Batch: {startupMeta.batch}</span>
              <span className="rounded-full border border-gray-200 px-3 py-1">Industry: {startupMeta.industry}</span>
            </div>
            <div className="mt-4 flex-1 overflow-y-auto space-y-2">
              {filteredSearchResults.map(({ key, item }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectStartup(key)}
                  className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-left"
                >
                  <p className="font-syne text-base font-bold text-slate-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {mobileSheet === 'filters' ? (
        <div className="fixed inset-0 z-50 bg-black/20 md:hidden" onClick={closeSheets}>
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-[28px] border border-gray-200 bg-white p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
            <div className="flex items-center justify-between">
              <h3 className="font-syne text-lg font-bold text-slate-900">Filters</h3>
              <button onClick={closeSheets} className="rounded-full border border-gray-200 p-2" aria-label="Close filters">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[1px] text-gray-500">Batch</p>
                <div className="grid grid-cols-2 gap-2">
                  {BATCH_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700">
                      <input type="checkbox" checked={batchFilters.includes(option)} onChange={() => setBatchFilters((prev) => toggleValue(prev, option))} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[1px] text-gray-500">Industry</p>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRY_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700">
                      <input type="checkbox" checked={industryFilters.includes(option)} onChange={() => setIndustryFilters((prev) => toggleValue(prev, option))} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mobileSheet === 'top' ? (
        <div className="fixed inset-0 z-50 bg-black/20 md:hidden" onClick={closeSheets}>
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-[28px] border border-gray-200 bg-white p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
            <div className="flex items-center justify-between">
              <h3 className="font-syne text-lg font-bold text-slate-900">Top Companies</h3>
              <button onClick={closeSheets} className="rounded-full border border-gray-200 p-2" aria-label="Close top companies">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {topCompanies.map(({ key, startup }) => (
                <button key={key} type="button" onClick={() => selectStartup(key)} className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left">
                  <div>
                    <p className="font-syne text-base font-bold text-slate-900">{startup.name}</p>
                    <p className="text-sm text-gray-500">{startup.sector}</p>
                  </div>
                  <ArrowUpDown size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {mobileSheet === 'menu' ? (
        <div className="fixed inset-0 z-50 bg-black/20 md:hidden" onClick={closeSheets}>
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-[28px] border border-gray-200 bg-white p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
            <div className="flex items-center justify-between">
              <h3 className="font-syne text-lg font-bold text-slate-900">More</h3>
              <button onClick={closeSheets} className="rounded-full border border-gray-200 p-2" aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <button type="button" onClick={() => { setActiveTab('info'); setActiveCompanyTab('jobs'); closeSheets(); }} className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-left"><Briefcase size={18} className="text-gray-500" /> Jobs</button>
              <button type="button" onClick={() => { setActiveTab('info'); setActiveCompanyTab('news'); closeSheets(); }} className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-left"><Newspaper size={18} className="text-gray-500" /> News</button>
              <button type="button" onClick={() => closeSheets()} className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-left"><Settings size={18} className="text-gray-500" /> Settings</button>
              <button type="button" onClick={() => { setActiveTab('team'); closeSheets(); }} className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-left"><Users size={18} className="text-gray-500" /> Team Info</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
