"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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

  // Redirect to login if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in"); // redirect to login page
    }
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
    } catch (err) {
      console.error(err);
      setFeedback({ roles: [{ title: "Error fetching AI result", confidence: 0, reason: "" }] });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    // Optional: show a loader while auth is being checked
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
          AI Job Role Matcher
        </motion.h1>

        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Enter your skills, experience, or short bio, and our AI will suggest the best-matched job roles for you.
        </p>

        <Textarea
          value={userInfo}
          onChange={(e) => setUserInfo(e.target.value)}
          placeholder="e.g. Skilled in React, Node.js, and AI-based projects. Interested in software engineering and innovation."
          className="w-full min-h-[200px] p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-400"
        />

        <Button
          onClick={analyzeRoles}
          disabled={loading}
          className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-3 rounded-xl"
        >
          {loading ? "Analyzing..." : "Find My Best Roles"}
        </Button>

        {feedback && <Results feedback={feedback} />}
      </div>
    </main>
  );
}

/* ---------------- Results Section ---------------- */
function Results({ feedback }: { feedback: JobFeedback }) {
  const roles = feedback?.roles || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-left"
    >
      <h2 className="text-2xl font-semibold text-emerald-600 mb-6 text-center">Recommended Roles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {roles.map((r: Role, idx: number) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="p-5 border border-slate-100 rounded-xl shadow-sm bg-gradient-to-b from-white to-slate-50"
          >
            <h3 className="text-lg font-semibold text-slate-800">{r.title}</h3>
            <p className="text-sm text-slate-600 mt-1 mb-3">{r.reason}</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${r.confidence}%` }}
                transition={{ duration: 1 }}
                className={`h-2 rounded-full ${
                  r.confidence > 80
                    ? "bg-emerald-500"
                    : r.confidence > 60
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Confidence: {r.confidence}%</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
