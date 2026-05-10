"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    hp: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "", hp: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden">

      {/* Gradient Blobs */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-200px] left-[-150px] w-[450px] h-[450px] rounded-full bg-emerald-300/30 blur-[140px] -z-20"
      />

      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 11, repeat: Infinity }}
        className="absolute bottom-[-200px] right-[-150px] w-[450px] h-[450px] rounded-full bg-sky-300/30 blur-[140px] -z-20"
      />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#0f766e22 1px, transparent 1px), linear-gradient(90deg, #0f766e22 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating Square */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.25, rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute w-[650px] h-[650px] border border-emerald-400/20 rounded-xl -z-10"
        style={{ filter: "blur(3px)" }}
      />

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent text-center">
              Contact Us
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              We&apos;re here to help! Fill out the form below.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 mt-2">

            {success && (
              <p className="text-emerald-600 text-center font-medium animate-pulse">
                Message sent successfully!
              </p>
            )}

            {/* Honeypot */}
            <input
              type="text"
              name="hp"
              value={form.hp}
              onChange={handleChange}
              className="hidden"
              autoComplete="off"
            />

            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-emerald-400"
            />

            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-emerald-400"
            />

            <Textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="min-h-[130px] focus:ring-2 focus:ring-emerald-400"
            />

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-md rounded-lg"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
