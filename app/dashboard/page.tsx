import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">AI Profile Builder</h1>
      <ProfileForm />
    </div>
  );
}
