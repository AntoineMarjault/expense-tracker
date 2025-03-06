'use client'

import { useRouter } from 'next/navigation'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import TransactionForm from '@/components/TransactionForm'
import { useCategoryIndex } from '@/hooks/categories'
import { useTransactionCreate } from '@/hooks/transactions'
import { TransactionCreate } from '@/types/api'

const NewTransactionDrawer = () => {
  const router = useRouter()
  const { data: categories = [] } = useCategoryIndex()
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
    <Drawer
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Expense</DrawerTitle>
          <DrawerDescription>Add a new expense to your list.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="px-4">
            <TransactionForm
              categories={categories}
              onSubmitAction={handleOnSubmit}
            />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default NewTransactionDrawer
