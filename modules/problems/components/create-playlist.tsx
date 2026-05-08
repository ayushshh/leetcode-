"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { Loader2, FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const playlistSchema = z.object({
  name: z
    .string()
    .min(1, "Playlist name is required")
    .max(50, "Playlist name must be less than 50 characters"),
  description: z
    .string()
    .max(500, "Playlist description must be less than 500 characters")
    .optional(), // Fixed: explicitly made optional to match your label
});

type PlaylistFormData = z.infer<typeof playlistSchema>;

interface CreatePlaylistProps {
  isOpen: boolean;
  onClose: () => void;
  // Updated to optionally accept a Promise so the loading state works accurately
  onSubmit: (data: PlaylistFormData) => void | Promise<void>; 
}

function CreatePlaylist({ isOpen, onClose, onSubmit }: CreatePlaylistProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  });

  const handleFormSubmit = async (data: PlaylistFormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data); // Awaits if onSubmit returns a promise
      reset();
      onClose();
      toast.success("Playlist created successfully");
    } catch (error) {
      console.error("❌ Error creating playlist: ", error);
      toast.error("Failed to create playlist");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset(); // Clear form when modal closes without saving
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0E1015] border border-zinc-800/80 shadow-2xl p-0 overflow-hidden gap-0">
        
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b border-zinc-800/60 bg-zinc-900/20">
          <DialogTitle className="text-[16px] font-semibold text-zinc-100 tracking-tight flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-amber-500" />
            Create New Playlist
          </DialogTitle>
          <DialogDescription className="text-[13px] text-zinc-400 mt-1.5">
            Create a custom collection to organize and save your favorite problems.
          </DialogDescription>
        </DialogHeader>

        {/* Form Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-5">
          
          {/* Name Field */}
          <div className="space-y-2">
            <Label 
              htmlFor="name" 
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
            >
              Playlist Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g. Dynamic Programming Prep"
              className={cn(
                "h-10 bg-zinc-900/30 border-zinc-800/60 text-[14px] text-zinc-200 placeholder:text-zinc-600",
                "focus-visible:ring-1 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/50 transition-all",
                errors.name && "border-red-500/50 focus-visible:ring-red-500/20"
              )}
            />
            {errors.name && (
              <p className="text-[11px] text-red-400 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label 
              htmlFor="description" 
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
            >
              Description <span className="opacity-60 lowercase font-normal tracking-normal">(Optional)</span>
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="What kind of problems will you save here?"
              className={cn(
                "min-h-[100px] resize-none bg-zinc-900/30 border-zinc-800/60 text-[14px] text-zinc-200 placeholder:text-zinc-600",
                "focus-visible:ring-1 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/50 transition-all",
                errors.description && "border-red-500/50 focus-visible:ring-red-500/20"
              )}
            />
            {errors.description && (
              <p className="text-[11px] text-red-400 font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="h-9 px-4 text-[13px] bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-9 px-5 text-[13px] bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create Playlist"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePlaylist;