import { AuthLayout, LoginPage, SignUpPage } from '@/features/auth'
import {
  TransactionsPage,
  NewTransactionDrawer,
  EditTransactionDrawer,
} from '@/features/expenses'
import {
  TravelsPage,
  NewTravelPage,
  TravelDetailPage,
  EditTravelPage,
} from '@/features/travels'
import DashboardLayout from '@/features/dashboard/DashboardLayout.tsx'
import SettingsPage from '@/features/settings/SettingsPage.tsx'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/providers/AuthProvider.tsx'
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router'

const authRoute = '/auth/login'

const ProtectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated() ? <Outlet /> : <Navigate to={authRoute} replace />
}

const App = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  // TODO: move to authentication cookie to avoid manually checking for token expiration
  useEffect(() => {
    if (!isAuthenticated()) {
      return
    }

    const checkAuthentication = () => {
      if (!isAuthenticated()) {
        logout()
        navigate('/auth/login')
      }
    }

    const intervalId = setInterval(checkAuthentication, 1000)

    return () => clearInterval(intervalId)
  }, [isAuthenticated, logout, navigate])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="transactions" element={<TransactionsPage />}>
            <Route path="new" element={<NewTransactionDrawer />} />
            <Route path=":id" element={<EditTransactionDrawer />} />
          </Route>
          <Route path="travels" element={<TravelsPage />} />
          <Route path="travels/new" element={<NewTravelPage />} />
          <Route path="travels/:id" element={<TravelDetailPage />} />
          <Route path="travels/:id/edit" element={<EditTravelPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
