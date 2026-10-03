import { GENRES } from '../api.js'

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="filters" role="group" aria-label="Filter by genre">
      {GENRES.map((g) => (
        <button
          key={g}
          className={`chip ${selected === g ? 'chip-active' : ''}`}
          onClick={() => onSelect(g)}
          aria-pressed={selected === g}
        >
          {g}
        </button>
      ))}
    </div>
  )
}
