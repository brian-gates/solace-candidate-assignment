import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getDeterministicColor } from "@/lib/get-deterministic-color";

export function AdvocateCard({
  advocate,
}: {
  advocate: {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: number;
  };
}) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="text-xl font-semibold">
          {advocate.firstName} {advocate.lastName}
        </div>
        <div className="text-sm text-muted-foreground">
          {advocate.city} &middot; {advocate.degree}
        </div>
        <div className="flex flex-wrap gap-1 my-1">
          {advocate.specialties.map((s, j) => (
            <Badge
              key={s + j}
              className={`mr-1 mb-1 inline-block border transition-colors duration-150 ${getDeterministicColor(
                s
              )} hover:bg-black/80 hover:text-white hover:border-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
            >
              {s}
            </Badge>
          ))}
        </div>
        <div className="text-sm">
          <span className="font-medium">Experience:</span>{" "}
          {advocate.yearsOfExperience} years
        </div>
        <div className="text-sm">
          <span className="font-medium">Phone:</span> {advocate.phoneNumber}
        </div>
      </CardContent>
    </Card>
  );
}
