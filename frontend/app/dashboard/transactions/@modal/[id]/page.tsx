'use client'

import { TransactionUpdate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'
import { useTransactionShow, useTransactionUpdate } from '@/hooks/transactions'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import TransactionForm from '@/components/features/transactions/TransactionForm'

interface EditTransactionDrawerProps {
  params: Promise<{
    id: string
  }>
}

const EditTransactionDrawer = ({ params }: EditTransactionDrawerProps) => {
  const { id } = use(params)
  const { data: transaction } = useTransactionShow(id)
  const { mutate: updateTransaction } = useTransactionUpdate(id)
  const router = useRouter()

  if (!transaction) return null

  const handleOnSubmit = (values: TransactionUpdate) => {
    updateTransaction(values, {
      onSuccess: () => {
        router.back()
        setTimeout(() => {
          router.replace('/dashboard/transactions')
        }, 100)
      },
    })
  }

  return (
    <TransactionDrawer title="Update expense">
      <TransactionForm
        defaultValues={{
          amount: transaction.amount,
          name: transaction.name,
          category_id: transaction.category_id,
          date: transaction.date,
        }}
        onSubmitAction={handleOnSubmit}
        submitButtonText="Update"
      />
    </TransactionDrawer>
  )
}

export default EditTransactionDrawer
