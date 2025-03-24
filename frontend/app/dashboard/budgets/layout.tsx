import { ReactNode } from 'react'
import FloatingActionButton from '@/components/ui/custom/FloatingActionButton'

export default function BudgetsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FloatingActionButton href="/dashboard/budgets/new" />
    </>
  )
}
