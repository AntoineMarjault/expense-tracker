'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface SettingsLayoutProps {
  children: ReactNode
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => (
  <SessionProvider>{children}</SessionProvider>
)

export default SettingsLayout
