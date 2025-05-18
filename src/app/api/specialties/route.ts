import db from "@/db";
import { advocates } from "@/db/schema";

export async function GET() {
  // Get all specialties arrays from all advocates
  const rows = await db
    .select({ specialties: advocates.specialties })
    .from(advocates);
  // Flatten and deduplicate
  const all = rows.flatMap((row) =>
    Array.isArray(row.specialties) ? row.specialties : []
  );
  const unique = Array.from(new Set(all)).sort();
  return Response.json({ specialties: unique });
}
