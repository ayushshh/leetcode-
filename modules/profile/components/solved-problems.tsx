"use client";

import React from 'react';
import { Trophy, CheckCircle2, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { problemSolved } from '@prisma/client';
import { cn } from '@/lib/utils';

interface SolvedProblemsProps {
  solvedProblems: problemSolved[];
}

const SolvedProblems = ({ solvedProblems }: SolvedProblemsProps) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <Card className="mb-8 w-full bg-[#0E1015] border border-zinc-800/60 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <CardHeader className="border-b border-zinc-800/60 bg-gradient-to-b from-zinc-900/30 to-transparent pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-emerald-500" />
            <div>
              <CardTitle className="text-[16px] font-semibold text-zinc-100 tracking-tight">
                Solved Problems
              </CardTitle>
              <CardDescription className="text-[13px] text-zinc-500 mt-1">
                A record of your successfully conquered challenges
              </CardDescription>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 tracking-wider">
            {solvedProblems.length} Total
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {solvedProblems.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 gap-5 text-zinc-500">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900/30 border border-dashed border-zinc-700/60">
              <Trophy className="w-7 h-7 text-zinc-500" />
            </div>
            <div className="text-center space-y-1.5">
              <p className="text-[15px] font-semibold text-zinc-300 tracking-tight">No problems solved yet</p>
              <p className="text-[13px] text-zinc-500">Start coding to see your achievements here!</p>
            </div>
          </div>
        ) : (
          /* Problem Grid */
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-5">
            {solvedProblems.map((problem) => (
              <div
                key={problem.id}
                className="group flex flex-col gap-4 p-4 rounded-xl bg-zinc-900/20 border border-zinc-800/50 border-l-[3px] border-l-emerald-500/40 hover:border-l-emerald-500 hover:bg-zinc-800/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-full p-2 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 space-y-2 pt-0.5">
                    <h3 className="text-[14px] font-semibold text-zinc-200 tracking-tight">
                      Problem Solved
                    </h3>
                    
                    <div className="flex flex-col gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 w-fit rounded border border-zinc-700/50 bg-zinc-800/40 font-mono text-[11px] text-zinc-400">
                        ID: {problem.problemId.slice(0, 8)}...
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium mt-1">
                        <CalendarDays className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span>{formatDate(problem.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolvedProblems;