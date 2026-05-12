"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Briefcase } from "lucide-react";

interface Role {
  title: string;
  confidence: number;
  reason: string;
}

interface JobFeedback {
  roles: Role[];
}

export default function JobRoleMatcherPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<JobFeedback | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/sign-in");
  }, [isLoaded, isSignedIn, router]);

  const analyzeRoles = async () => {
    if (!userInfo.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/match-job-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInfo }),
      });
      const data = await res.json();
      setFeedback(data.feedback);
    } catch {
      setFeedback({ roles: [{ title: "Error fetching result", confidence: 0, reason: "" }] });
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
          <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
            <Briefcase size={16} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Job Role Matcher</h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">
          Describe your skills and background — AI will suggest the best-fit job roles for you.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
        >
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Background</label>
          <Textarea
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
            placeholder="e.g. Skilled in React, Node.js, and Python. 2 years of experience in web development. Interested in AI and product engineering..."
            className="min-h-[160px] resize-none border-slate-200 focus:border-emerald-400 focus:ring-emerald-400"
          />
          <Button
            onClick={analyzeRoles}
            disabled={loading || !userInfo.trim()}
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            {loading ? "Analyzing..." : "Find My Best Roles"}
          </Button>
        </motion.div>

        {feedback && <Results feedback={feedback} />}
      </div>
    </main>
  );
}

function Results({ feedback }: { feedback: JobFeedback }) {
  const roles = feedback?.roles || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
    >
      <h2 className="font-semibold text-slate-900 mb-5">Recommended Roles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roles.map((r: Role, idx: number) => (
          <div
            key={idx}
            className="border border-slate-100 rounded-xl p-5 bg-slate-50 hover:bg-white hover:shadow-sm transition-all"
          >
            <h3 className="font-semibold text-slate-900 text-sm mb-1">{r.title}</h3>
            <p className="text-slate-500 text-xs mb-4 leading-relaxed">{r.reason}</p>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Match</span>
                <span className={`text-xs font-semibold ${r.confidence > 80 ? "text-emerald-600" : r.confidence > 60 ? "text-amber-500" : "text-red-500"}`}>
                  {r.confidence}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${r.confidence}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-1.5 rounded-full ${r.confidence > 80 ? "bg-emerald-500" : r.confidence > 60 ? "bg-amber-400" : "bg-red-400"}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
