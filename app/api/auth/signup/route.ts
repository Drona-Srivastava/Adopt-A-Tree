import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Signup request received:", data);
  return NextResponse.json({ message: "Signup successful" }, { status: 200 });
}
