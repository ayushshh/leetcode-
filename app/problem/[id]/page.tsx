"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Editor } from "@monaco-editor/react";
import Link from "next/link";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Send,
  Code2,
  FileText,
  Lightbulb,
  Trophy,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Terminal,
  BookOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getJudgeZeroId } from "@/lib/judge0";
import { getProblemById, executeCode } from "@/modules/problems/actions";
import { SubmissionDetails } from "@/modules/problems/components/submission-details";
import { SubmissionHistory } from "@/modules/problems/components/submission-history";

/* ─── helpers ─────────────────────────────────────────────────── */

const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; cls: string; dot: string }
> = {
  EASY: {
    label: "Easy",
    cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  MEDIUM: {
    label: "Medium",
    cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  HARD: {
    label: "Hard",
    cls: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
  },
};

const LANGUAGE_LABELS: Record<string, string> = {
  JAVASCRIPT: "JavaScript",
  PYTHON: "Python",
  JAVA: "Java",
};

const MONACO_LANG: Record<string, string> = {
  JAVASCRIPT: "javascript",
  PYTHON: "python",
  JAVA: "java",
};

/* ─── page component ───────────────────────────────────────────── */

const ProblemIdPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [problem, setProblem] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState<any[]>([]);
  const [executionResponse, setExecutionResponse] = useState<any>(null);
  const { theme } = useTheme();

  /* fetch problem */
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const resolvedParams = await params;
        const problemData = await getProblemById(resolvedParams.id);
        if (problemData.success) {
          setProblem(problemData.data);
          const snippets = problemData.data?.codeSnippets as Record<string, string> | null;
          setCode(snippets?.[selectedLanguage] || "");
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, [params]);

  /* swap snippet on language change */
  useEffect(() => {
    if (problem && problem.codeSnippets?.[selectedLanguage]) {
      setCode(problem.codeSnippets[selectedLanguage]);
    }
  }, [selectedLanguage, problem]);

  /* loading */
  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0E1015]">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-[3px] border-zinc-800 border-t-amber-500 animate-spin" />
          <Code2 className="absolute w-5 h-5 text-amber-500/80 animate-pulse" />
        </div>
        <p className="mt-6 text-sm font-medium text-zinc-500 animate-pulse tracking-wide">
          Preparing workspace...
        </p>
      </div>
    );
  }

  /* handlers */
  const handleRun = async () => {
    setIsRunning(true);
    try {
      const languageId = getJudgeZeroId(selectedLanguage);
      if (!languageId) {
        toast.error("Unsupported language");
        return;
      }
      const stdin = problem.testCases.map((tc: any) => tc.input);
      const expected = problem.testCases.map((tc: any) => tc.output);
      const result = await executeCode(code, languageId, stdin, expected, problem.id);
      if (result.success) {
        setExecutionResponse(result.submission);
        setSubmissionHistory((prev) => [result.submission, ...prev]);
        toast.success("Execution successful! 🎉");
      } else {
        toast.error(result.error || "Execution failed");
      }
    } catch {
      toast.error("Unexpected error during execution");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const languageId = getJudgeZeroId(selectedLanguage);
      if (!languageId) {
        toast.error("Unsupported language");
        return;
      }
      const stdin = problem.testCases.map((tc: any) => tc.input);
      const expected = problem.testCases.map((tc: any) => tc.output);
      const result = await executeCode(code, languageId, stdin, expected, problem.id);
      if (result.success) {
        setExecutionResponse(result.submission);
        setSubmissionHistory((prev) => [result.submission, ...prev]);
        if (result.submission?.status === "accepted") {
          toast.success("Accepted! 🎉");
        } else {
          toast.error("Wrong Answer — check your solution.");
        }
      } else {
        toast.error(result.error || "Submission failed");
      }
    } catch {
      toast.error("Unexpected error during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const diff = DIFFICULTY_CONFIG[problem?.difficulty] ?? DIFFICULTY_CONFIG.EASY;
  const examples = problem?.examples as Record<string, any> | null;
  const currentExample = examples?.[selectedLanguage];

  /* ── JSX ─────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col h-screen bg-[#0E1015] text-zinc-200 overflow-hidden selection:bg-amber-500/30">
      {/* ── Top Nav ── */}
      <header className="flex-none flex items-center justify-between px-6 h-14 border-b border-zinc-800/80 bg-[#0E1015] z-20">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>

          <div className="flex items-center gap-4 min-w-0">
            <h1 className="text-[15px] font-semibold text-zinc-100 truncate tracking-tight">
              {problem?.title}
            </h1>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium border",
                diff.cls
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full shadow-sm", diff.dot)} />
              {diff.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </header>

      {/* ── Main Split ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT PANEL (Problem Context) ── */}
        <div className="w-[45%] flex flex-col border-r border-zinc-800/80 bg-[#12141A]">
          <Tabs defaultValue="description" className="flex flex-col h-full">
            <TabsList className="flex-none flex justify-start gap-1 rounded-none bg-transparent border-b border-zinc-800/80 px-4 h-12">
              {[
                { value: "description", icon: <FileText className="w-4 h-4" />, label: "Description" },
                { value: "editorial", icon: <BookOpen className="w-4 h-4" />, label: "Editorial" },
                { value: "hints", icon: <Lightbulb className="w-4 h-4" />, label: "Hints" },
                { value: "submissions", icon: <Trophy className="w-4 h-4" />, label: "Submissions" },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="flex items-center gap-2 rounded-t-lg rounded-b-none px-4 h-full text-xs font-medium text-zinc-500
                    data-[state=active]:text-zinc-100 data-[state=active]:bg-zinc-800/40 
                    hover:text-zinc-300 hover:bg-zinc-800/20 transition-all border-b-2 border-transparent data-[state=active]:border-amber-500"
                >
                  {t.icon}
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description" className="flex-1 overflow-hidden m-0">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-8">
                  {/* Tags */}
                  {problem?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-md text-[11px] font-medium bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800 transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Prose */}
                  <div className="prose prose-invert prose-zinc max-w-none">
                    <p className="text-zinc-300 leading-relaxed text-[14px]">
                      {problem?.description}
                    </p>
                  </div>

                  {/* Example */}
                  {currentExample && (
                    <div className="space-y-3">
                      <h3 className="text-[13px] font-semibold text-zinc-200 flex items-center gap-2">
                        Example
                      </h3>
                      <div className="rounded-lg border border-zinc-800/80 bg-[#0E1015] overflow-hidden">
                        <div className="p-4 space-y-3 text-[13px] font-mono">
                          <div className="flex flex-col gap-1">
                            <span className="text-zinc-500 select-none text-[11px] uppercase tracking-wider font-sans font-medium">Input</span>
                            <code className="text-zinc-200 break-all bg-zinc-800/30 px-2 py-1 rounded">{currentExample.input}</code>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-zinc-500 select-none text-[11px] uppercase tracking-wider font-sans font-medium">Output</span>
                            <code className="text-amber-400 break-all bg-amber-500/10 px-2 py-1 rounded">{currentExample.output}</code>
                          </div>
                          {currentExample.explanation && (
                            <div className="flex flex-col gap-1 pt-2 border-t border-zinc-800/50">
                              <span className="text-zinc-500 select-none text-[11px] uppercase tracking-wider font-sans font-medium">Explanation</span>
                              <span className="text-zinc-400 font-sans leading-relaxed">{currentExample.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Constraints */}
                  {problem?.constraints && (
                    <div className="space-y-3">
                      <h3 className="text-[13px] font-semibold text-zinc-200 flex items-center gap-2">
                        Constraints
                      </h3>
                      <div className="rounded-lg border border-zinc-800/80 bg-[#0E1015] p-4">
                        <pre className="text-[13px] text-emerald-400/90 whitespace-pre-wrap font-mono leading-relaxed">
                          {problem.constraints}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="editorial" className="flex-1 overflow-hidden m-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  {problem.editorial ? (
                    <p className="text-[14px] text-zinc-300 leading-relaxed">{problem.editorial}</p>
                  ) : (
                    <EmptyState icon={<BookOpen className="w-10 h-10" />} label="Editorial not available yet" />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="hints" className="flex-1 overflow-hidden m-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  {problem.hints ? (
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 shadow-sm">
                      <div className="flex gap-3 items-start">
                        <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-[14px] text-zinc-300 leading-relaxed">{problem.hints}</p>
                      </div>
                    </div>
                  ) : (
                    <EmptyState icon={<Lightbulb className="w-10 h-10" />} label="No hints available" />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="submissions" className="flex-1 overflow-hidden m-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <SubmissionHistory submissions={submissionHistory} />
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── RIGHT PANEL (Editor & Console) ── */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0E1015]">
          {/* Editor Header */}
          <div className="flex-none flex items-center justify-between px-4 h-12 border-b border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Code2 className="w-4 h-4" />
              <span>Solution</span>
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="h-8 w-[140px] text-xs font-medium rounded-md bg-zinc-800/50 border-zinc-700/50 text-zinc-200 hover:bg-zinc-800 transition-colors focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#12141A] border-zinc-800 text-zinc-200 text-xs rounded-md shadow-xl">
                {Object.entries(LANGUAGE_LABELS).map(([val, label]) => (
                  <SelectItem key={val} value={val} className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer rounded-sm">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Monaco Area */}
          <div className="flex-1 overflow-hidden py-2">
            <Editor
              height="100%"
              language={MONACO_LANG[selectedLanguage] ?? "javascript"}
              value={code}
              onChange={(v) => setCode(v || "")}
              theme={theme === "dark" ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 24,
                lineNumbers: "on",
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                padding: { top: 16, bottom: 16 },
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                fontLigatures: true,
                renderLineHighlight: "all",
                cursorBlinking: "smooth",
                smoothScrolling: true,
              }}
            />
          </div>

          {/* Action Bar (Between Editor & Console) */}
          <div className="flex-none border-t border-zinc-800/80 bg-[#12141A] px-4 py-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Terminal className="w-4 h-4" />
              <span>Console</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRun}
                disabled={isRunning || isSubmitting}
                variant="outline"
                className="h-9 px-5 text-[13px] font-medium rounded-md border-zinc-700 hover:border-zinc-500 bg-zinc-800/50 text-zinc-200 hover:bg-zinc-800 gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isRunning ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                {isRunning ? "Running…" : "Run Code"}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isRunning || isSubmitting}
                className="h-9 px-6 text-[13px] rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </div>

          {/* Test Cases / Results */}
          <div className="flex-none max-h-64 overflow-y-auto bg-[#0E1015]">
            {executionResponse ? (
              <div className="p-4">
                <SubmissionDetails submission={executionResponse} />
              </div>
            ) : (
              <TestCasesPanel testCases={problem.testCases} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemIdPage;

/* ─── Inline helper components ─────────────────────────────────── */

function EmptyState({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-zinc-500">
      <div className="p-4 rounded-full bg-zinc-800/30">
        {icon}
      </div>
      <p className="text-[13px] font-medium">{label}</p>
    </div>
  );
}

function TestCasesPanel({ testCases }: { testCases: { input: string; output: string }[] }) {
  return (
    <div className="p-5 space-y-4">
      <div className="flex gap-2 flex-wrap">
        {testCases?.map((tc, i) => (
          <TestCasePill key={i} index={i} tc={tc} />
        ))}
      </div>
    </div>
  );
}

function TestCasePill({ index, tc }: { index: number; tc: { input: string; output: string } }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors mb-2 group outline-none"
      >
        <span className="px-3 py-1.5 rounded-md bg-zinc-800/40 border border-zinc-700/50 font-medium group-hover:border-zinc-600 transition-colors">
          Case {index + 1}
        </span>
        {open ? <ChevronUp className="w-3 h-3 opacity-70" /> : <ChevronDown className="w-3 h-3 opacity-70" />}
      </button>
      {open && (
        <div className="ml-2 rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-4 space-y-3 text-[13px] font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-[11px] font-sans font-medium uppercase tracking-wider">Input</span>
            <code className="text-zinc-200 bg-zinc-800/50 px-2 py-1 rounded w-fit">{tc.input}</code>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-[11px] font-sans font-medium uppercase tracking-wider">Expected Output</span>
            <code className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded w-fit">{tc.output}</code>
          </div>
        </div>
      )}
    </div>
  );
}

function TestResultsPanel({ response }: { response: { allPassed: boolean; detailedResults: any[] } }) {
  const { allPassed, detailedResults } = response;
  const passed = detailedResults?.filter((r) => r.passed).length || 0;
  const total = detailedResults?.length || 0;

  return (
    <div className="p-5 space-y-4">
      {/* verdict banner */}
      <div
        className={cn(
          "flex items-center gap-3 px-5 py-3 rounded-lg text-[14px] font-semibold border shadow-sm",
          allPassed
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            : "bg-red-500/10 border-red-500/20 text-red-400"
        )}
      >
        {allPassed ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
        {allPassed ? "Accepted" : "Wrong Answer"}
        <span className="ml-auto text-[13px] font-medium opacity-80">
          {passed} / {total} Passed
        </span>
      </div>

      {/* per-case rows */}
      <div className="space-y-2">
        {detailedResults?.map((tc) => (
          <div
            key={tc.testCase}
            className={cn(
              "flex items-start gap-4 px-4 py-3 rounded-lg border text-[13px] font-mono transition-colors",
              tc.passed
                ? "bg-emerald-500/5 border-emerald-500/10"
                : "bg-red-500/5 border-red-500/10"
            )}
          >
            {tc.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            )}
            <div className="flex-1 space-y-2">
              <span className="text-zinc-400 font-sans text-xs font-semibold uppercase tracking-wider">Test Case {tc.testCase}</span>
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 w-16 text-xs font-sans">Expected</span>
                  <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{tc.expected}</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 w-16 text-xs font-sans">Output</span>
                  <code className={cn("px-1.5 py-0.5 rounded", tc.passed ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10")}>
                    {tc.stdout ?? "null"}
                  </code>
                </div>
              </div>
              {tc.stderr && <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs whitespace-pre-wrap">{tc.stderr}</div>}
              {tc.compile_output && (
                <div className="mt-2 p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs whitespace-pre-wrap">{tc.compile_output}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
