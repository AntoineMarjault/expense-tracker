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
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

interface EditTransactionDrawerProps {
  params: Promise<{
    id: string
  }>
}

const EditTransactionDrawer = ({ params }: EditTransactionDrawerProps) => {
  const { id } = use(params)
  const { data: transaction } = useTransactionShow(parseInt(id))
  const { mutate: updateTransaction, isPending: isUpdating } =
    useTransactionUpdate(parseInt(id))
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useTransactionDelete()
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  if (!transaction) return null

  const handleOnSubmit = (values: TransactionUpdate) => {
    updateTransaction(values, {
      onSuccess: () => router.back(),
      onError: () => {
        toast.error('Impossible de modifier la dépense. Veuillez réessayer.')
      },
    })
  }

  const handleOnDelete = () => {
    deleteTransaction(parseInt(id), {
      onSuccess: () => router.back(),
      onError: () => {
        toast.error('Impossible de supprimer la dépense. Veuillez réessayer.')
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
          country_code: transaction.country_code,
          currency: transaction.currency,
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
            <Button type="button" variant="destructive" disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                'Supprimer'
              )}
            </Button>
          </ConfirmationModal>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Modification...
              </>
            ) : (
              'Modifier'
            )}
          </Button>
        </div>
      </TransactionForm>
    </TransactionDrawer>
  )
}

export default EditTransactionDrawer
