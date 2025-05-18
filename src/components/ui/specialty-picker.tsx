"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function SpecialtyPicker({
  specialties,
  selectedSpecialties,
  onChange,
}: {
  specialties: string[];
  selectedSpecialties: string[];
  onChange: (specialty: string) => void;
}) {
  return (
    <Card className="mb-4">
      <CardContent className="flex flex-wrap gap-2 p-4">
        {specialties.map((specialty) => (
          <label
            key={specialty}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Checkbox
              checked={selectedSpecialties.includes(specialty)}
              onCheckedChange={() => onChange(specialty)}
              className="accent-primary"
            />
            <Badge variant="deterministic">{specialty}</Badge>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
