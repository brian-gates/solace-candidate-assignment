"use client";

import { AdvocateCard } from "@/components/ui/advocate-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useRef, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

const badgeColors = [
  "bg-green-100 text-green-800 border-green-200",
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-orange-100 text-orange-800 border-orange-200",
  "bg-red-100 text-red-800 border-red-200",
  "bg-cyan-100 text-cyan-800 border-cyan-200",
  "bg-teal-100 text-teal-800 border-teal-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
  "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  "bg-lime-100 text-lime-800 border-lime-200",
  "bg-amber-100 text-amber-800 border-amber-200",
  "bg-rose-100 text-rose-800 border-rose-200",
];

/**
 * Get a deterministic color for a given string.
 */
export function getDeterministicColor(text: string) {
  const hash = Array.from(text).reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
    0
  );
  const idx = Math.abs(hash) % badgeColors.length;
  return badgeColors[idx];
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const tableRef = useRef<HTMLDivElement>(null);
  const hasMore = advocates.length < total;

  const fetchAdvocates = useCallback(async (pageNum: number) => {
    setLoading(true);
    const offset = (pageNum - 1) * limit;
    const res = await fetch(`/api/advocates?limit=${limit}&offset=${offset}`);
    const json = await res.json();
    setAdvocates((prev) => [...prev, ...json.data]);
    setFilteredAdvocates((prev) => [...prev, ...json.data]);
    setTotal(json.total ?? json.data.length);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAdvocates(page);
  }, [page, fetchAdvocates]);

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
    const searchTerm = e.target.value;
    const searchTermSpan = document.getElementById("search-term");
    if (searchTermSpan) searchTermSpan.innerHTML = searchTerm;
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTermLower) ||
        advocate.lastName.toLowerCase().includes(searchTermLower) ||
        advocate.city.toLowerCase().includes(searchTermLower) ||
        advocate.degree.toLowerCase().includes(searchTermLower) ||
        advocate.specialties
          .join(",")
          .toLowerCase()
          .includes(searchTermLower) ||
        advocate.yearsOfExperience.toString().includes(searchTermLower)
      );
    });
    setFilteredAdvocates(filtered);
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
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
                className="w-full"
              />
            </div>
            <Button
              onClick={onClick}
              variant="outline"
              className="w-full md:w-auto"
            >
              Reset Search
            </Button>
          </div>
          <div className="mb-2 text-sm text-muted-foreground text-center">
            Showing {filteredAdvocates.length} of {total} total results
          </div>
          <div ref={tableRef}>
            <div className="flex flex-col gap-4">
              {filteredAdvocates.map((advocate, i) => (
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
