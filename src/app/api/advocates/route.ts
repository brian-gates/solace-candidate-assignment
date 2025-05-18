import db from "@/db";
import { advocates } from "@/db/schema";
import { and, ilike, or, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const search = searchParams.get("search")?.trim();
  const specialtiesParam = searchParams.get("specialties");
  const specialties = specialtiesParam ? specialtiesParam.split(",") : [];

  const searchWhere = search
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

  // Case-insensitive specialties filter for jsonb array or scalar
  const specialtiesWhere = specialties.length
    ? sql`EXISTS (
        SELECT 1 FROM jsonb_array_elements_text(
          CASE
            WHEN jsonb_typeof(${advocates.specialties}) = 'array' THEN ${
        advocates.specialties
      }
            ELSE jsonb_build_array(${advocates.specialties})
          END
        ) AS specialty
        WHERE LOWER(specialty) IN (${specialties
          .map((s) => s.trim().toLowerCase())
          .join(",")})
      )`
    : undefined;

  const where =
    searchWhere && specialtiesWhere
      ? and(searchWhere, specialtiesWhere)
      : searchWhere || specialtiesWhere || undefined;

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
