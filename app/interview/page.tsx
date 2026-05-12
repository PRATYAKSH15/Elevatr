import React from "react";
import UploadResume from "./UploadResume";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Headphones } from "lucide-react";

export const metadata = {
  title: "Interview Q&A Generator — Elevatr",
  description: "Upload your resume and generate realistic interview questions & answers using AI.",
};

export default async function InterviewPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="text-center bg-white border border-slate-100 rounded-xl p-10 shadow-sm max-w-sm w-full">
          <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Headphones size={20} className="text-pink-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Sign in required</h2>
          <p className="text-slate-500 text-sm mb-6">You need to be signed in to use the Interview Q&A generator.</p>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
            <Headphones size={16} className="text-pink-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Interview Q&A Generator</h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">
          Upload your resume as a PDF and get 10 tailored interview questions with professional answers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <UploadResume />
        </div>
      </div>
    </main>
  );
}
