'use client'

import { useRouter } from 'next/navigation'
import { useTransactionCreate } from '@/hooks/transactions'
import { TransactionCreate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'
import TransactionForm from '@/components/features/transactions/TransactionForm'
import { Button } from '@/components/ui/button'

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
    <TransactionDrawer title="Ajouter une dépense">
      <TransactionForm onSubmitAction={handleOnSubmit}>
        <div className="flex justify-center">
          <Button type="submit">Ajouter</Button>
        </div>
      </TransactionForm>
    </TransactionDrawer>
  )
}

export default NewTransactionDrawer
