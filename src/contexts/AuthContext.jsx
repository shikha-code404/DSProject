import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'codelife_user'

const MOCK_USERS = [
  { id: 1, name: 'Demo User', email: 'demo@codelife.dev', password: 'demo1234', avatar: null },
]

function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)

  function login(email, password) {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const safeUser = { id: found.id, name: found.name, email: found.email, avatar: found.avatar }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
    return safeUser
  }

  function signup(name, email, password) {
    const exists = MOCK_USERS.find(u => u.email === email)
    if (exists) throw new Error('Email already registered')
    const newUser = { id: Date.now(), name, email, avatar: null }
    MOCK_USERS.push({ ...newUser, password })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
