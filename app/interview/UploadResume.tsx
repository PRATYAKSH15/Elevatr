// app/interview/UploadResume.tsx
"use client";
import React, { useState } from "react";
import InterviewResults from "@/components/InterviewResults";

export default function UploadResume() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    const fileInput = e.currentTarget.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) {
      setError("Please choose a PDF file.");
      return;
    }
    if (file.type !== "application/pdf") {
      setError("Only PDF files are accepted.");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      // optional: send jobRole if you have an input
      // fd.append('jobRole', jobRole);

      const res = await fetch("/api/resume", {
        method: "POST",
        body: fd,
      });

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
    <section className="space-y-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input type="file" name="file" accept="application/pdf" className="file-input" />
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="btn">
            {loading ? "Generating..." : "Generate Interview Q&A"}
          </button>
        </div>
      </form>

      {error && <div className="text-red-600">{error}</div>}
      {result && <InterviewResults raw={result} />}
    </section>
  );
}
