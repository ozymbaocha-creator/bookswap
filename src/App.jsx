import Discover from './pages/Discover'
import AuthPage from './pages/AuthPage'
import StatusPage from './pages/StatusPage'
import { getCurrentUser } from './lib/auth'

const protectedPages = {
  '/upload': 'Upload',
  '/dashboard': 'Dashboard',
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const user = getCurrentUser()

  if (path === '/' || path === '/discover') return <Discover />
  if (path === '/login') return <AuthPage mode="login" />
  if (path === '/signup') return <AuthPage mode="signup" />
  if (path === '/unauthorized') {
    return user
      ? <StatusPage type="coming-soon" title="Dashboard" />
      : <StatusPage type="unauthorized" />
  }

  if (protectedPages[path]) {
    if (!user) return <StatusPage type="unauthorized" />
    return <StatusPage type="coming-soon" title={protectedPages[path]} />
  }

  return <StatusPage type="not-found" />
}

export default App
