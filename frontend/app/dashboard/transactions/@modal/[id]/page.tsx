'use client'

import { TransactionUpdate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'
import {
  useTransactionDelete,
  useTransactionShow,
  useTransactionUpdate,
} from '@/hooks/transactions'
import { useRouter } from 'next/navigation'
import { MouseEvent, use, useState } from 'react'
import TransactionForm from '@/components/features/transactions/TransactionForm'
import { Button } from '@/components/ui/button'

interface EditTransactionDrawerProps {
  params: Promise<{
    id: string
  }>
}

const EditTransactionDrawer = ({ params }: EditTransactionDrawerProps) => {
  const { id } = use(params)
  const { data: transaction } = useTransactionShow(id)
  const { mutate: updateTransaction } = useTransactionUpdate(id)
  const { mutate: deleteTransaction } = useTransactionDelete()
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!transaction) return null

  const handleOnSubmit = (values: TransactionUpdate) => {
    setIsSubmitted(true)
    updateTransaction(values, {
      onSuccess: () => {
        router.back()
        setTimeout(() => {
          router.replace('/dashboard/transactions')
        }, 100)
      },
    })
  }

  const handleOnDelete = () => {
    setIsSubmitted(true)
    deleteTransaction(id, {
      onSuccess: () => {
        router.back()
        setTimeout(() => {
          router.replace('/dashboard/transactions')
        }, 100)
      },
    })
  }

  return (
    <TransactionDrawer title="Modifier la dépense">
      <TransactionForm
        defaultValues={{
          amount: transaction.amount,
          name: transaction.name,
          category_id: transaction.category_id,
          date: transaction.date,
        }}
        onSubmitAction={handleOnSubmit}
      >
        <div className="flex justify-center gap-4">
          <Button
            type="submit"
            variant="destructive"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault()
              handleOnDelete()
            }}
            disabled={isSubmitted}
          >
            Supprimer
          </Button>
          <Button type="submit" disabled={isSubmitted}>
            Modifier
          </Button>
        </div>
      </TransactionForm>
    </TransactionDrawer>
  )
}

export default EditTransactionDrawer
