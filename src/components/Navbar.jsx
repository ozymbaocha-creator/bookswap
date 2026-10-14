import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar-brand" href="#discover">
        <span className="brand-icon">B</span>
        <span>BookSwap</span>
      </a>

      <nav className="navbar-links" aria-label="Main navigation">
        <a className="nav-link active" href="#discover">
          Discover
        </a>
        <a className="nav-link" href="#my-uploads">
          My Uploads
        </a>
        <a className="nav-link" href="#my-history">
          My History
        </a>
      </nav>

      <button className="navbar-profile" type="button">
        <span className="profile-avatar">S</span>
        <span className="profile-label">Student</span>
      </button>
    </header>
  )
}

export default Navbar
