export default function Loading({ text = 'Loading...' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  )
}
