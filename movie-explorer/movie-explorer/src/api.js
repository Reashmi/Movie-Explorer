// All OMDb API logic lives here so components stay simple.
const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

// OMDb search cannot filter by genre, so each genre gets a seed word to search with.
export const GENRES = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi']
const GENRE_SEEDS = {
  All: 'avengers', Action: 'mission', Adventure: 'quest', Comedy: 'party',
  Drama: 'life', Horror: 'night', Romance: 'love', Thriller: 'murder', 'Sci-Fi': 'space',
}

// Turns OMDb's "N/A" into a friendly text
export const show = (v, fallback = 'Not available') => (!v || v === 'N/A' ? fallback : v)

async function callApi(params) {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('API key is missing. Create a .env file with VITE_OMDB_API_KEY=your_key and restart the dev server.')
  }
  let res
  try {
    res = await fetch(`${BASE_URL}?apikey=${API_KEY}&${new URLSearchParams(params)}`)
  } catch {
    throw new Error('Network error. Please check your internet connection and try again.')
  }
  let data = null
  try { data = await res.json() } catch { /* ignore */ }
  if (res.status === 401 || (data && /invalid api key/i.test(data.Error || ''))) {
    throw new Error('Invalid API key. Please check VITE_OMDB_API_KEY in your .env file.')
  }
  if (!res.ok || !data) throw new Error(`Server error (${res.status}). Please try again later.`)
  return data
}

const detailsCache = new Map()

export async function getMovie(id) {
  if (detailsCache.has(id)) return detailsCache.get(id)
  const data = await callApi({ i: id, plot: 'full' })
  if (data.Response === 'False') throw new Error(data.Error || 'Movie not found.')
  detailsCache.set(id, data)
  return data
}

async function searchPage(term, page) {
  const data = await callApi({ s: term, type: 'movie', page })
  if (data.Response === 'False') {
    if (/not found/i.test(data.Error || '')) return []
    if (/too many/i.test(data.Error || '')) return []
    throw new Error(data.Error || 'Something went wrong.')
  }
  return data.Search
}

// Search movies (2 pages), load full details (for rating + genre), then filter by genre.
export async function fetchMovies(query, genre = 'All') {
  const term = query.trim() || GENRE_SEEDS[genre] || GENRE_SEEDS.All
  const pages = await Promise.all([searchPage(term, 1), searchPage(term, 2).catch(() => [])])
  const basic = pages.flat()
  const detailed = await Promise.all(basic.map((m) => getMovie(m.imdbID).catch(() => m)))
  if (genre === 'All') return detailed
  return detailed.filter((m) => (m.Genre || '').split(',').map((g) => g.trim()).includes(genre))
}
