export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box error" role="alert">
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && <button className="btn" onClick={onRetry}>Try again</button>}
    </div>
  )
}
