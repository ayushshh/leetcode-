"use client";

import React from 'react';
import { Library, Folder, CalendarDays, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Playlist } from '@prisma/client';
import { cn } from '@/lib/utils';

interface PlaylistsSectionProps {
  playlists: Playlist[];
}

const PlaylistsSection = ({ playlists }: PlaylistsSectionProps) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <Card className="mb-8 w-full bg-[#0E1015] border border-zinc-800/60 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <CardHeader className="border-b border-zinc-800/60 bg-gradient-to-b from-zinc-900/30 to-transparent pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Library className="w-5 h-5 text-amber-500" />
            <div>
              <CardTitle className="text-[16px] font-semibold text-zinc-100 tracking-tight">
                Playlists
              </CardTitle>
              <CardDescription className="text-[13px] text-zinc-500 mt-1">
                Your custom collections of curated problems
              </CardDescription>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 tracking-wider">
            {playlists.length} Total
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {playlists.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 gap-5 text-zinc-500">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900/30 border border-dashed border-zinc-700/60">
              <Library className="w-7 h-7 text-zinc-500" />
            </div>
            <div className="text-center space-y-1.5">
              <p className="text-[15px] font-semibold text-zinc-300 tracking-tight">No playlists created</p>
              <p className="text-[13px] text-zinc-500">Create your first playlist to organize your problems.</p>
            </div>
          </div>
        ) : (
          /* Playlist Grid */
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-5">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="group flex flex-col justify-between p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/50 border-t-[3px] border-t-amber-500/40 hover:border-t-amber-500 hover:bg-zinc-800/40 transition-all duration-300 h-full"
              >
                <div>
                  {/* Top Section: Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                      <Folder className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[15px] font-semibold text-zinc-100 tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1">
                        {playlist.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-zinc-400 leading-relaxed line-clamp-2 mb-5">
                    {playlist.description || <span className="italic opacity-50">No description provided.</span>}
                  </p>
                </div>

                {/* Bottom Section: Dates */}
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-zinc-950/40 border border-zinc-800/40 mt-auto">
                  <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>Created</span>
                    </div>
                    <span className="text-zinc-300 normal-case tracking-normal text-[12px]">
                      {formatDate(playlist.CreatedAt)}
                    </span>
                  </div>

                  {/* Only show updated date if it differs from created date */}
                  {new Date(playlist.CreatedAt).getTime() !== new Date(playlist.updatedAt).getTime() && (
                    <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 uppercase tracking-wider border-t border-zinc-800/50 pt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Updated</span>
                      </div>
                      <span className="text-zinc-300 normal-case tracking-normal text-[12px]">
                        {formatDate(playlist.updatedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaylistsSection;