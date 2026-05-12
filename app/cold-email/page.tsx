"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Mail, Copy, Check } from "lucide-react";

export default function ColdEmailPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", recipient: "", context: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/sign-in");
  }, [isLoaded, isSignedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate-cold-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data.email || "Something went wrong. Please try again.");
    } catch {
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      {/* Page Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Mail size={16} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Cold Email Generator</h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">
          Generate personalized, professional outreach emails powered by Gemini AI.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
              <Input
                name="name"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={handleChange}
                className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Recipient or Company</label>
              <Input
                name="recipient"
                placeholder="e.g. Google, Rahul Gupta at Startup X"
                value={form.recipient}
                onChange={handleChange}
                className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Purpose</label>
              <Textarea
                name="context"
                placeholder="e.g. Applying for a software engineering internship, reaching out for collaboration on an open-source project..."
                value={form.context}
                onChange={handleChange}
                className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400 min-h-[100px] resize-none"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={loading || !form.name || !form.recipient || !form.context}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              {loading ? "Generating..." : "Generate Email"}
            </Button>
          </div>
        </motion.div>

        {/* Result Card */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Generated Email</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2 text-slate-600 border-slate-200 hover:bg-slate-50"
              >
                {copied ? <><Check size={14} className="text-emerald-600" /> Copied</> : <><Copy size={14} /> Copy</>}
              </Button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-sans bg-slate-50 rounded-lg p-4 border border-slate-100">
              {result}
            </pre>
          </motion.div>
        )}
      </div>
    </main>
  );
}
