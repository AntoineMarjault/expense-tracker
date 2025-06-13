import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { QueryProvider } from './providers/QueryProvider'
import { Toaster } from '@/shared/components/ui/sonner.tsx'
import { AuthProvider } from '@/providers/AuthProvider.tsx'
import App from './App'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-center" />
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
)
