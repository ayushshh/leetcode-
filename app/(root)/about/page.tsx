import {
  Code2,
  Users,
  Zap,
  Shield,
  GitBranch,
  Terminal,
  Trophy,
  BookOpen,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  Cpu,
  BarChart3,
  Layers,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { number: "1,600+", label: "Curated Problems", icon: <Code2 className="w-5 h-5" /> },
  { number: "10K+",   label: "Active Learners",  icon: <Users className="w-5 h-5" /> },
  { number: "25+",    label: "Languages",         icon: <GitBranch className="w-5 h-5" /> },
  { number: "98%",    label: "Satisfaction",      icon: <Heart className="w-5 h-5" /> },
];

const values = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Learn by Doing",
    description:
      "Real understanding comes from solving real problems. We put execution before explanation — every concept is reinforced with hands-on challenges.",
    gradient: "from-violet-400 to-indigo-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    iconBg: "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Open & Accessible",
    description:
      "World-class coding practice shouldn't be paywalled. Our core platform is free forever — no credit card, no catch.",
    gradient: "from-sky-400 to-cyan-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
    iconBg: "bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Feedback",
    description:
      "No more waiting. Submit code and see results in milliseconds, backed by our Judge0-powered distributed execution engine.",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safe Sandbox",
    description:
      "Every submission runs in an isolated, resource-limited container. Your code is safe, and so is everyone else's.",
    gradient: "from-emerald-400 to-green-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
  },
];

const techStack = [
  { name: "Next.js 15",    category: "Framework",   color: "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" },
  { name: "TypeScript",    category: "Language",    color: "bg-blue-600 text-white" },
  { name: "Prisma",        category: "ORM",         color: "bg-indigo-600 text-white" },
  { name: "PostgreSQL",    category: "Database",    color: "bg-sky-600 text-white" },
  { name: "Judge0",        category: "Execution",   color: "bg-amber-500 text-white" },
  { name: "Clerk",         category: "Auth",        color: "bg-violet-600 text-white" },
  { name: "Tailwind CSS",  category: "Styling",     color: "bg-cyan-500 text-white" },
  { name: "Zustand",       category: "State",       color: "bg-orange-500 text-white" },
];

const features = [
  { icon: <Terminal className="w-5 h-5" />,  text: "In-browser code editor with Monaco" },
  { icon: <BarChart3 className="w-5 h-5" />, text: "Detailed submission history & analytics" },
  { icon: <BookOpen className="w-5 h-5" />,  text: "Curated problem playlists" },
  { icon: <Trophy className="w-5 h-5" />,    text: "Progress tracking & solved-problem archive" },
  { icon: <Cpu className="w-5 h-5" />,       text: "Multi-language execution sandbox" },
  { icon: <Layers className="w-5 h-5" />,    text: "Admin panel for problem management" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen mt-16 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex flex-col justify-center items-center px-4 pt-16 pb-24 text-center overflow-hidden">
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-indigo-50/60 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 -z-10" />
        {/* Blobs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-300/25 dark:bg-amber-500/8 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-300/25 dark:bg-indigo-500/8 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-200/15 dark:bg-violet-500/5 rounded-full blur-[80px] -z-10" />

        <div className="max-w-4xl mx-auto">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 rounded-full px-5 py-2 text-sm font-medium shadow-sm mb-10">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
            Built for developers, by developers
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-8">
            <span className="text-gray-900 dark:text-white">We&apos;re on a mission to</span>
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent">
              democratize coding
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
            CodeArena is a full-stack coding practice platform built to give every
            developer — regardless of background — access to interview-grade problem
            solving with real execution feedback.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-center gap-1.5 text-amber-500 dark:text-amber-400 mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-4 bg-amber-100 dark:bg-amber-900/40 px-4 py-1.5 rounded-full">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                From a side project to a{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  full platform
                </span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  CodeArena started as a personal learning project — the kind of
                  &quot;let me just build this for myself&quot; weekend idea that grew into
                  something much bigger. Frustrated by platforms that hid features
                  behind paywalls, we wanted a fully open, self-hostable alternative.
                </p>
                <p>
                  We integrated a full Judge0-powered code execution sandbox, a Monaco
                  editor experience, detailed submission history, and admin tooling for
                  problem management. What began as boilerplate became a serious,
                  production-grade platform.
                </p>
                <p>
                  Today, CodeArena serves thousands of developers who want an honest,
                  feedback-rich environment to prepare for technical interviews and
                  sharpen their algorithmic thinking.
                </p>
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="relative rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 p-1 shadow-2xl shadow-amber-200/40 dark:shadow-amber-900/30">
                <div className="rounded-[calc(1.5rem-4px)] bg-gray-950 p-8">
                  {/* Fake code editor */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-3 text-xs text-gray-500 font-mono">two-sum.ts</span>
                  </div>
                  <pre className="text-sm font-mono leading-relaxed">
                    <span className="text-violet-400">function </span>
                    <span className="text-amber-300">twoSum</span>
                    <span className="text-gray-300">(</span>
                    <span className="text-sky-300">nums</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-emerald-300">number[]</span>
                    <span className="text-gray-300">, </span>
                    <span className="text-sky-300">target</span>
                    <span className="text-gray-300">: </span>
                    <span className="text-emerald-300">number</span>
                    <span className="text-gray-300">): </span>
                    <span className="text-emerald-300">number[]</span>
                    <span className="text-gray-300"> {`{`}</span>
                    {"\n"}
                    <span className="text-gray-300">{"  "}</span>
                    <span className="text-violet-400">const </span>
                    <span className="text-sky-300">map </span>
                    <span className="text-gray-300">= </span>
                    <span className="text-violet-400">new </span>
                    <span className="text-amber-300">Map</span>
                    <span className="text-gray-300">();</span>
                    {"\n"}
                    <span className="text-gray-300">{"  "}</span>
                    <span className="text-violet-400">for </span>
                    <span className="text-gray-300">(</span>
                    <span className="text-violet-400">let </span>
                    <span className="text-sky-300">i </span>
                    <span className="text-gray-300">= </span>
                    <span className="text-orange-300">0</span>
                    <span className="text-gray-300">; i &lt; nums.length; i++) {`{`}</span>
                    {"\n"}
                    <span className="text-gray-300">{"    "}</span>
                    <span className="text-violet-400">const </span>
                    <span className="text-sky-300">comp </span>
                    <span className="text-gray-300">= target - nums[i];</span>
                    {"\n"}
                    <span className="text-gray-300">{"    "}</span>
                    <span className="text-violet-400">if </span>
                    <span className="text-gray-300">(map.</span>
                    <span className="text-amber-300">has</span>
                    <span className="text-gray-300">(comp)) </span>
                    <span className="text-violet-400">return </span>
                    <span className="text-gray-300">[map.</span>
                    <span className="text-amber-300">get</span>
                    <span className="text-gray-300">(comp), i];</span>
                    {"\n"}
                    <span className="text-gray-300">{"    "}map.</span>
                    <span className="text-amber-300">set</span>
                    <span className="text-gray-300">(nums[i], i);</span>
                    {"\n"}
                    <span className="text-gray-300">{"  }{}"}</span>
                    {"\n"}
                    <span className="text-gray-300">{"  "}</span>
                    <span className="text-violet-400">return </span>
                    <span className="text-gray-300">[];</span>
                    {"\n"}
                    <span className="text-gray-300">{`}`}</span>
                  </pre>
                  {/* Result badge */}
                  <div className="mt-6 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-semibold">All test cases passed · 68ms · 42 KB</span>
                  </div>
                </div>
              </div>
              {/* Floating decorations */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-50/80 dark:bg-neutral-900/40 border-y border-gray-100 dark:border-neutral-800/60">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-4 bg-amber-100 dark:bg-amber-900/40 px-4 py-1.5 rounded-full">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight">
              Our core{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                values
              </span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Every decision we make as a team is guided by these four principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl border p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${v.bg} ${v.border}`}
              >
                <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${v.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${v.iconBg}`}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES LIST ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Feature checklist */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-4 bg-indigo-100 dark:bg-indigo-900/40 px-4 py-1.5 rounded-full">
                Platform Capabilities
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
                Everything you need,{" "}
                <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  nothing you don&apos;t
                </span>
              </h2>
              <ul className="space-y-4">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                      {f.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-4 bg-emerald-100 dark:bg-emerald-900/40 px-4 py-1.5 rounded-full">
                Tech Stack
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
                Built with{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  modern tools
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${t.color}`}>
                      {t.category}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 dark:from-amber-600 dark:via-orange-600 dark:to-indigo-700" />
          {/* Noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          />
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />

          <div className="relative text-center px-8 py-20">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4" />
              Ready to level up?
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-sm">
              Start solving problems
              <br />
              today — for free
            </h2>
            <p className="text-lg text-white/85 mb-10 max-w-lg mx-auto font-medium">
              No credit card. No paywall. Just you, the editor, and 1,600+ problems waiting to be solved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/problems">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-50 font-black px-10 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 rounded-xl text-base"
                >
                  Get Started — It&apos;s Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/problems">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm font-bold px-8 rounded-xl text-base"
                >
                  Browse Problems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
