import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Login request received:", data);
  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
