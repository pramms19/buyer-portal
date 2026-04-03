import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth"; // Import your helper

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // 1. Look for 'token'

  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = verifyToken(token) as { id: string }; // 2. Verify JWT
    const userFavs = db.favourites.filter((f) => f.userId === decoded.id);
    return NextResponse.json(userFavs);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = verifyToken(token) as { id: string };
    const { propertyId } = await req.json();

    const exists = db.favourites.find(
      (f) => f.userId === decoded.id && f.propertyId === propertyId,
    );
    if (!exists) {
      db.favourites.push({ userId: decoded.id, propertyId });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = verifyToken(token) as { id: string };
    const { propertyId } = await req.json();

    db.favourites = db.favourites.filter(
      (f) => !(f.userId === decoded.id && f.propertyId === propertyId),
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
