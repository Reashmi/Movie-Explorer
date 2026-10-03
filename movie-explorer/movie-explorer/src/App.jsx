import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="*"
            element={
              <div className="state-box">
                <h2>Page not found</h2>
                <Link className="btn" to="/">Go to home</Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="footer">Movie data from OMDb API</footer>
    </>
  )
}
