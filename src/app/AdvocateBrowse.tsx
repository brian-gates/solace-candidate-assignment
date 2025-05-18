"use client";
import { AdvocateCard } from "@/components/ui/advocate-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SpecialtyPicker from "@/components/ui/specialty-picker";
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
  initialSpecialties,
  initialSelectedSpecialties,
}: {
  initialData: { data: Advocate[]; total: number };
  initialSearch: string;
  initialSpecialties: string[];
  initialSelectedSpecialties: string[];
}) {
  const [advocates, setAdvocates] = useState<Advocate[]>(initialData.data);
  const [total, setTotal] = useState<number>(
    initialData.total ?? initialData.data.length
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [specialties, setSpecialties] = useState<string[]>(initialSpecialties);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    initialSelectedSpecialties
  );
  const limit = 10;
  const hasMore = advocates.length < total;
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchAdvocates = useCallback(
    async (pageNum: number, search: string, specialties: string[]) => {
      setLoading(true);
      const offset = (pageNum - 1) * limit;
      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
      });
      if (search) params.set("search", search);
      if (specialties.length) params.set("specialties", specialties.join(","));
      const res = await fetch(`/api/advocates?${params.toString()}`);
      const json = await res.json();
      setAdvocates((prev) =>
        pageNum === 1 ? json.data : [...prev, ...json.data]
      );
      setTotal(json.total ?? json.data.length);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    fetchAdvocates(page, searchTerm, selectedSpecialties);
  }, [page, fetchAdvocates, searchTerm, selectedSpecialties]);

  useEffect(() => {
    setPage(1);
    const handler = setTimeout(() => {
      fetchAdvocates(1, searchTerm, selectedSpecialties);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, selectedSpecialties, fetchAdvocates]);

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
    if (selectedSpecialties.length)
      params.set("specialties", selectedSpecialties.join(","));
    router.replace(`/?${params.toString()}`);
    const searchTermSpan = document.getElementById("search-term");
    if (searchTermSpan) searchTermSpan.innerHTML = e.target.value;
  };

  const onClick = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    if (selectedSpecialties.length)
      params.set("specialties", selectedSpecialties.join(","));
    router.replace(`/?${params.toString()}`);
  };

  const onSpecialtyToggle = (specialty: string) => {
    const next = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter((s) => s !== specialty)
      : [...selectedSpecialties, specialty];
    setSelectedSpecialties(next);
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) params.set("search", searchTerm);
    if (next.length) params.set("specialties", next.join(","));
    else params.delete("specialties");
    router.replace(`/?${params.toString()}`);
  };

  return (
    <main style={{ margin: "24px" }}>
      <Card className="max-w-5xl mx-auto p-6 shadow-lg">
        <CardContent className="p-0">
          <h1 className="text-4xl font-bold my-6 text-center">
            Solace Advocates
          </h1>
          <SpecialtyPicker
            specialties={specialties}
            selectedSpecialties={selectedSpecialties}
            onChange={onSpecialtyToggle}
          />
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search advocates..."
                onChange={onChange}
                value={searchTerm}
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
