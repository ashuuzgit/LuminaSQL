import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const formData = await req.formData();

  const response = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}