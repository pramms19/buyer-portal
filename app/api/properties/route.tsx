import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 
export async function GET() {
  try {
    
    return NextResponse.json(db.properties);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}