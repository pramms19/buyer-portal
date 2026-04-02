import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";

export async function GET() {
  const user = await getUser(); // ✅ FIX

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favs = db.favourites
    .filter((f) => f.userId === user.id)
    .map((f) => ({
      ...f,
      property: db.properties.find((p) => p.id === f.propertyId),
    }));

  return Response.json(favs);
}

export async function POST(req: Request) {
  const user = await getUser(); // ✅ FIX

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = await req.json();

  const exists = db.favourites.find(
    (f) => f.userId === user.id && f.propertyId === propertyId,
  );

  if (exists) {
    return Response.json({ error: "Already added" }, { status: 400 });
  }

  db.favourites.push({ userId: user.id, propertyId });

  return Response.json({ message: "Added" });
}

export async function DELETE(req: Request) {
  const user = await getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = await req.json();

  db.favourites = db.favourites.filter(
    (f) => !(f.userId === user.id && f.propertyId === propertyId),
  );

  return Response.json({ message: "Removed" });
}
