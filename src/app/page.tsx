import AdvocateBrowse from "./AdvocateBrowse";

async function fetchInitialAdvocates(search: string) {
  const params = new URLSearchParams({ limit: "10", offset: "0" });
  if (search) params.set("search", search);
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/advocates?${params.toString()}`
      : `http://localhost:3000/api/advocates?${params.toString()}`,
    { cache: "no-store" }
  );
  return res.json();
}

async function fetchInitialSpecialties() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/specialties`
      : `http://localhost:3000/api/specialties`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string; specialties?: string };
}) {
  const initialSearch = searchParams?.search ?? "";
  const initialSelectedSpecialties =
    searchParams?.specialties?.split(",") ?? [];
  const [initialData, specialtiesData] = await Promise.all([
    fetchInitialAdvocates(initialSearch),
    fetchInitialSpecialties(),
  ]);
  return (
    <AdvocateBrowse
      initialData={initialData}
      initialSearch={initialSearch}
      initialSpecialties={specialtiesData.specialties ?? []}
      initialSelectedSpecialties={initialSelectedSpecialties}
    />
  );
}
