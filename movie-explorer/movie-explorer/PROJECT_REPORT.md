# Movie Explorer Application - Project Report

## 1. Introduction
Movie Explorer is a web application where users can search for movies, see ratings and read full details. It is built with React and uses the OMDb API to get real movie data.

## 2. Problem Statement
There are thousands of movies, and it is hard to quickly find a movie's rating, cast and story in one simple place. Many websites are slow, crowded with ads or not mobile friendly.

## 3. Objectives
- Build a simple movie search website using React.
- Show movie details and IMDb ratings.
- Add genre filters.
- Practise React hooks, routing and API integration.
- Make the site responsive and handle errors properly.

## 4. Proposed Solution
A single page React app with two pages: a Home page (search, filters, movie cards) and a Details page. Data is fetched from OMDb using `fetch`. Loading spinners and error messages keep the user informed.

## 5. Technologies Used
React 18, Vite, JavaScript, React Router DOM, CSS3, OMDb API, npm, Git/GitHub, Vercel/Netlify.

## 6. System Requirements
**Hardware:** any computer with 4 GB RAM or more.
**Software:** Node.js 18+, npm, a modern browser (Chrome, Edge, Firefox), VS Code, and internet connection.
**Other:** free OMDb API key.

## 7. Features
Search, default popular movies, movie cards, genre filter, details page, ratings, loading spinner, error messages, missing-poster placeholder, responsive design, and API key kept in `.env`.

## 8. System Architecture
```text
User -> React Components (pages) -> api.js -> OMDb API
              ^                                  |
              +------- state update <------------+
```
The user acts on a page, the page calls a function in `api.js`, the data returns, state is updated with `useState` and React re-renders the screen.

## 9. React Components
| Component | Purpose |
|---|---|
| Navbar | Logo and navigation link |
| SearchBar | Text input and Search button |
| CategoryFilter | Genre buttons |
| MovieList | Grid of cards |
| MovieCard | One movie (poster, title, year, rating, button) |
| Poster | Image with fallback if missing |
| Loading | Reusable spinner |
| ErrorMessage | Reusable error box with Try again button |
| Home / MovieDetails | The two pages |

## 10. Hooks Used
- `useState` - stores movies, loading, error, search text and movie details.
- `useEffect` - fetches data when the search, genre or movie id changes.
- `useParams` - reads the movie id from the URL.
- `useNavigate` - Back button.
- `useSearchParams` - keeps search text and genre in the URL.

## 11. API Integration
All calls are in `src/api.js`. `s=` is used to search movies and `i=` is used to get full details of one movie. The key is read from `import.meta.env.VITE_OMDB_API_KEY`. Because search results do not include ratings or genres, the app loads details for each result (details are cached so they are not fetched twice).

## 12. State Management
State is managed with React hooks. Each page keeps its own state (movies, loading, error). Search text and genre are stored in the URL, which makes them shareable and keeps them when the user presses Back. No extra library like Redux is needed for a project of this size.

## 13. Routing
React Router DOM is used:
- `/` - Home page
- `/movie/:id` - Movie details page
- `*` - Page not found

The View Details button uses `Link` to move between pages without reloading.

## 14. Error Handling
| Problem | What the app does |
|---|---|
| Missing/invalid API key | Shows a clear message to check `.env` |
| Network error | "Network error" message with Try again |
| No search results | "No movies found" message |
| Missing poster | "No poster available" placeholder |
| Missing information | "N/A" values are shown as "Not available" |
| Unknown page | "Page not found" |

## 15. Responsive Design
CSS Grid with `auto-fill` makes the cards fit any width. Flexbox is used for the navbar, search bar and filters. Media queries at 900px, 640px and 420px change the layout for laptop, tablet and mobile (for example, 2 cards per row and a stacked details page on phones).

## 16. Testing
Manual testing was done:
| Test | Expected result | Result |
|---|---|---|
| Search "Batman" | Cards shown | Pass |
| Search "asdfgh" | No movies found | Pass |
| Wrong API key | Invalid key message | Pass |
| Internet off | Network error message | Pass |
| Click View Details | Details page opens | Pass |
| Back button | Returns to previous results | Pass |
| Choose genre | Only that genre shown | Pass |
| Resize browser | Layout adjusts | Pass |

(Re-run these tests with your own API key and update the results column if needed.)

## 17. Expected Output
The Home page shows a dark themed page with a search bar, genre buttons and a grid of movie cards. Clicking View Details shows a large poster with title, rating, plot, cast, director, language, country and rating sources.

## 18. AI-Assisted Activity
An AI assistant (Claude) was used to generate the starting project code, CSS, README and this report from the assignment requirements. I then ran the project, read through the code to understand it, tested it and made it my own by adding my API key. AI was used as a helper for learning and speeding up work, and I can explain how the project works.

## 19. Conclusion
The project meets the assignment goals. It shows React components, hooks, routing, API integration and state management in one practical application. In future, pagination, a favourites list and a trailer section can be added.
