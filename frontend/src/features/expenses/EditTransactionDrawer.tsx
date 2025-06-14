import { TransactionUpdate } from '@/shared/types/api'
import TransactionDrawer from './TransactionDrawer'
import TransactionForm from './TransactionForm'
import {
  useTransactionDelete,
  useTransactionShow,
  useTransactionUpdate,
} from '@/shared/hooks/transactions'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import ConfirmationModal from '@/shared/components/ui/custom/ConfirmationModal'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

const EditTransactionDrawer = () => {
  const { id } = useParams()
  const parsedId = id ? parseInt(id) : NaN

  const { data: transaction } = useTransactionShow(parsedId)
  const { mutate: updateTransaction, isPending: isUpdating } =
    useTransactionUpdate(parsedId)
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useTransactionDelete()
  const navigate = useNavigate()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  if (!transaction) return null

  const handleOnSubmit = (values: TransactionUpdate) => {
    updateTransaction(values, {
      onSuccess: () => navigate(-1),
      onError: () => {
        toast.error('Impossible de modifier la dépense. Veuillez réessayer.')
      },
    })
  }

  const handleOnDelete = () => {
    deleteTransaction(parsedId, {
      onSuccess: () => navigate(-1),
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
