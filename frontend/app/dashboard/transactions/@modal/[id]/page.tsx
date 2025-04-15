'use client'

import { TransactionUpdate } from '@/types/api'
import TransactionDrawer from '@/components/features/transactions/TransactionDrawer'
import {
  useTransactionDelete,
  useTransactionShow,
  useTransactionUpdate,
} from '@/hooks/transactions'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import TransactionForm from '@/components/features/transactions/TransactionForm'
import { Button } from '@/components/ui/button'
import ConfirmationModal from '@/components/ui/custom/ConfirmationModal'

interface EditTransactionDrawerProps {
  params: Promise<{
    id: string
  }>
}

const EditTransactionDrawer = ({ params }: EditTransactionDrawerProps) => {
  const { id } = use(params)
  const { data: transaction } = useTransactionShow(parseInt(id))
  const { mutate: updateTransaction } = useTransactionUpdate(parseInt(id))
  const { mutate: deleteTransaction } = useTransactionDelete()
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  if (!transaction) return null

  const handleOnSubmit = (values: TransactionUpdate) => {
    setIsSubmitted(true)
    updateTransaction(values, {
      onSuccess: () => router.back(),
    })
  }

  const handleOnDelete = () => {
    setIsSubmitted(true)
    setIsDeleteDialogOpen(false)
    deleteTransaction(parseInt(id), {
      onSuccess: () => router.back(),
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
          <ConfirmationModal
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={handleOnDelete}
            title="Êtes-vous sûr ?"
            description="Cette action ne peut pas être annulée."
            confirmText="Supprimer la dépense"
            cancelText="Annuler"
          >
            <Button type="button" variant="destructive" disabled={isSubmitted}>
              Supprimer
            </Button>
          </ConfirmationModal>
          <Button type="submit" disabled={isSubmitted}>
            Modifier
          </Button>
        </div>
      </TransactionForm>
    </TransactionDrawer>
  )
}

export default EditTransactionDrawer
