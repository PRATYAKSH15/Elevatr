import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const profile = await prisma.profile.create({
      data: {
        userId,
        name: body.name,
        email: body.email,
        education: body.education,
        skills: body.skills,
        summary: body.summary,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.profile.findFirst({
    where: { userId },
  });

  return NextResponse.json(profile);
}
