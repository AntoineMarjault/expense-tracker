'use client'

import { TransactionUpdate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'
import {
  useTransactionDelete,
  useTransactionShow,
  useTransactionUpdate,
} from '@/hooks/transactions'
import { useRouter } from 'next/navigation'
import { MouseEvent, use } from 'react'
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

  const handleOnDelete = () => {
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
    <TransactionDrawer title="Update expense">
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
          >
            Delete
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </TransactionForm>
    </TransactionDrawer>
  )
}

export default EditTransactionDrawer
