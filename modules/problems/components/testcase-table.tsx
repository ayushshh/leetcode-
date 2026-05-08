"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, Cpu } from "lucide-react";
import { TestCaseResult } from "@prisma/client";
import { cn } from "@/lib/utils";

export const TestCaseTable = ({ testCases }: { testCases: TestCaseResult[] }) => {
  if (!testCases || testCases.length === 0) return null;

  return (
    <div className="w-full rounded-xl border border-zinc-800/80 bg-[#0E1015] overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-zinc-900/40 border-b border-zinc-800/80">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[80px] h-10 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Case
            </TableHead>
            <TableHead className="w-[120px] h-10 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="h-10 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Time
            </TableHead>
            <TableHead className="h-10 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Memory
            </TableHead>
            <TableHead className="h-10 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Output
            </TableHead>
            <TableHead className="h-10 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Expected
            </TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {testCases.map((testCase, index) => (
            <TableRow 
              key={testCase.id}
              className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors group"
            >
              {/* Case Number */}
              <TableCell className="font-medium text-zinc-300 text-[13px]">
                #{index + 1}
              </TableCell>

              {/* Status Badge */}
              <TableCell>
                <span 
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border shadow-sm",
                    testCase.passed 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  )}
                >
                  {testCase.passed ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  {testCase.passed ? "Passed" : "Failed"}
                </span>
              </TableCell>

              {/* Time */}
              <TableCell className="text-zinc-400 font-mono text-[12px]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  {testCase.time ? `${testCase.time}s` : "--"}
                </div>
              </TableCell>

              {/* Memory */}
              <TableCell className="text-zinc-400 font-mono text-[12px]">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-zinc-500" />
                  {testCase.memory ? `${testCase.memory} KB` : "--"}
                </div>
              </TableCell>

              {/* Output */}
              <TableCell className="font-mono text-[12px]">
                <span className={cn(
                  "inline-block px-2 py-1 rounded-md border max-w-[180px] truncate align-middle",
                  testCase.passed 
                    ? "bg-zinc-800/40 border-zinc-700/50 text-zinc-300" 
                    : "bg-red-500/10 border-red-500/20 text-red-300"
                )}>
                  {testCase.stdout || "null"}
                </span>
              </TableCell>

              {/* Expected Output */}
              <TableCell className="font-mono text-[12px]">
                <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md max-w-[180px] truncate align-middle">
                  {testCase.expected}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};