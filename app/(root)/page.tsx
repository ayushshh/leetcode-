import { onBoardUser } from "@/modules/auth/actions";

import {
  Code2, Trophy, Users, Zap, ChevronRight, Play,
  Star, ArrowRight, Sparkles, Terminal, GitBranch, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


const features = [
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "Interactive Coding",
    description: "Write and run code in-browser with real-time execution and instant feedback.",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Track Progress",
    description: "Monitor your growth with detailed analytics, streaks, and achievement badges.",
    gradient: "from-violet-400 to-indigo-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    iconBg: "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Global Community",
    description: "Collaborate and compete with tens of thousands of developers worldwide.",
    gradient: "from-sky-400 to-cyan-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
    iconBg: "bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-time Feedback",
    description: "Get instant test-case results with detailed explanations and hints.",
    gradient: "from-emerald-400 to-green-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
  },
];

const stats = [
  { number: "50K+", label: "Problems Solved", icon: <Code2 className="w-5 h-5" /> },
  { number: "10K+", label: "Active Developers", icon: <Users className="w-5 h-5" /> },
  { number: "25+", label: "Languages", icon: <GitBranch className="w-5 h-5" /> },
  { number: "98%", label: "Success Rate", icon: <Star className="w-5 h-5" /> },
];

const categories = [
  {
    level: "Beginner",
    emoji: "🌱",
    title: "Easy",
    description: "Build confidence with approachable problems covering fundamental concepts.",
    count: 500,
    color: "green",
    gradient: "from-green-400 to-emerald-500",
    card: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 border-green-200 dark:border-green-800",
    badge: "bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300",
    btn: "border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40",
    bar: "bg-green-400",
  },
  {
    level: "Intermediate",
    emoji: "⚡",
    title: "Medium",
    description: "Sharpen your skills with data structures, algorithms, and design patterns.",
    count: 800,
    color: "amber",
    gradient: "from-amber-400 to-orange-500",
    card: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300",
    btn: "border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40",
    bar: "bg-amber-400",
  },
  {
    level: "Advanced",
    emoji: "🔥",
    title: "Hard",
    description: "Master complex algorithms and tackle problems from top tech interviews.",
    count: 300,
    color: "red",
    gradient: "from-red-400 to-rose-500",
    card: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/40 dark:to-rose-950/40 border-red-200 dark:border-red-800",
    badge: "bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300",
    btn: "border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40",
    bar: "bg-red-400",
  },
];

export default async function Home() {
  await onBoardUser();
  return (
    <div className="min-h-screen mt-16 overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex flex-col justify-center items-center px-4 pt-16 text-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-indigo-50/60 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 -z-10" />
        {/* Blobs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-300/25 dark:bg-amber-500/8 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-300/25 dark:bg-indigo-500/8 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-200/15 dark:bg-violet-500/5 rounded-full blur-[80px] -z-10" />

        <div className="max-w-5xl mx-auto">
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 rounded-full px-5 py-2 text-sm font-medium shadow-sm mb-10">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
            Join 10,000+ developers already coding
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="text-gray-900 dark:text-white">Level up your</span>
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent">
                coding skills
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Practice with real interview questions, get instant feedback, and
            join a global community of developers.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/problems">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg shadow-amber-200/60 dark:shadow-amber-900/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-bold px-8 h-13 text-base rounded-xl"
              >
                <Play className="w-5 h-5 mr-2 fill-white" />
                Start Coding Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/problems">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm font-bold px-8 h-13 text-base rounded-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Browse Problems
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>

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

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 bg-gray-50/80 dark:bg-neutral-900/40 border-y border-gray-100 dark:border-neutral-800/60">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-4 bg-amber-100 dark:bg-amber-900/40 px-4 py-1.5 rounded-full">
              Platform Features
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight">
              Built for{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                serious learners
              </span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Everything you need to go from beginner to pro, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl border p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${f.bg} ${f.border}`}
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${f.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM CATEGORIES ───────────────────────────────────────────── */}
      <section id="problems" className="py-28 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-4 bg-indigo-100 dark:bg-indigo-900/40 px-4 py-1.5 rounded-full">
              Problem Library
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight">
              Pick your{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                challenge
              </span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Structured difficulty tracks to match where you are right now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl border-2 p-7 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${cat.card}`}
              >
                {/* Emoji + level */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{cat.emoji}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.badge}`}>
                    {cat.level}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                  {cat.title} Problems
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Progress-bar style count */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    <span>{cat.count}+ problems</span>
                    <span>Available now</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.bar} rounded-full`}
                      style={{ width: cat.count > 500 ? "80%" : cat.count > 300 ? "50%" : "30%" }}
                    />
                  </div>
                </div>

                <Link href="/problems">
                  <Button
                    variant="outline"
                    className={`w-full font-semibold rounded-xl border-2 transition-all ${cat.btn}`}
                  >
                    Explore {cat.title}
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 dark:from-amber-600 dark:via-orange-600 dark:to-indigo-700" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          />
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-white/5 rounded-full blur-xl" />

          <div className="relative text-center px-8 py-20">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm font-medium mb-8 border border-white/30">
              <Layers className="w-4 h-4" />
              1,600+ problems waiting for you
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-sm">
              Start your coding
              <br />
              journey today
            </h2>
            <p className="text-lg text-white/85 mb-10 max-w-lg mx-auto font-medium">
              Free forever. No credit card required. Just you and the problems.
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