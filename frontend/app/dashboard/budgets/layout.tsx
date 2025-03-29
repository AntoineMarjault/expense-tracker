'use client'

import { ReactNode } from 'react'
import FloatingActionButton from '@/components/ui/custom/FloatingActionButton'
import { usePathname } from 'next/navigation'

export default function BudgetsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isListPage = pathname === '/dashboard/budgets'

  return (
    <>
      {children}
      {isListPage && <FloatingActionButton href="/dashboard/budgets/new" />}
    </>
  )
}
