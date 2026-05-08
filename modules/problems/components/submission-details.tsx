"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Clock, CpuIcon, Code, CheckCircle2, XCircle, CalendarDays } from "lucide-react";
import type { Submission } from "@prisma/client";
import { cn } from "@/lib/utils";

interface SubmissionDetailsProps {
  submission: Submission;
}

export const SubmissionDetails = ({ submission }: SubmissionDetailsProps) => {
  const isSuccess = submission.status === "Accepted";

  // Safely parse and calculate averages to prevent runtime crashes
  let averageMemory = 0;
  let averageTime = 0;

  try {
    if (submission.memory) {
      const memArray = JSON.parse(submission.memory) as string[];
      if (memArray.length > 0) {
        averageMemory = 
          memArray.reduce((acc, val) => acc + parseFloat(val), 0) / memArray.length;
      }
    }

    if (submission.time) {
      const timeArray = JSON.parse(submission.time) as string[];
      if (timeArray.length > 0) {
        averageTime = 
          timeArray
            .map((t) => parseFloat(t.replace(" s", "")))
            .reduce((acc, val) => acc + val, 0) / timeArray.length;
      }
    }
  } catch (error) {
    console.error("Failed to parse submission metrics:", error);
  }

  // Format date nicely
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(submission.createdAt));

  return (
    <Card className="w-full bg-[#0E1015] border-zinc-800/80 shadow-md overflow-hidden">
      <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/20 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="text-[16px] font-semibold text-zinc-300 tracking-tight">
              Submission Details
            </CardTitle>
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium">
              <CalendarDays className="w-3.5 h-3.5 opacity-70" />
              {formattedDate}
            </div>
          </div>
          
          <span 
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold border shadow-sm",
              isSuccess 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                : "bg-red-500/10 text-red-400 border-red-500/20"
            )}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {isSuccess ? "Accepted" : "Failed"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Language Metric */}
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
            <div className="flex items-center gap-2 text-zinc-500">
              <Code className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Language
              </span>
            </div>
            <p className="text-[15px] font-medium text-zinc-300">
              {submission.language}
            </p>
          </div>

          {/* Memory Metric */}
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
            <div className="flex items-center gap-2 text-zinc-500">
              <CpuIcon className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Avg Memory
              </span>
            </div>
            <p className="text-[15px] font-mono text-zinc-300">
              {averageMemory > 0 ? `${averageMemory.toFixed(2)} KB` : "N/A"}
            </p>
          </div>

          {/* Time Metric */}
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
            <div className="flex items-center gap-2 text-zinc-500">
              <Clock className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Avg Time
              </span>
            </div>
            <p className="text-[15px] font-mono text-zinc-300">
              {averageTime > 0 ? `${averageTime.toFixed(3)} s` : "N/A"}
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};