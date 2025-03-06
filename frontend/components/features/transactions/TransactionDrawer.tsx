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
import TransactionForm from '@/components/features/transactions/TransactionForm'
import { useCategoryIndex } from '@/hooks/categories'
import { TransactionCreate, TransactionUpdate } from '@/types/api'

const TransactionDrawer = <T extends TransactionCreate | TransactionUpdate>({
  defaultValues,
  onSubmitAction,
  submitButtonText,
  title,
}: {
  defaultValues?: T
  onSubmitAction: (values: T) => void
  submitButtonText: string
  title: string
}) => {
  const router = useRouter()
  const { data: categories = [] } = useCategoryIndex()

  return (
    <Drawer
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="px-4">
            <TransactionForm
              categories={categories}
              defaultValues={defaultValues}
              onSubmitAction={onSubmitAction}
              submitButtonText={submitButtonText}
            />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default TransactionDrawer
