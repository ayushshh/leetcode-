"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Cpu, 
  Code, 
  CalendarDays,
  History
} from "lucide-react";
import type { Submission } from "@prisma/client";
import { cn } from "@/lib/utils";

interface SubmissionHistoryProps {
  submissions?: Submission[];
}

export const SubmissionHistory = ({ submissions = [] }: SubmissionHistoryProps) => {
  
  // Safe parsing formatters
  const formatMemory = (memory: string | null): string => {
    if (!memory) return 'N/A';
    try {
      const memoryArray: string[] = JSON.parse(memory);
      if (!memoryArray.length) return 'N/A';
      const avgMemory = memoryArray.reduce((a, b) => a + parseFloat(b), 0) / memoryArray.length;
      return `${avgMemory.toFixed(2)} KB`;
    } catch {
      return 'N/A';
    }
  };

  const formatTime = (time: string | null): string => {
    if (!time) return 'N/A';
    try {
      const timeArray: string[] = JSON.parse(time);
      if (!timeArray.length) return 'N/A';
      const avgTime = timeArray
        .map((t) => parseFloat(t.replace(" s", "")))
        .reduce((a, b) => a + b, 0) / timeArray.length;
      return `${avgTime.toFixed(3)} s`;
    } catch {
      return 'N/A';
    }
  };

  const formatDate = (dateString: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  // ─── EMPTY STATE ──────────────────────────────────────────────────────────
  if (!submissions.length) {
    return (
      <Card className="w-full bg-[#0E1015] border border-zinc-800/60 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-24 gap-5 text-zinc-500">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900/30 border border-dashed border-zinc-700/60">
            <History className="w-7 h-7 text-zinc-500" />
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-[15px] font-semibold text-zinc-300 tracking-tight">No submissions yet</p>
            <p className="text-[13px] text-zinc-500">Your code execution history will appear here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ─── HISTORY LIST ─────────────────────────────────────────────────────────
  return (
    <Card className="w-full bg-[#0E1015] border border-zinc-800/60 shadow-sm overflow-hidden flex flex-col">
      <CardHeader className="border-b border-zinc-800/60 bg-gradient-to-b from-zinc-900/30 to-transparent pb-4">
        <CardTitle className="text-[16px] font-semibold text-zinc-100 tracking-tight">
          Submission History
        </CardTitle>
        <CardDescription className="text-[13px] text-zinc-500 mt-1">
          Review your previous attempts for this problem
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[450px]">
          <div className="p-4 space-y-3">
            {submissions.map((submission) => {
              const isAccepted = submission.status === "Accepted";

              return (
                <div 
                  key={submission.id} 
                  className={cn(
                    "group flex flex-col gap-4 p-4 rounded-xl bg-zinc-900/20 border transition-all duration-300",
                    isAccepted 
                      ? "border-zinc-800/50 border-l-[3px] border-l-emerald-500/40 hover:border-l-emerald-500 hover:bg-zinc-800/30" 
                      : "border-zinc-800/50 border-l-[3px] border-l-red-500/40 hover:border-l-red-500 hover:bg-zinc-800/30"
                  )}
                >
                  {/* Top Row: Status & Date */}
                  <div className="flex items-center justify-between">
                    <span 
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border shadow-sm transition-colors",
                        isAccepted 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20" 
                          : "bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20"
                      )}
                    >
                      {isAccepted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      {isAccepted ? "Accepted" : "Failed"}
                    </span>

                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium">
                      <CalendarDays className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      {formatDate(submission.createdAt)}
                    </div>
                  </div>

                  {/* Bottom Row: Nested Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    
                    <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-zinc-950/40 border border-zinc-800/40">
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <Code className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Language</span>
                      </div>
                      <p className="text-[13px] font-medium text-zinc-200 mt-0.5">
                        {submission.language}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-zinc-950/40 border border-zinc-800/40">
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <Cpu className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Memory</span>
                      </div>
                      <p className="text-[13px] font-mono text-zinc-200 mt-0.5">
                        {formatMemory(submission.memory)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-zinc-950/40 border border-zinc-800/40">
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Time</span>
                      </div>
                      <p className="text-[13px] font-mono text-zinc-200 mt-0.5">
                        {formatTime(submission.time)}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};