'use client'

import { useRouter } from 'next/navigation'
import { useLastTransaction, useTransactionCreate } from '@/hooks/transactions'
import { TransactionCreate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'
import TransactionForm from '@/components/features/transactions/TransactionForm'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const NewTransactionDrawer = () => {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { mutate: createTransaction } = useTransactionCreate()
  const lastTransaction = useLastTransaction()

  // todo: handle errors (enable valitate button, display error message)
  const handleSubmit = (values: TransactionCreate) => {
    setIsSubmitted(true)
    createTransaction(values, {
      onSuccess: () => router.back(),
    })
  }

  const defaultValues = {
    country_code: lastTransaction?.country_code,
    currency: lastTransaction?.currency,
  }

  return (
    <TransactionDrawer title="Ajouter une dépense">
      <TransactionForm
        onSubmitAction={handleSubmit}
        defaultValues={defaultValues}
      >
        <div className="flex justify-center">
          <Button type="submit" disabled={isSubmitted}>
            Ajouter
          </Button>
        </div>
      </TransactionForm>
    </TransactionDrawer>
  )
}

export default NewTransactionDrawer
