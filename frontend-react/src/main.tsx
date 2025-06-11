import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthLayout, LoginPage, SignUpPage } from './auth'
import { QueryProvider } from './providers/QueryProvider'
import DashboardLayout from '@/dashboard/DashboardLayout.tsx'

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
            <Route
              path="transactions"
              element={<div>TODO: Transactions Page</div>}
            />
            <Route path="travels" element={<div>TODO: Travels Page</div>} />
            <Route path="settings" element={<div>TODO: Settings page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
)
