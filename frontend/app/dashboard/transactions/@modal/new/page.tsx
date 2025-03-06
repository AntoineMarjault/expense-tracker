'use client'

import { useRouter } from 'next/navigation'
import { useTransactionCreate } from '@/hooks/transactions'
import { TransactionCreate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'

const NewTransactionDrawer = () => {
  const router = useRouter()
  const { mutate: createTransaction } = useTransactionCreate()

  const handleOnSubmit = (values: TransactionCreate) => {
    createTransaction(values, {
      onSuccess: () => {
        router.back()
        setTimeout(() => {
          router.replace('/dashboard/transactions')
        }, 100)
      },
    })
  }

  return (
    <TransactionDrawer<TransactionCreate>
      onSubmitAction={handleOnSubmit}
      title="Create expense"
      submitButtonText="Create"
    />
  )
}

export default NewTransactionDrawer
