"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Brain,
  PenTool,
  Mail,
  FileText,
  Sparkles,
  Briefcase,
  Lightbulb,
  Headphones,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  { icon: Brain, color: "text-emerald-600", bg: "bg-emerald-50", title: "AI Profile Summary", desc: "Generate compelling professional summaries tailored to your background and target role." },
  { icon: PenTool, color: "text-violet-600", bg: "bg-violet-50", title: "Resume Analyzer", desc: "Score and improve your resume for ATS systems and recruiter visibility." },
  { icon: Mail, color: "text-blue-600", bg: "bg-blue-50", title: "Cold Email Generator", desc: "Create polished outreach emails for recruiters or clients in seconds." },
  { icon: FileText, color: "text-amber-600", bg: "bg-amber-50", title: "Cover Letter Creator", desc: "Craft job-ready cover letters customized to the specific role you want." },
  { icon: Sparkles, color: "text-pink-600", bg: "bg-pink-50", title: "Interview Q&A", desc: "Generate realistic interview questions with AI-powered model answers." },
  { icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50", title: "Job Role Matcher", desc: "Discover the best-fit job roles based on your skills and experience." },
  { icon: Lightbulb, color: "text-orange-600", bg: "bg-orange-50", title: "Skill Suggestions", desc: "Identify trending and missing skills to strengthen your career profile." },
  { icon: Headphones, color: "text-teal-600", bg: "bg-teal-50", title: "Support", desc: "Reach our team anytime for help, feedback, or feature requests." },
];

const steps = [
  { n: "01", title: "Enter Your Details", desc: "Provide your name, skills, education, and target role in a simple form." },
  { n: "02", title: "AI Generates Content", desc: "Gemini AI crafts optimized summaries, emails, and interview prep tailored to you." },
  { n: "03", title: "Review & Export", desc: "Copy or save your AI-generated content instantly — no design skills needed." },
];

const testimonials = [
  { name: "Aarav Mehta", role: "Computer Science Student", text: "The AI summary generator saved me hours. My resume now looks professional and recruiter-ready." },
  { name: "Neha Kapoor", role: "Marketing Intern", text: "The cold email tool helped me connect with startups — I received two internship offers within a week." },
  { name: "Rohit Sharma", role: "Full-Stack Developer", text: "Clean UI and excellent Gemini AI integration. Feels like a real enterprise SaaS product." },
];

const faqs = [
  { q: "Is my data stored securely?", a: "Yes. Your profile data is encrypted and stored in PostgreSQL with Clerk authentication protecting your account." },
  { q: "Which AI model powers this?", a: "Elevatr uses Google's Gemini 2.5 Flash model for generating summaries, skills, emails, and interview content." },
  { q: "Can I download my results?", a: "Yes — all generated content can be copied to clipboard or exported instantly." },
  { q: "Do I need an account?", a: "Yes. Sign in with Clerk to save your profile and access the full feature set across sessions." },
];

export default function HomePage() {
  return (
    <main className="bg-white text-slate-800">

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center text-center py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.08),transparent)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8"
        >
          <Sparkles size={14} />
          Powered by Gemini AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-4xl"
        >
          Build a Career Profile
          <br />
          <span className="text-emerald-600">That Gets Noticed</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl text-lg text-slate-500 mt-6 leading-relaxed"
        >
          AI-powered summaries, resume analysis, cold emails, and interview prep — everything you need to land your next role.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center mt-10"
        >
          <Link href="/dashboard">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md px-8 gap-2">
              Get Started Free <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8">
              View Pricing
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 gap-12 mt-20 max-w-lg mx-auto"
        >
          {[["10K+", "Profiles Built"], ["1.2K+", "Resumes Improved"], ["98%", "Satisfaction Rate"]].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="text-3xl font-bold text-slate-900">{val}</div>
              <div className="text-sm text-slate-500 mt-1">{lbl}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Everything you need to stand out
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              A full suite of AI tools designed to accelerate your job search and career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, color, bg, title, desc }) => (
              <motion.div
                key={title}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white border border-slate-100 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              How it works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Three steps to a better profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map(({ n, title, desc }) => (
              <motion.div
                key={n}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white border border-slate-100 rounded-xl p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl font-black text-emerald-100 mb-4">{n}</div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Trusted by students and professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text }) => (
              <motion.div
                key={name}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white border border-slate-100 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">"{text}"</p>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{name}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 mt-3">Everything you need to know before getting started.</p>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-slate-100 rounded-xl px-4">
                <AccordionTrigger className="text-left font-medium text-slate-900 hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-slate-500 text-sm pb-4">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to elevate your career?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-md mx-auto">
            Join thousands of users using AI to get ahead. No design skills or templates needed.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 shadow-md">
                Start for Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-emerald-400 text-white hover:bg-emerald-700 px-8">
                See Plans
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-emerald-100 text-sm">
            {["No credit card required", "Free plan available", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-200" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
