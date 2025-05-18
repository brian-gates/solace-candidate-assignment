import { sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);

  const data = await db.select().from(advocates).limit(limit).offset(offset);
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates);

  return Response.json({ data, total: Number(count) });
}
