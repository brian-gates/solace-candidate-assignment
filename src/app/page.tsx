"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const searchTermSpan = document.getElementById("search-term");
    if (searchTermSpan) searchTermSpan.innerHTML = searchTerm;
    const searchTermLower = searchTerm.toLowerCase();
    const filteredAdvocates = advocates.filter((advocate) => {
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
    setFilteredAdvocates(filteredAdvocates);
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
          <div className="mb-4 text-sm text-muted-foreground text-center">
            Searching for:{" "}
            <span id="search-term" className="font-medium text-primary"></span>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Years of Experience</TableHead>
                  <TableHead>Phone Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdvocates.map((advocate, i) => (
                  <TableRow key={advocate.phoneNumber + i}>
                    <TableCell>{advocate.firstName}</TableCell>
                    <TableCell>{advocate.lastName}</TableCell>
                    <TableCell>{advocate.city}</TableCell>
                    <TableCell>{advocate.degree}</TableCell>
                    <TableCell>
                      {advocate.specialties.map((s, j) => (
                        <div key={s + j}>{s}</div>
                      ))}
                    </TableCell>
                    <TableCell>{advocate.yearsOfExperience}</TableCell>
                    <TableCell>{advocate.phoneNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
