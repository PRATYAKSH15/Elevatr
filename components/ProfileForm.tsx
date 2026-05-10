"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
  });

  const [summary, setSummary] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateAI = async () => {
    setLoading(true);
    setSummary("");
    setSuggestions("");

    const skillsArray = form.skills.split(",").map((s) => s.trim());

    const summaryRes = await fetch("/api/generate-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, skills: skillsArray }),
    });
    const summaryData = await summaryRes.json();

    const skillsRes = await fetch("/api/suggest-skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: skillsArray }),
    });
    const skillsData = await skillsRes.json();

    setSummary(summaryData.summary);
    setSuggestions(skillsData.suggestion);
    setLoading(false);
  };

  const saveProfile = async () => {
    const skillsArray = form.skills.split(",").map((s) => s.trim());
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        skills: skillsArray,
        summary,
      }),
    });
    if (res.ok) setSaved(true);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 shadow p-6 rounded-xl space-y-4 border">
      <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <Input name="education" placeholder="Education" value={form.education} onChange={handleChange} />
      <Textarea
        name="skills"
        placeholder="Enter comma-separated skills (e.g. React, Node, SQL)"
        value={form.skills}
        onChange={handleChange}
      />

      <Button onClick={generateAI} disabled={loading}>
        {loading ? "Generating..." : "Generate with AI"}
      </Button>

      {summary && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <h2 className="font-semibold mb-1">AI Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {suggestions && (
        <div className="mt-4 p-3 bg-green-50 rounded">
          <h2 className="font-semibold mb-1">Suggested Skills</h2>
          <p>{suggestions}</p>
        </div>
      )}

      {summary && (
        <Button onClick={saveProfile} variant="outline">
          {saved ? "Saved ✅" : "Save Profile"}
        </Button>
      )}
    </div>
  );
}
