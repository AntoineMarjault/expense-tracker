import { useRouter } from 'next/navigation'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ReactNode } from 'react'

interface TransactionDrawerProps {
  title: string
  children: ReactNode
}

const TransactionDrawer = ({ title, children }: TransactionDrawerProps) => {
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
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="px-4">{children}</div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default TransactionDrawer
