import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import MovieList from '../components/MovieList.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { fetchMovies } from '../api.js'

export default function Home() {
  // Search text and genre are kept in the URL, so the Back button restores them.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const genre = params.get('genre') || 'All'

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError('')
    fetchMovies(query, genre)
      .then((list) => !ignore && setMovies(list))
      .catch((err) => !ignore && (setError(err.message), setMovies([])))
      .finally(() => !ignore && setLoading(false))
    return () => { ignore = true }
  }, [query, genre, retry])

  const update = (q, g) => {
    const next = {}
    if (q) next.q = q
    if (g && g !== 'All') next.genre = g
    setParams(next)
  }

  const heading = query ? `Results for "${query}"` : genre === 'All' ? 'Popular movies' : `${genre} movies`

  return (
    <>
      <section className="hero">
        <h1>Find your next favourite movie</h1>
        <p>Search any title, filter by genre and check ratings.</p>
        <SearchBar initialValue={query} onSearch={(q) => update(q, genre)} />
        <CategoryFilter selected={genre} onSelect={(g) => update(query, g)} />
      </section>

      <h2 className="section-title">{heading}</h2>
      {loading && <Loading text="Searching movies..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={() => setRetry((n) => n + 1)} />}
      {!loading && !error && movies.length === 0 && (
        <div className="state-box">
          <h3>No movies found</h3>
          <p>Try a different title{genre !== 'All' ? ' or choose another genre' : ''}.</p>
        </div>
      )}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </>
  )
}
