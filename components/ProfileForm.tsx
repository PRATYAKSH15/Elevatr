"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Save, CheckCircle, Lightbulb } from "lucide-react";

export default function ProfileForm() {
  const [form, setForm] = useState({ name: "", email: "", education: "", skills: "" });
  const [summary, setSummary] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateAI = async () => {
    setLoading(true);
    setSummary("");
    setSuggestions("");
    const skillsArray = form.skills.split(",").map((s) => s.trim());

    const [summaryRes, skillsRes] = await Promise.all([
      fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, skills: skillsArray }),
      }),
      fetch("/api/suggest-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillsArray }),
      }),
    ]);

    const [summaryData, skillsData] = await Promise.all([summaryRes.json(), skillsRes.json()]);
    setSummary(summaryData.summary);
    setSuggestions(skillsData.suggestion);
    setLoading(false);
  };

  const saveProfile = async () => {
    const skillsArray = form.skills.split(",").map((s) => s.trim());
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, skills: skillsArray, summary }),
    });
    if (res.ok) setSaved(true);
  };

  const isFormFilled = form.name && form.email && form.skills;

  return (
    <div className="space-y-5">
      {/* Form Fields */}
      <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-slate-900">Your Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Full Name</label>
            <Input name="name" placeholder="e.g. Priya Sharma" value={form.name} onChange={handleChange}
              className="border-slate-200 focus:border-emerald-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Email</label>
            <Input name="email" placeholder="e.g. priya@example.com" value={form.email} onChange={handleChange}
              className="border-slate-200 focus:border-emerald-400" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Education</label>
          <Input name="education" placeholder="e.g. B.Tech Computer Science, IIT Delhi" value={form.education} onChange={handleChange}
            className="border-slate-200 focus:border-emerald-400" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Skills</label>
          <Textarea name="skills" placeholder="e.g. React, Node.js, Python, SQL" value={form.skills} onChange={handleChange}
            className="border-slate-200 focus:border-emerald-400 resize-none" rows={3} />
          <p className="text-xs text-slate-400 mt-1">Separate skills with commas</p>
        </div>

        <Button
          onClick={generateAI}
          disabled={loading || !isFormFilled}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-2"
        >
          <Sparkles size={15} />
          {loading ? "Generating with AI..." : "Generate with AI"}
        </Button>
      </div>

      {/* AI Summary */}
      {summary && (
        <div className="bg-white border border-emerald-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-emerald-50 rounded-md flex items-center justify-center">
              <Sparkles size={13} className="text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">AI Profile Summary</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Skill Suggestions */}
      {suggestions && (
        <div className="bg-white border border-amber-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-amber-50 rounded-md flex items-center justify-center">
              <Lightbulb size={13} className="text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">Suggested Skills</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{suggestions}</p>
        </div>
      )}

      {/* Save Button */}
      {summary && (
        <Button
          onClick={saveProfile}
          variant="outline"
          className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 gap-2"
          disabled={saved}
        >
          {saved
            ? <><CheckCircle size={15} className="text-emerald-600" /> Profile Saved</>
            : <><Save size={15} /> Save Profile</>}
        </Button>
      )}
    </div>
  );
}
