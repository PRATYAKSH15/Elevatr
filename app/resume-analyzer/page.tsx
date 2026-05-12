"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FileText, CheckCircle } from "lucide-react";

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

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/sign-in");
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
    } catch {
      setFeedback({ summary: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
            <FileText size={16} className="text-violet-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Resume Analyzer</h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">
          Paste your resume below and get an AI-powered score with actionable improvements.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
        >
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Resume Text</label>
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="min-h-[240px] resize-none border-slate-200 focus:border-emerald-400 focus:ring-emerald-400"
          />
          <Button
            onClick={analyzeResume}
            disabled={loading || !resumeText.trim()}
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </motion.div>

        {feedback && <ResultCard feedback={feedback} />}
      </div>
    </main>
  );
}

function ResultCard({ feedback }: { feedback: ResumeFeedback }) {
  const score = parseInt(String(feedback.score ?? 0)) || 0;
  const scoreValue = useSpring(0, { stiffness: 80, damping: 15 });
  const circleLength = 280;
  const strokeDashoffset = useTransform(scoreValue, [0, 100], [circleLength, 0]);
  const color = useTransform(scoreValue, [0, 50, 80, 100], ["#ef4444", "#f59e0b", "#22c55e", "#16a34a"]);
  if (score > 0) scoreValue.set(score);

  const scoreColor = score >= 80 ? "text-emerald-600" : score >= 60 ? "text-amber-500" : "text-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
    >
      <h2 className="font-semibold text-slate-900 mb-6">Analysis Results</h2>

      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        {/* Score Circle */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="10" fill="none" />
            <motion.circle
              cx="64" cy="64" r="56"
              strokeWidth="10"
              stroke={color}
              fill="none"
              strokeDasharray={circleLength}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span className={`text-3xl font-bold ${scoreColor}`} style={{ color }}>
              {score}
            </motion.span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          {feedback.summary && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Summary</div>
              <p className="text-slate-700 text-sm leading-relaxed">{feedback.summary}</p>
            </div>
          )}
          {feedback.suggestions && feedback.suggestions.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Suggestions</div>
              <ul className="space-y-2">
                {feedback.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
