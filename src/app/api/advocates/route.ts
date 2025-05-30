import { desc, ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const search = searchParams.get("search")?.trim();
  const sort = searchParams.get("sort") || "firstName-asc";

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

  const orderBy =
    sort === "firstName-desc"
      ? desc(advocates.firstName)
      : sort === "lastName-asc"
      ? advocates.lastName
      : sort === "lastName-desc"
      ? desc(advocates.lastName)
      : sort === "city-asc"
      ? advocates.city
      : sort === "city-desc"
      ? desc(advocates.city)
      : sort === "degree-asc"
      ? advocates.degree
      : sort === "degree-desc"
      ? desc(advocates.degree)
      : sort === "specialties-asc"
      ? advocates.specialties
      : advocates.firstName;

  const data = await db
    .select()
    .from(advocates)
    .where(where)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates)
    .where(where);

  return Response.json({ data, total: Number(count) });
}
