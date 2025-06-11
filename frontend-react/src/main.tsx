import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthLayout, LoginPage, SignUpPage } from '@/features/auth'
import {
  TransactionsPage,
  NewTransactionDrawer,
  EditTransactionDrawer,
} from '@/features/expenses'
import { QueryProvider } from './providers/QueryProvider'
import DashboardLayout from '@/dashboard/DashboardLayout.tsx'
import TravelsPage from '@/features/travels/TravelsPage.tsx'
import SettingsPage from '@/features/settings/SettingsPage.tsx'
import { Toaster } from '@/shared/components/ui/sonner.tsx'
import NewTravelPage from '@/features/travels/NewTravelPage.tsx'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="transactions" element={<TransactionsPage />}>
              <Route path="new" element={<NewTransactionDrawer />} />
              <Route path=":id" element={<EditTransactionDrawer />} />
            </Route>
            <Route path="travels" element={<TravelsPage />} />
            <Route path="travels/new" element={<NewTravelPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
)
