import { getUser } from "@/lib/getUser";

export async function GET() {
  const user = await getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({
    name: user.name,
    role: user.role,
  });
}