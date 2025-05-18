const firstNames = [
  "John",
  "Jane",
  "Alice",
  "Michael",
  "Emily",
  "Chris",
  "Jessica",
  "David",
  "Laura",
  "Daniel",
  "Sarah",
  "James",
  "Megan",
  "Joshua",
  "Amanda",
  "Brian",
  "Olivia",
  "Ethan",
  "Sophia",
  "Matthew",
];
const lastNames = [
  "Doe",
  "Smith",
  "Johnson",
  "Brown",
  "Davis",
  "Martinez",
  "Taylor",
  "Harris",
  "Clark",
  "Lewis",
  "Lee",
  "King",
  "Green",
  "Walker",
  "Hall",
  "Young",
  "Allen",
  "Wright",
  "Scott",
  "Hill",
];
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "San Francisco",
  "Columbus",
  "Fort Worth",
  "Charlotte",
  "Seattle",
  "Denver",
  "El Paso",
  "Detroit",
];
const degrees = ["MD", "PhD", "MSW"];

const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

const randomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const randomSpecialty = () => {
  const start = Math.floor(Math.random() * (specialties.length - 2));
  const end = start + 1 + Math.floor(Math.random() * 3);
  return specialties.slice(start, Math.min(end, specialties.length));
};

const advocateData = Array.from({ length: 50 }).map(() => ({
  firstName: randomItem(firstNames),
  lastName: randomItem(lastNames),
  city: randomItem(cities),
  degree: randomItem(degrees),
  specialties: randomSpecialty(),
  yearsOfExperience: Math.floor(Math.random() * 20) + 1,
  phoneNumber: Math.floor(5550000000 + Math.random() * 10000000),
}));

export { advocateData };
