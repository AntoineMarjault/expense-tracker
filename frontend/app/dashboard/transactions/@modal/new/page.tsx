'use client'

import { useRouter } from 'next/navigation'
import { useTransactionCreate } from '@/hooks/transactions'
import { TransactionCreate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'
import TransactionForm from '@/components/features/transactions/TransactionForm'

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
    <TransactionDrawer title="Create expense">
      <TransactionForm
        onSubmitAction={handleOnSubmit}
        submitButtonText="Create"
      />
    </TransactionDrawer>
  )
}

export default NewTransactionDrawer
