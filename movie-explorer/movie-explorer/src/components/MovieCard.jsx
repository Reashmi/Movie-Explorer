import { Link } from 'react-router-dom'
import Poster from './Poster.jsx'
import { show } from '../api.js'

export default function MovieCard({ movie }) {
  const rating = show(movie.imdbRating, '')
  return (
    <article className="card">
      <div className="card-poster">
        <Poster src={movie.Poster} title={movie.Title} />
        {rating && <span className="badge">★ {rating}</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title" title={movie.Title}>{movie.Title}</h3>
        <p className="card-meta">{show(movie.Year, 'Year unknown')} • <span className="cap">{show(movie.Type, 'movie')}</span></p>
        <p className="card-meta">IMDb: {rating || 'N/A'}</p>
        <Link className="btn btn-small" to={`/movie/${movie.imdbID}`}>View Details</Link>
      </div>
    </article>
  )
}
