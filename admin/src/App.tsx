import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Organizations } from './pages/Organizations'
import { Plans } from './pages/Plans'
import { Permissions } from './pages/Permissions'
import { SecretGate } from './components/SecretGate'

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06070a] flex items-center justify-center text-emerald-400 font-mono text-xs">
        Loading NexWhat Admin...
      </div>
    )
  }

  if (!token && !user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export const App: React.FC = () => {
  return (
    <SecretGate>
      <AuthProvider>
        <BrowserRouter basename="/master-portal">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="organizations" element={<Organizations />} />
              <Route path="plans" element={<Plans />} />
              <Route path="permissions" element={<Permissions />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SecretGate>
  )
}

export default App
