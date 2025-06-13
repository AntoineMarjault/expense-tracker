import { useNavigate } from 'react-router'
import {
  useLastTransaction,
  useTransactionCreate,
} from '@/shared/hooks/transactions'
import { TransactionCreate } from '@/shared/types/api'
import TransactionDrawer from './TransactionDrawer'
import TransactionForm from './TransactionForm'
import { Button } from '@/shared/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

const NewTransactionDrawer = () => {
  const navigate = useNavigate()
  const { mutate: createTransaction, isPending } = useTransactionCreate()
  const lastTransaction = useLastTransaction()

  const handleSubmit = (values: TransactionCreate) => {
    createTransaction(values, {
      onSuccess: () => navigate(-1),
      onError: () => {
        toast.error('Impossible de créer la dépense. Veuillez réessayer.')
      },
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
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Ajout...
              </>
            ) : (
              'Ajouter'
            )}
          </Button>
        </div>
      </TransactionForm>
    </TransactionDrawer>
  )
}

export default NewTransactionDrawer
