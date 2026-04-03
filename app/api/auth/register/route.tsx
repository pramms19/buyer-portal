import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existing = db.users.find((u) => u.email === email);
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    db.users.push({
      id: uuid(),
      name,
      email,
      password: hashed,
      role: "buyer",
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}