import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = db.users.find((u) => u.email === email);
  if (existing) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  db.users.push({
    id: uuid(),
    name,
    email,
    password: hashed,
    role: "buyer",
  });

  return Response.json({ message: "User created successfully" });
}
