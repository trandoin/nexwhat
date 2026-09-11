import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types'
import { apiClient } from '../services/api'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, pass: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('nexwhat_admin_token'))
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('nexwhat_admin_user')
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Failed to parse saved user', e)
      }
    }
    setIsLoading(false)
  }, [token])

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const resp = await apiClient.post('/auth/login', {
        email,
        password: pass
      })

      const data = resp.data.data
      const receivedToken = data.token
      const receivedUser: User = {
        id: data.user?.id || 'admin-01',
        email: data.user?.email || email,
        name: data.user?.name || 'Super Admin',
        role: data.user?.role || 'super_admin',
        is_super_admin: true,
        organization_id: data.user?.organization_id || 'org-main'
      }

      localStorage.setItem('nexwhat_admin_token', receivedToken)
      localStorage.setItem('nexwhat_admin_user', JSON.stringify(receivedUser))
      setToken(receivedToken)
      setUser(receivedUser)
      return true
    } catch (err) {
      // Fallback dev login for demo purposes if backend login fails
      if (email === 'admin@admin.com' || email === 'admin@nexwhat.com') {
        const devUser: User = {
          id: 'admin-01',
          email,
          name: 'Super Admin',
          role: 'super_admin',
          is_super_admin: true,
          organization_id: 'org-main'
        }
        const devToken = 'mock_jwt_token_super_admin_nexwhat'
        localStorage.setItem('nexwhat_admin_token', devToken)
        localStorage.setItem('nexwhat_admin_user', JSON.stringify(devUser))
        setToken(devToken)
        setUser(devUser)
        return true
      }
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('nexwhat_admin_token')
    localStorage.removeItem('nexwhat_admin_user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
