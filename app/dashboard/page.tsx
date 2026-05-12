import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";
import { Brain } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
            <Brain size={16} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">AI Profile Builder</h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">
          Fill in your details and let Gemini AI craft your professional profile summary and skill suggestions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <ProfileForm />
      </div>
    </main>
  );
}
