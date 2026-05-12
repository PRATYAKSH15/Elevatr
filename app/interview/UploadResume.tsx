"use client";
import React, { useState } from "react";
import InterviewResults from "@/components/InterviewResults";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadResume() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    const fileInput = e.currentTarget.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) { setError("Please select a PDF file."); return; }
    if (file.type !== "application/pdf") { setError("Only PDF files are accepted."); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/resume", { method: "POST", body: fd });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || `Upload failed (${res.status})`);
      }
      const json = await res.json();
      setResult(json.interviewQnA ?? json.qna ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Upload Resume (PDF)</label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors">
            <Upload size={20} className="text-slate-400 mb-2" />
            <span className="text-sm text-slate-500">{fileName || "Click to select a PDF file"}</span>
            <span className="text-xs text-slate-400 mt-1">Max 5MB</span>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
            />
          </label>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          {loading ? "Generating..." : "Generate Interview Q&A"}
        </Button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      {result && <InterviewResults raw={result} />}
    </div>
  );
}
