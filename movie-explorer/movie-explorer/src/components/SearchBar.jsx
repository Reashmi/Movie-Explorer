import { useState, useEffect } from 'react'

export default function SearchBar({ initialValue = '', onSearch }) {
  const [text, setText] = useState(initialValue)

  useEffect(() => setText(initialValue), [initialValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(text.trim())
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search movies, e.g. Inception"
        aria-label="Search movies"
      />
      <button type="submit" className="btn">Search</button>
    </form>
  )
}
