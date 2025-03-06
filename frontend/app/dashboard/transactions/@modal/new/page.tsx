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

const NewTransactionDrawer = () => {
  const router = useRouter()

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
            <TransactionForm />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default NewTransactionDrawer
