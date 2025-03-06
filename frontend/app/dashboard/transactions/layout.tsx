import { ReactNode } from 'react'
import FloatingActionButton from '@/components/FloatingActionButton'

export default function TransactionsLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <>
      {children}
      <FloatingActionButton />
      {modal}
    </>
  )
}
