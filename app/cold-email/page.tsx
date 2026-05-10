"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ColdEmailPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    recipient: "",
    context: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect to login if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    } catch (err) {
      console.error(err);
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="text-center mt-20 text-white">
        Checking authentication...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white p-8 rounded-2xl border shadow-md"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-emerald-600">
          Cold Email & Cover Letter Generator
        </h1>
        <p className="text-gray-700 text-center mb-8">
          Generate personalized, professional cold emails in seconds using
          Gemini AI.
        </p>

        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <Input
            name="recipient"
            placeholder="Recipient or Company Name"
            value={form.recipient}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <Textarea
            name="context"
            placeholder="Purpose (e.g. applying for internship, reaching out for collaboration)"
            value={form.context}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full min-h-[120px]"
          />

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {loading ? "Generating..." : "Generate Email"}
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-gray-50 p-5 rounded-lg border border-gray-200 text-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg text-emerald-600">
                Generated Email:
              </h2>
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="text-sm text-emerald-500 hover:text-emerald-600 transition"
              >
                📋 Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">{result}</pre>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
