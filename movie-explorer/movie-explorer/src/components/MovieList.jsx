import MovieCard from './MovieCard.jsx'

export default function MovieList({ movies }) {
  return (
    <div className="grid">
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </div>
  )
}
