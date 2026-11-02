const USER_KEY = 'bookswap-user'
const ACCOUNTS_KEY = 'bookswap-accounts'

function getAccounts() {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]')
    return Array.isArray(accounts) ? accounts : []
  } catch {
    return []
  }
}

export function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export function signUp(name, email, phone, department, password) {
  const normalizedEmail = email.trim().toLowerCase()
  const accounts = getAccounts()

  if (accounts.some((account) => account.email === normalizedEmail)) {
    return { error: 'An account with this email already exists. Please sign in instead.' }
  }

  const account = {
    name: name.trim(),
    email: normalizedEmail,
    phone: phone.trim(),
    department: department.trim(),
    password,
  }

  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]))

  const user = {
    name: account.name,
    email: account.email,
    phone: account.phone,
    department: account.department,
  }
  sessionStorage.setItem(USER_KEY, JSON.stringify(user))

  return { user }
}

export function signIn(email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  const account = getAccounts().find(
    (savedAccount) => savedAccount.email === normalizedEmail && savedAccount.password === password
  )

  if (!account) {
    return { error: 'Incorrect email or password. If you are new to BookSwap, please sign up first.' }
  }

  const user = {
    name: account.name,
    email: account.email,
    phone: account.phone,
    department: account.department,
  }
  sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  return { user }
}

export function signOut() {
  sessionStorage.removeItem(USER_KEY)
}
