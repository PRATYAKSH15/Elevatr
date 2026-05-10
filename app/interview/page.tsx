// app/interview/page.tsx
import React from "react";
import UploadResume from "./UploadResume";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const metadata = {
  title: "Interview Q&A Generator",
  description:
    "Upload your resume and generate realistic interview questions & answers using AI.",
};

export default async function InterviewPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg mb-4">Please log in to continue.</p>
        <Link
          href="/sign-in"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full flex flex-col items-center">
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            AI Interview Q&A Generator
          </h1>
          <p className="text-base opacity-90">
            Turn your resume into tailored interview questions and answers — instantly.
          </p>
        </div>
      </section>

      <section className="w-full max-w-3xl mx-auto p-8 -mt-10 bg-white rounded-xl shadow-xl border">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">
          Upload your resume (PDF)
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          AI extracts your skills and experience to generate realistic interview questions
          with professional answers.
        </p>

        <UploadResume />
      </section>
    </main>
  );
}
