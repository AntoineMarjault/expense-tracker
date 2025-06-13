import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router'
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
import { QueryProvider } from './providers/QueryProvider'
import DashboardLayout from '@/dashboard/DashboardLayout.tsx'
import SettingsPage from '@/features/settings/SettingsPage.tsx'
import { Toaster } from '@/shared/components/ui/sonner.tsx'
import { AuthContext, AuthProvider } from '@/providers/AuthProvider.tsx'

const ProtectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />
}

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
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
          <Toaster position="top-center" />
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
)
