"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

type QAItem = { question: string; answer: string; tests?: string };
type Props = { raw: string };

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 border border-slate-200 bg-white px-3 py-1.5 rounded-lg transition-colors"
    >
      {copied ? <><Check size={12} className="text-emerald-600" /> Copied</> : <><Copy size={12} /> Copy</>}
    </button>
  );
}

export default function InterviewResults({ raw }: Props) {
  if (!raw) return null;

  let qaData: QAItem[] = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) qaData = parsed;
  } catch {
    qaData = [];
  }

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-slate-900 mb-4">Generated Interview Q&A</h2>

      {qaData.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-2">
          {qaData.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`q-${idx}`}
              className="border border-slate-100 rounded-xl bg-white overflow-hidden"
            >
              <AccordionTrigger className="text-left px-5 py-4 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors w-full flex justify-between items-center">
                <span>{idx + 1}. {item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 bg-slate-50 space-y-3 text-slate-600 text-sm">
                <p className="leading-relaxed"><span className="font-medium text-slate-700">Answer:</span> {item.answer}</p>
                {item.tests && (
                  <p className="text-xs text-slate-500">
                    <span className="font-medium">Skill Tested:</span> {item.tests}
                  </p>
                )}
                <CopyButton text={`Q: ${item.question}\nA: ${item.answer}${item.tests ? `\nSkill Tested: ${item.tests}` : ""}`} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="prose prose-sm max-w-none bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-700">
          <ReactMarkdown>{raw}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
