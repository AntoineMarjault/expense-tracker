import Nav from '@/components/Nav'
import Header from '@/components/Header'
import { ReactNode } from 'react'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Expense Tracker',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <QueryProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-1 overflow-auto px-4 py-2">{children}</main>
        <Nav className="sticky bottom-0" />
      </div>
    </QueryProvider>
  )
}
