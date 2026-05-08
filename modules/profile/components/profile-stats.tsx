"use client";

import React from 'react';
import { BarChart3, Target, Library, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Submission } from '@prisma/client';
import { cn } from '@/lib/utils';

interface ProfileStatsProps {
  submissions: Submission[];
  solvedCount: number;
  playlistCount: number;
}

const ProfileStats = ({ submissions, solvedCount, playlistCount }: ProfileStatsProps) => {
  const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted').length;
  const successRate = submissions.length > 0 
    ? Math.round((acceptedSubmissions / submissions.length) * 100) 
    : 0;

  const stats = [
    {
      icon: Target,
      label: 'Success Rate',
      value: `${successRate}%`,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10',
      hoverBorder: 'hover:border-emerald-500/30',
    },
    {
      icon: BarChart3,
      label: 'Total Submissions',
      value: submissions.length.toString(),
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      hoverBorder: 'hover:border-blue-500/30',
    },
    {
      icon: Award,
      label: 'Problems Solved',
      value: solvedCount.toString(),
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10',
      hoverBorder: 'hover:border-purple-500/30',
    },
    {
      icon: Library, // Changed from Clock to Library to better represent Playlists
      label: 'Playlists Created',
      value: playlistCount.toString(),
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10',
      hoverBorder: 'hover:border-amber-500/30',
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={cn(
              "group bg-[#0E1015] border-zinc-800/60 shadow-sm transition-all duration-300",
              stat.hoverBorder
            )}
          >
            <CardContent className="p-5 flex flex-col gap-4">
              {/* Icon & Top Bar */}
              <div className="flex items-center justify-between">
                <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-105", stat.iconBg)}>
                  <Icon className={cn("w-5 h-5", stat.iconColor)} />
                </div>
              </div>
              
              {/* Data & Label */}
              <div className="flex flex-col gap-1">
                <p className="text-3xl font-bold text-zinc-100 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProfileStats;