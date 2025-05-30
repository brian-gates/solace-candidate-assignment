import AdvocateBrowse from "./advocate-browse";

async function fetchInitialAdvocates(search: string, sort: string) {
  const params = new URLSearchParams({ limit: "10", offset: "0" });
  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL
      ? `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/solace/api/advocates?${params.toString()}`
      : `http://localhost:3003/solace/api/advocates?${params.toString()}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string; sort?: string };
}) {
  const initialSearch = searchParams?.search ?? "";
  const initialSort = searchParams?.sort ?? "firstName-asc";
  const initialData = await fetchInitialAdvocates(initialSearch, initialSort);
  return (
    <AdvocateBrowse
      initialData={initialData}
      initialSearch={initialSearch}
      initialSort={initialSort}
    />
  );
}
