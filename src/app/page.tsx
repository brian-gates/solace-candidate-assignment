import AdvocateBrowse from "./advocate-browse";

async function fetchInitialAdvocates(search: string) {
  const params = new URLSearchParams({ limit: "10", offset: "0" });
  if (search) params.set("search", search);
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/advocates?${params.toString()}`
      : `http://localhost:3003/api/advocates?${params.toString()}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const initialSearch = searchParams?.search ?? "";
  const initialData = await fetchInitialAdvocates(initialSearch);
  return (
    <AdvocateBrowse initialData={initialData} initialSearch={initialSearch} />
  );
}
