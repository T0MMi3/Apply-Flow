import { NextResponse } from "next/server";
import { applications } from "@/lib/data";

export async function GET() {
  return NextResponse.json(applications);
}