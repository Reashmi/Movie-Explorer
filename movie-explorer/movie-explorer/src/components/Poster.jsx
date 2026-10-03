import { useState } from 'react'

// Shows the poster, or a placeholder if it is missing or fails to load.
export default function Poster({ src, title }) {
  const [failed, setFailed] = useState(false)
  if (!src || src === 'N/A' || failed) {
    return <div className="poster poster-missing">No poster available</div>
  }
  return <img className="poster" src={src} alt={`${title} poster`} loading="lazy" onError={() => setFailed(true)} />
}
