import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { signIn, signUp } from '../lib/auth'
import './AuthPage.css'

function AuthPage({ mode = 'login' }) {
  const isSignup = mode === 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const result = isSignup
      ? signUp(name, email, phone, department, password)
      : signIn(email, password)

    if (result.error) {
      setError(result.error)
      return
    }

    window.location.href = '/dashboard'
  }

  return (
    <div className="auth-page">
      <Navbar />
      <main className="auth-content">
        <form className="auth-card" onSubmit={handleSubmit}>
          <p className="auth-eyebrow">BOOKSWAP STUDENT ACCOUNT</p>
          <h1>{isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p className="auth-description">
            {isSignup
              ? 'Join BookSwap to upload resources and manage your campus exchanges.'
              : 'Sign in to access your uploads, dashboard and swaps.'}
          </p>

          {isSignup && (
            <>
              <label className="auth-field">
                Full name
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="auth-field">
                Phone number
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="auth-field">
                Department
                <input
                  type="text"
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  placeholder="Enter your department"
                  required
                />
              </label>
            </>
          )}

          <label className="auth-field">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </label>

          <label className="auth-field">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              minLength={6}
              required
            />
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit">
            {isSignup ? 'Create account' : 'Sign in'}
          </button>

          <p className="auth-switch">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <a href={isSignup ? '/login' : '/signup'}>
              {isSignup ? 'Sign in' : 'Sign up'}
            </a>
          </p>
          <p className="auth-notice">
            Demo authentication only. Your test account is saved in this browser; do not use a real password or sensitive personal information.
          </p>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default AuthPage
