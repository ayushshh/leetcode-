"use client";

import React from 'react';
import { User, Mail, Calendar, Shield, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { User as PrismaUser, Submission, problemSolved, Playlist } from '@prisma/client';
import { cn } from '@/lib/utils';

type UserWithRelations = PrismaUser & {
  submissions: Submission[];
  solvedProblems: problemSolved[];
  playlists: Playlist[];
};

interface UserInfoCardProps {
  userData: UserWithRelations;
}

const UserInfoCard = ({ userData }: UserInfoCardProps) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  const isAdmin = userData.role === 'ADMIN';

  return (
    <Card className="mb-8 w-full bg-[#0E1015] border border-zinc-800/60 shadow-sm relative overflow-hidden">
      {/* Subtle Decorative Background Glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <CardContent className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          
          {/* Avatar Section */}
          <div className="relative shrink-0">
            <div className="p-1 rounded-full bg-gradient-to-b from-zinc-700/50 to-zinc-900/50 border border-zinc-800">
              <Avatar className="w-24 h-24 border-2 border-[#0E1015] bg-zinc-900">
                <AvatarImage 
                  src={userData.imageUrl ?? undefined} 
                  alt={`${userData.firstName} ${userData.lastName}`}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-bold bg-zinc-800 text-zinc-300">
                  {userData.firstName?.[0]}
                  {userData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Role Badge Icon Overlap */}
            <div className={cn(
              "absolute -bottom-1 -right-1 rounded-full p-1.5 border-4 border-[#0E1015] shadow-lg",
              isAdmin ? "bg-amber-500" : "bg-zinc-700"
            )}>
              {isAdmin ? (
                <Crown className="w-4 h-4 text-zinc-950" strokeWidth={2.5} />
              ) : (
                <User className="w-4 h-4 text-zinc-100" strokeWidth={2.5} />
              )}
            </div>
          </div>
          
          {/* Information Section */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-1">
            
            {/* Header Row: Name & Role Badge */}
            <div className="flex flex-col md:flex-row items-center gap-3 mb-1.5">
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
                {userData.firstName} {userData.lastName}
              </h1>
              <span className={cn(
                "px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border shadow-sm",
                isAdmin 
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                  : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50"
              )}>
                {userData.role}
              </span>
            </div>
            
            {/* Email */}
            <p className="text-[14px] text-zinc-400 flex items-center gap-2 mb-6">
              <Mail className="w-4 h-4 opacity-70" />
              {userData.email}
            </p>
            
            {/* Metrics / Dates Footer */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
              <div className="flex items-center gap-2 text-[13px] text-zinc-500 font-medium">
                <Calendar className="w-4 h-4 opacity-70" />
                <span>Joined {formatDate(userData.createdAt)}</span>
              </div>
              
              <div className="hidden md:block w-1 h-1 rounded-full bg-zinc-700" />
              
              <div className="flex items-center gap-2 text-[13px] text-zinc-500 font-medium">
                <Shield className="w-4 h-4 opacity-70" />
                <span>Active {formatDate(userData.updatedAt)}</span>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;