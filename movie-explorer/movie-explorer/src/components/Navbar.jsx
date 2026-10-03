import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" aria-label="Movie Explorer home">
          <span className="logo-icon">▶</span> Movie Explorer
        </Link>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
        </nav>
      </div>
    </header>
  )
}
