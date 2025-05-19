# PRs

1. [fix: specify Node.js version requirements](https://github.com/brian-gates/solace-candidate-assignment/pull/1)
2. [Fix nvm version](https://github.com/brian-gates/solace-candidate-assignment/pull/2)
3. [fix drizzle config](https://github.com/brian-gates/solace-candidate-assignment/pull/3)
4. [Fetches advocates from the database](https://github.com/brian-gates/solace-candidate-assignment/pull/4)
5. [fix: correct table structure, add types, and resolve linter errors](https://github.com/brian-gates/solace-candidate-assignment/pull/5)
6. [fix: use number for yearsOfExperience and phoneNumber in Advocate type](https://github.com/brian-gates/solace-candidate-assignment/pull/6)
7. [chore: always export real db instance, throw if DATABASE_URL is missing](https://github.com/brian-gates/solace-candidate-assignment/pull/7)
8. [fix: make advocate search case-insensitive for all string fields](https://github.com/brian-gates/solace-candidate-assignment/pull/8)
9. [Chore/UI improvements](https://github.com/brian-gates/solace-candidate-assignment/pull/9)
10. [feat: infinite scroll, card view, and improved seed for advocates](https://github.com/brian-gates/solace-candidate-assignment/pull/10)
11. [Advocate Browse Refactor & Improvements](https://github.com/brian-gates/solace-candidate-assignment/pull/11)
12. [specialties wip](https://github.com/brian-gates/solace-candidate-assignment/pull/12)

# Potential Improvements

- Refactor specialties to their own table with IDs and better indexing ([PR 12: specialties wip](https://github.com/brian-gates/solace-candidate-assignment/pull/12))
- Add filtering by specialty, city, or other fields, to the API and UI
- Add advocate detail pages with more information and clickable links
- Add sorting options (e.g., by experience, name)
- Add authentication and advocate management (CRUD)
- Add unit and integration tests for API and UI
- Further improve accessibility (a11y)
- Remove any remaining client-side state that could be handled by server actions or form mutations
- Debounce user input in search field to prevent unnecessary API calls / mitigate race conditions
- Ensure all functions and components are properly memoized or cached. Ensure no more renders than necessary.
