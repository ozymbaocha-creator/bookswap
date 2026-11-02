import { getCurrentUser, signOut } from '../lib/auth'
import './Navbar.css'

function Navbar() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const user = getCurrentUser()
  const isDiscover = path === '/' || path === '/discover'

  function handleSignOut() {
    signOut()
    window.location.href = '/discover'
  }

  return (
    <header className="navbar">
      <a className="navbar-brand" href="/discover" aria-label="BookSwap home">
        <span className="brand-icon" aria-hidden="true">B</span>
        <span>BookSwap</span>
      </a>

      <nav className="navbar-links" aria-label="Main navigation">
        <a
          className={`nav-link${isDiscover ? ' active' : ''}`}
          href="/discover"
          aria-current={isDiscover ? 'page' : undefined}
        >
          Discover
        </a>
        <a
          className={`nav-link${path === '/upload' ? ' active' : ''}`}
          href="/upload"
          aria-current={path === '/upload' ? 'page' : undefined}
        >
          Upload
        </a>
        <a
          className={`nav-link${path === '/dashboard' ? ' active' : ''}`}
          href="/dashboard"
          aria-current={path === '/dashboard' ? 'page' : undefined}
        >
          Dashboard
        </a>
      </nav>

      {user ? (
        <div className="navbar-account">
          <a className="navbar-profile" href="/dashboard" aria-label={`Signed in as ${user.name}`}>
            <span className="profile-avatar" aria-hidden="true">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span className="profile-label">{user.name}</span>
          </a>
          <button className="sign-out-link" type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="navbar-account">
          <a className="account-link" href="/login">Sign in</a>
          <a className="account-signup" href="/signup">Sign up</a>
        </div>
      )}
    </header>
  )
}

export default Navbar
