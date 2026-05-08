"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  PencilIcon,
  TrashIcon,
  Plus,
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Code2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteProblem } from '../actions';
import AddToPlaylist from "./add-to-playlist";
import CreatePlaylist from "./create-playlist";
import axios from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Problem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags?: string[];
  solvedBy: { userId: string }[];
}

interface User {
  role: string;
}

interface ProblemsTableProps {
  problems?: Problem[];
  user: User | null;
}

// ─── Difficulty config ─────────────────────────────────────────────────────────

const difficultyConfig = {
  EASY: {
    label: "Easy",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
  MEDIUM: {
    label: "Medium",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
  },
  HARD: {
    label: "Hard",
    dot: "bg-rose-400",
    badge: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800",
  },
};


// function CreatePlaylistModal({ isOpen, onClose, onSubmit }: CreatePlaylistModalProps) {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) { toast.error("Playlist name is required."); return; }
//     onSubmit(name.trim(), description.trim());
//     setName(""); setDescription("");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-2xl w-full max-w-md p-7 space-y-5">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Playlist</h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Organise problems into a collection</p>
//           </div>
//           <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-1.5">
//             <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
//             <Input placeholder="e.g. Dynamic Programming" value={name} onChange={(e) => setName(e.target.value)} required className="rounded-xl" />
//           </div>
//           <div className="space-y-1.5">
//             <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description <span className="font-normal text-gray-400">(optional)</span></label>
//             <Input placeholder="Brief description..." value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl" />
//           </div>
//           <div className="flex justify-end gap-3 pt-2">
//             <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Cancel</Button>
//             <Button type="submit" className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white border-0">Create Playlist</Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// ─── Inline Modal: Add To Playlist ────────────────────────────────────────────

// interface AddToPlaylistModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (playlistId: string) => void;
//   problemId: string | null;
// }

// function AddToPlaylistModal({ isOpen, onClose, onSubmit, problemId }: AddToPlaylistModalProps) {
//   const [playlistId, setPlaylistId] = useState("");
//   if (!isOpen || !problemId) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!playlistId.trim()) { toast.error("Please enter a playlist ID."); return; }
//     onSubmit(playlistId.trim());
//     setPlaylistId("");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-2xl w-full max-w-md p-7 space-y-5">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Save to Playlist</h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Add this problem to a collection</p>
//           </div>
//           <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-1.5">
//             <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Playlist ID</label>
//             <Input placeholder="Enter playlist ID..." value={playlistId} onChange={(e) => setPlaylistId(e.target.value)} required className="rounded-xl" />
//             {/* TODO: Replace with a searchable dropdown */}
//           </div>
//           <div className="flex justify-end gap-3 pt-2">
//             <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Cancel</Button>
//             <Button type="submit" className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white border-0">Save</Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// ─── Main Component ────────────────────────────────────────────────────────────

function ProblemsTable({ problems, user }: ProblemsTableProps) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set<string>();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  const difficulties = ["EASY", "MEDIUM", "HARD"] as const;

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => difficulty === "ALL" || p.difficulty === difficulty)
      .filter((p) => selectedTag === "ALL" || p.tags?.includes(selectedTag));
  }, [problems, search, difficulty, selectedTag]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() =>
    filteredProblems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredProblems, currentPage]
  );

  const handleDelete = async (id: string) => {
    const result = await deleteProblem(id)
    if(result?.error){
      toast.error(`${result.error}`);
    }else{
      toast.success(`Problem deleted successfully.`);
    }
    
  };
  const handleCreatePlaylist = async (data: { name: string; description: string }) => {
    try {
      const response = await axios.post("/api/playlists", {
        name: data.name,
        description: data.description,
      });
      const result = response.data; // axios already parses JSON — no await needed
      if (result.success) {
        setIsCreateModalOpen(false);
        toast.success("Playlist created successfully!");
      } else {
        toast.error(result.error ?? "Failed to create playlist");
      }
    } catch (error) {
      console.error("❌ Error creating playlist: ", error);
      toast.error("Something went wrong!");
    }
  };

  const handleAddToPlaylist = async (problemId: string, playlistId: string) => {
    try {
      const response = await axios.post("/api/playlists/add-Problem", {
        problemId,
        playlistId,
      });
      const result = response.data; // axios already parses JSON — no await needed
      if (result.success) {
        setIsAddToPlaylistModalOpen(false);
        setSelectedProblemId(null);
        toast.success("Problem added to playlist!");
      } else {
        toast.error(result.error ?? "Failed to add to playlist");
      }
    } catch (error) {
      console.error("❌ Error adding problem to playlist: ", error);
      toast.error("Something went wrong!");
    }
  };

  const solvedCount = (problems || []).filter((p) => p.solvedBy.length > 0).length;
  const totalCount = (problems || []).length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 px-4 py-8">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl shadow-sm">
              <Code2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Problems
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm ml-12">
            {solvedCount} of {totalCount} solved
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 bg-amber-500 hover:bg-amber-600 text-white border-0 rounded-xl shadow-md shadow-amber-200 dark:shadow-amber-900/30 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Create Playlist
        </Button>
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────── */}
      {totalCount > 0 && (
        <div className="bg-white dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            <span>{solvedCount} solved</span>
            <span>{Math.round((solvedCount / totalCount) * 100)}% complete</span>
          </div>
          <div className="h-2.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((solvedCount / totalCount) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Filters ────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search problems..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-9 rounded-xl border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm focus-visible:ring-amber-400"
          />
        </div>
        <div className="flex gap-3 items-center">
          <SlidersHorizontal className="h-4 w-4 text-gray-400 hidden sm:block" />
          <Select value={difficulty} onValueChange={(v) => { setDifficulty(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-[160px] rounded-xl border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">All Difficulties</SelectItem>
              {difficulties.map((d) => (
                <SelectItem key={d} value={d}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${difficultyConfig[d].dot}`} />
                    {difficultyConfig[d].label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTag} onValueChange={(v) => { setSelectedTag(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-[160px] rounded-xl border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">All Tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Problem list ───────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 shadow-md shadow-gray-100 dark:shadow-none">
        {/* Table header */}
        <div className="grid grid-cols-[3rem_1fr_auto_7rem_auto] gap-4 px-5 py-3.5 bg-gray-50 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
          <span className="text-center">#</span>
          <span>Title</span>
          <span>Tags</span>
          <span className="text-center">Difficulty</span>
          <span>Actions</span>
        </div>

        {paginatedProblems.length > 0 ? (
          paginatedProblems.map((problem, idx) => {
            const isSolved = problem.solvedBy.length > 0;
            const diff = difficultyConfig[problem.difficulty];
            const rowNum = (currentPage - 1) * itemsPerPage + idx + 1;

            return (
              <div
                key={problem.id}
              className="grid grid-cols-[3rem_1fr_auto_7rem_auto] gap-4 px-5 py-4 items-center border-b border-gray-100 dark:border-neutral-800/80 last:border-0 hover:bg-amber-50/40 dark:hover:bg-neutral-800/40 transition-colors group"
              >
                {/* Solved indicator */}
                <div className="flex items-center justify-center">
                  {isSolved
                    ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    : <Circle className="h-5 w-5 text-gray-300 dark:text-neutral-600" />
                  }
                </div>

                {/* Title + number */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono tabular-nums">{String(rowNum).padStart(3, "0")}</span>
                    <Link
                      href={`/problem/${problem.id}`}
                      className="font-semibold text-gray-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate"
                    >
                      {problem.title}
                    </Link>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {(problem.tags || []).slice(0, 3).map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-neutral-700 font-medium hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {(problem.tags?.length ?? 0) > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-neutral-700">
                      +{(problem.tags?.length ?? 0) - 3}
                    </Badge>
                  )}
                </div>

                {/* Difficulty */}
                <div className="flex justify-center">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${diff.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                    {diff.label}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setSelectedProblemId(problem.id); setIsAddToPlaylistModalOpen(true); }}
                    className="p-2 rounded-lg text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all"
                    title="Save to playlist"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                  {user?.role === "ADMIN" && (
                    <>
                      <button
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all opacity-50 cursor-not-allowed"
                        disabled
                        title="Edit (coming soon)"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(problem.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Search className="h-7 w-7 text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">No problems found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {/* ── Pagination ─────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredProblems.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-700 dark:text-gray-200">{filteredProblems.length}</span> problems
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-xl gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                      page === currentPage
                        ? "bg-amber-500 text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-xl gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Modals ─────────────────────────────────────────────────────── */}
      <CreatePlaylist
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      <AddToPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => { setIsAddToPlaylistModalOpen(false); setSelectedProblemId(null); }}
        onSubmit={handleAddToPlaylist}
        problemId={selectedProblemId ?? ""}
      />
    </div>
  );
}

export default ProblemsTable;