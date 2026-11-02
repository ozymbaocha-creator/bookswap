
import Discover from './pages/Discover'
import AuthPage from './pages/AuthPage'
import StatusPage from './pages/StatusPage'
import UploadPage from './pages/UploadPage'
import DashboardPage from './pages/DashboardPage'
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
      ? <DashboardPage />
      : <StatusPage type="unauthorized" />
  }

  if (protectedPages[path]) {
    if (!user) return <StatusPage type="unauthorized" />

    if (path === '/upload') return <UploadPage />
    if (path === '/dashboard') return <DashboardPage />
  }

  return <StatusPage type="not-found" />
}

export default App
