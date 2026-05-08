"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Loader2, ListPlus, FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";

type Playlist = {
  id: string;
  name: string;
  description?: string | null;
};

interface AddToPlaylistProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (problemId: string, playlistId: string) => Promise<void>;
  problemId: string;
}

function AddToPlaylist({ isOpen, onClose, onSubmit, problemId }: AddToPlaylistProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setIsFetching(true);
        const response = await fetch("/api/playlists");
        const data = await response.json();
        
        if (data.success) {
          setPlaylists(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
        toast.error("Failed to fetch playlists");
      } finally {
        setIsFetching(false);
      }
    };

    if (isOpen) {
      loadPlaylists();
    } else {
      // Reset state when closed
      setAddingId(null);
    }
  }, [isOpen]);

  const handleAddToPlaylist = async (playlistId: string) => {
    try {
      setAddingId(playlistId);
      await onSubmit(problemId, playlistId);
      onClose();
    } catch (error) {
      console.error("❌ Error adding problem to playlist: ", error);
      toast.error("Failed to add problem to playlist");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0E1015] border border-zinc-800/80 shadow-2xl p-0 overflow-hidden gap-0">
        
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b border-zinc-800/60 bg-zinc-900/20">
          <DialogTitle className="text-[16px] font-semibold text-zinc-100 tracking-tight flex items-center gap-2">
            <ListPlus className="w-4 h-4 text-amber-500" />
            Add to Playlist
          </DialogTitle>
          <DialogDescription className="text-[13px] text-zinc-400 mt-1.5">
            Select a collection to save this problem for later.
          </DialogDescription>
        </DialogHeader>

        {/* Content Area */}
        <div className="p-2">
          {isFetching ? (
            // Loading State
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-600 mb-3" />
              <p className="text-[13px]">Loading your playlists...</p>
            </div>
          ) : playlists.length > 0 ? (
            // Playlist List
            <ScrollArea className="max-h-[300px] w-full px-4 py-2">
              <div className="space-y-2 pb-2">
                {playlists.map((playlist) => {
                  const isAdding = addingId === playlist.id;
                  const isBusy = addingId !== null;

                  return (
                    <div
                      key={playlist.id}
                      className="group flex items-center justify-between p-3 rounded-lg bg-zinc-900/20 border border-zinc-800/50 hover:bg-zinc-800/40 hover:border-zinc-700/50 transition-all"
                    >
                      <div className="pr-4 overflow-hidden">
                        <h3 className="text-[14px] font-medium text-zinc-200 truncate">
                          {playlist.name}
                        </h3>
                        {playlist.description && (
                          <p className="text-[12px] text-zinc-500 truncate mt-0.5">
                            {playlist.description}
                          </p>
                        )}
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => handleAddToPlaylist(playlist.id)}
                        disabled={isBusy}
                        variant="secondary"
                        className={cn(
                          "h-8 px-3 text-[12px] font-medium shrink-0 transition-all",
                          "bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700 hover:text-zinc-100",
                          isAdding && "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/10"
                        )}
                      >
                        {isAdding ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                        )}
                        {isAdding ? "Adding" : "Add"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="p-3 rounded-full bg-zinc-800/30 mb-4 border border-zinc-800/50">
                <FolderPlus className="w-6 h-6 text-zinc-500" />
              </div>
              <p className="text-[14px] font-medium text-zinc-300 mb-1">No playlists found</p>
              <p className="text-[13px] text-zinc-500 mb-5">
                Create your first playlist to start organizing problems.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="h-9 px-4 text-[13px] bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                onClick={() => {
                  onClose();
                  // TODO: trigger your create playlist modal here
                }}
              >
                Create Playlist
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddToPlaylist;