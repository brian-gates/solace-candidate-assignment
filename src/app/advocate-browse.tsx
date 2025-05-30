"use client";

import { AdvocateCard } from "@/components/ui/advocate-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

export default function AdvocateBrowse({
  initialData,
  initialSearch,
  initialSort = "firstName-asc",
}: {
  initialData: { data: Advocate[]; total: number };
  initialSearch: string;
  initialSort?: string;
}) {
  const [advocates, setAdvocates] = useState<Advocate[]>(initialData.data);
  const [total, setTotal] = useState<number>(
    initialData.total ?? initialData.data.length
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(
    () => searchParams.get("sort") || initialSort
  );
  const limit = 10;
  const hasMore = advocates.length < total;

  const fetchAdvocates = useCallback(
    async (pageNum: number, search: string, sortValue: string) => {
      setLoading(true);
      const offset = (pageNum - 1) * limit;
      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
      });
      if (search) params.set("search", search);
      if (sortValue) params.set("sort", sortValue);
      const res = await fetch(`/solace/api/advocates?${params.toString()}`);
      const json = await res.json();
      setAdvocates((prev) => {
        if (pageNum === 1) return [...json.data];
        return [...prev, ...json.data];
      });
      setTotal(json.total ?? json.data.length);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    fetchAdvocates(page, searchTerm, sort);
  }, [page, fetchAdvocates, searchTerm, sort]);

  useEffect(() => {
    setPage(1);
    const handler = setTimeout(() => {
      fetchAdvocates(1, searchTerm, sort);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, sort, fetchAdvocates]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((p) => (hasMore ? p + 1 : p));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    params.set("sort", sort);
    router.replace(`/?${params.toString()}`);
    const searchTermSpan = document.getElementById("search-term");
    if (searchTermSpan) searchTermSpan.innerHTML = e.target.value;
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) params.set("search", searchTerm);
    params.set("sort", e.target.value);
    router.replace(`/?${params.toString()}`);
  };

  const onClick = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("sort", sort);
    router.replace(`/?${params.toString()}`);
  };

  return (
    <main style={{ margin: "24px" }}>
      <Card className="max-w-5xl mx-auto p-6 shadow-lg">
        <CardContent className="p-0">
          <h1 className="text-4xl font-bold my-6 text-center">
            Solace Advocates
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search advocates..."
                onChange={onChange}
                value={searchTerm}
                className="w-full"
              />
            </div>
            <select
              value={sort}
              onChange={onSortChange}
              className="border rounded-md px-3 py-2 text-base md:w-auto w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-background"
            >
              <option value="firstName-asc">First Name (A-Z)</option>
              <option value="firstName-desc">First Name (Z-A)</option>
              <option value="lastName-asc">Last Name (A-Z)</option>
              <option value="lastName-desc">Last Name (Z-A)</option>
              <option value="city-asc">City (A-Z)</option>
              <option value="city-desc">City (Z-A)</option>
              <option value="degree-asc">Degree (A-Z)</option>
              <option value="degree-desc">Degree (Z-A)</option>
              <option value="specialties-asc">Specialties (A-Z)</option>
            </select>
            <Button
              onClick={onClick}
              variant="outline"
              className="w-full md:w-auto"
            >
              Reset Search
            </Button>
          </div>
          <div className="mb-2 text-sm text-muted-foreground text-center">
            Showing {advocates.length} of {total} total results
          </div>
          <div>
            <div className="flex flex-col gap-4">
              {advocates.map((advocate, i) => (
                <AdvocateCard
                  key={advocate.phoneNumber + i}
                  advocate={advocate}
                />
              ))}
            </div>
            {loading && (
              <div className="text-center py-4 text-muted-foreground">
                Loading...
              </div>
            )}
            {!hasMore && (
              <div className="text-center py-4 text-muted-foreground">
                End of results.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
