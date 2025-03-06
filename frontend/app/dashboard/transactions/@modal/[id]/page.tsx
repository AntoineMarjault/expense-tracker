'use client'

import { TransactionUpdate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'
import { useTransactionShow, useTransactionUpdate } from '@/hooks/transactions'
import { useRouter } from 'next/navigation'
import { use } from 'react'

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
    <TransactionDrawer<TransactionUpdate>
      onSubmitAction={handleOnSubmit}
      title="Update expense"
      defaultValues={transaction}
      submitButtonText="Update"
    />
  )
}

export default EditTransactionDrawer
