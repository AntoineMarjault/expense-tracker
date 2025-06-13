import Nav from '@/components/Nav'
import Header from '@/components/Header'
import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Expense Tracker',
}

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="flex flex-col min-h-screen bg-gray-100">
    <Header />
    <main className="flex-1 overflow-auto px-4 sm:px-16 md:px-32 py-2 sm:py-4 md:py-6 max-w-7xl mx-auto w-full">
      {children}
    </main>
    <Nav className="sticky bottom-0 sm:pb-2 md:pb-4" />
  </div>
)

export default DashboardLayout
