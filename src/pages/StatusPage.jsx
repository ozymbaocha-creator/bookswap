import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './StatusPage.css'

const messages = {
  'coming-soon': {
    code: 'COMING SOON',
    heading: 'This page is on its way.',
    description: 'We are still working on this BookSwap feature. Please return to Discover to explore available resources.',
    action: 'Back to Discover',
    href: '/discover',
  },
  unauthorized: {
    code: '401',
    heading: 'Unauthorized',
    description: 'You need to sign in to access this area. If you are new to BookSwap, create a student account to continue.',
    action: 'Sign in',
    href: '/login',
  },
  'not-found': {
    code: '404',
    heading: 'Page not found',
    description: 'We could not find that page. Check the address or return to Discover.',
    action: 'Back to Discover',
    href: '/discover',
  },
}

function StatusPage({ type = 'not-found', title }) {
  const message = messages[type] ?? messages['not-found']

  return (
    <div className="status-page">
      <Navbar />
      <main className="status-content" aria-labelledby="status-heading">
        <p className="status-code">{message.code}</p>
        <h1 id="status-heading">{title ?? message.heading}</h1>
        <p className="status-description">{message.description}</p>
        <a className="status-action" href={message.href}>
          {message.action}
        </a>
      </main>
      <Footer />
    </div>
  )
}

export default StatusPage
