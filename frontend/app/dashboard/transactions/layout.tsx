import { ReactNode } from 'react'
import FloatingActionButton from '@/components/ui/custom/FloatingActionButton'

interface TransactionLayoutProps {
  children: ReactNode
  modal: ReactNode
}

const TransactionsLayout = ({ children, modal }: TransactionLayoutProps) => (
  <>
    {children}
    <FloatingActionButton href="/dashboard/transactions/new" />
    {modal}
  </>
)

export default TransactionsLayout
