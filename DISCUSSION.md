# Features Implemented

- Infinite scroll and pagination  
  [PR 10: feat: infinite scroll, card view, and improved seed for advocates](https://github.com/brian-gates/solace-candidate-assignment/pull/10)  
  [PR 11: Advocate Browse Refactor & Improvements](https://github.com/brian-gates/solace-candidate-assignment/pull/11)

- Search across multiple advocate fields, case-insensitive  
  [PR 8: fix: make advocate search case-insensitive for all string fields](https://github.com/brian-gates/solace-candidate-assignment/pull/8)  
  [PR 11: Advocate Browse Refactor & Improvements](https://github.com/brian-gates/solace-candidate-assignment/pull/11)

- Modern, responsive UI with Tailwind and custom components  
  [PR 9: Chore/UI improvements](https://github.com/brian-gates/solace-candidate-assignment/pull/9)  
  [PR 10: feat: infinite scroll, card view, and improved seed for advocates](https://github.com/brian-gates/solace-candidate-assignment/pull/10)  
  [PR 11: Advocate Browse Refactor & Improvements](https://github.com/brian-gates/solace-candidate-assignment/pull/11)

- REST API for advocates with pagination, search, and total count  
  [PR 10: feat: infinite scroll, card view, and improved seed for advocates](https://github.com/brian-gates/solace-candidate-assignment/pull/10)  
  [PR 11: Advocate Browse Refactor & Improvements](https://github.com/brian-gates/solace-candidate-assignment/pull/11)

- API endpoint for unique specialties  
  [PR 11: Advocate Browse Refactor & Improvements](https://github.com/brian-gates/solace-candidate-assignment/pull/11)

- Seed script for diverse advocate data  
  [PR 10: feat: infinite scroll, card view, and improved seed for advocates](https://github.com/brian-gates/solace-candidate-assignment/pull/10)

- TypeScript with type inference and explicit types  
  [PR 5: fix: correct table structure, add types, and resolve linter errors](https://github.com/brian-gates/solace-candidate-assignment/pull/5)  
  [PR 6: fix: use number for yearsOfExperience and phoneNumber in Advocate type](https://github.com/brian-gates/solace-candidate-assignment/pull/6)

- Linter and type errors addressed  
  [PR 5: fix: correct table structure, add types, and resolve linter errors](https://github.com/brian-gates/solace-candidate-assignment/pull/5)

- Always export real db instance, error if DATABASE_URL missing  
  [PR 7: chore: always export real db instance, throw if DATABASE_URL is missing](https://github.com/brian-gates/solace-candidate-assignment/pull/7)

# Potential Improvements

- Refactor specialties to their own table with IDs and better indexing ([PR 12: spedialties wip](https://github.com/brian-gates/solace-candidate-assignment/pull/12))
- Add filtering by specialty, city, or other fields
- Add advocate detail pages with more information and clickable links
- Add sorting options (e.g., by experience, name)
- Add authentication and advocate management (CRUD)
- Add unit and integration tests for API and UI
- Further improve accessibility (a11y)
- Remove any remaining client-side state that could be handled by server actions or form mutations
