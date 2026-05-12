"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "", hp: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
              <Mail size={16} className="text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Contact Us</h1>
          </div>
          <p className="text-slate-500 text-sm ml-11">
            Have a question or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm"
        >
          {success ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-emerald-600" />
              </div>
              <h2 className="font-semibold text-slate-900 mb-1">Message sent!</h2>
              <p className="text-slate-500 text-sm">We&apos;ll get back to you as soon as possible.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-5 border-slate-200"
                onClick={() => setSuccess(false)}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Honeypot */}
              <input type="text" name="hp" value={form.hp} onChange={handleChange} className="hidden" autoComplete="off" />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                <Input
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="border-slate-200 focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="border-slate-200 focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell us what&apos;s on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  className="border-slate-200 focus:border-emerald-400 resize-none min-h-[120px]"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-2.5">
                  {error}
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
