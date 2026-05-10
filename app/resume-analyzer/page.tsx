"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ResumeFeedback {
  score?: number | string;
  summary?: string;
  suggestions?: string[];
}

export default function ResumeAnalyzerPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<ResumeFeedback | null>(null);

  // Redirect to login if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in"); // redirect to login page
    }
  }, [isLoaded, isSignedIn, router]);

  const analyzeResume = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      setFeedback(data.feedback);
    } catch (err) {
      console.error(err);
      setFeedback({ summary: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="text-center mt-20">Checking authentication...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 bg-clip-text text-transparent mb-6"
        >
          AI Resume Analyzer
        </motion.h1>

        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Paste your resume text below, and our AI will score it and suggest improvements.
        </p>

        <Textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume here..."
          className="w-full min-h-[220px] p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-400"
        />

        <Button
          onClick={analyzeResume}
          disabled={loading}
          className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-3 rounded-xl"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </Button>

        {feedback && <ResultCard feedback={feedback} />}
      </div>
    </main>
  );
}

/* ---------------- Result Card Component ---------------- */
function ResultCard({ feedback }: { feedback: ResumeFeedback }) {
  const score = parseInt(feedback.score) || 0;

  // Framer Motion spring for smooth animation
  const scoreValue = useSpring(0, { stiffness: 80, damping: 15 });
  const circleLength = 280; // circle circumference

  const strokeDashoffset = useTransform(scoreValue, [0, 100], [circleLength, 0]);
  const color = useTransform(scoreValue, [0, 50, 80, 100], ["#ef4444", "#facc15", "#22c55e", "#16a34a"]);

  // Animate to target score
  if (score > 0) {
    scoreValue.set(score);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col items-center"
    >
      <h2 className="text-2xl font-semibold text-emerald-600 mb-6">Results</h2>

      {/* Score Circle */}
      <div className="relative w-40 h-40 mb-6">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            strokeWidth="12"
            stroke={color}
            fill="none"
            strokeDasharray={circleLength}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <motion.span className="text-4xl font-bold" style={{ color }}>
            {score}
          </motion.span>
          <span className="text-sm text-slate-500">out of 100</span>
        </div>
      </div>

      {/* Summary */}
      {feedback.summary && (
        <p className="text-slate-600 mb-4 text-center max-w-md">{feedback.summary}</p>
      )}

      {/* Suggestions */}
      {feedback.suggestions && (
        <ul className="list-disc text-left text-slate-600 space-y-1 max-w-md">
          {feedback.suggestions.map((s: string, idx: number) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
