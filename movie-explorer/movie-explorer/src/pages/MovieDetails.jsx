import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Poster from '../components/Poster.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getMovie, show } from '../api.js'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError('')
    getMovie(id)
      .then((m) => !ignore && setMovie(m))
      .catch((err) => !ignore && setError(err.message))
      .finally(() => !ignore && setLoading(false))
    window.scrollTo(0, 0)
    return () => { ignore = true }
  }, [id])

  const back = <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Back</button>

  if (loading) return <Loading text="Loading movie details..." />
  if (error) return <>{back}<ErrorMessage message={error} /></>

  const info = [
    ['Director', movie.Director], ['Actors', movie.Actors], ['Language', movie.Language],
    ['Country', movie.Country], ['Released', movie.Released], ['Rated', movie.Rated],
  ]

  return (
    <div className="details">
      {back}
      <div className="details-layout">
        <div className="details-poster"><Poster src={movie.Poster} title={movie.Title} /></div>
        <div className="details-info">
          <h1>{movie.Title}</h1>
          <p className="card-meta">
            {show(movie.Year)} • {show(movie.Runtime, 'Runtime not available')} • {show(movie.Genre, 'Genre not available')}
          </p>
          <p className="big-rating">★ {show(movie.imdbRating, 'N/A')}<small> / 10 IMDb{movie.imdbVotes && movie.imdbVotes !== 'N/A' ? ` (${movie.imdbVotes} votes)` : ''}</small></p>

          <h3>Plot</h3>
          <p>{show(movie.Plot, 'Plot is not available for this movie.')}</p>

          <dl className="info-list">
            {info.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{show(value)}</dd></div>
            ))}
          </dl>

          <h3>Ratings</h3>
          {movie.Ratings && movie.Ratings.length > 0 ? (
            <ul className="ratings">
              {movie.Ratings.map((r) => (
                <li key={r.Source}><strong>{r.Value}</strong><span>{r.Source}</span></li>
              ))}
            </ul>
          ) : (
            <p>No ratings available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
