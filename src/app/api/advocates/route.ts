import { ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const search = searchParams.get("search")?.trim();

  const where = search
    ? or(
        ilike(advocates.firstName, `%${search.toLowerCase()}%`),
        ilike(advocates.lastName, `%${search.toLowerCase()}%`),
        ilike(advocates.city, `%${search.toLowerCase()}%`),
        ilike(advocates.degree, `%${search.toLowerCase()}%`),
        sql`${
          advocates.specialties
        }::text ILIKE ${`%${search.toLowerCase()}%`}`,
        sql`CAST(${
          advocates.yearsOfExperience
        } AS TEXT) ILIKE ${`%${search.toLowerCase()}%`}`
      )
    : undefined;

  const data = await db
    .select()
    .from(advocates)
    .where(where)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates)
    .where(where);

  return Response.json({ data, total: Number(count) });
}
