import { useNavigate } from 'react-router'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/components/ui/drawer'
import { ReactNode } from 'react'

interface TransactionDrawerProps {
  title: string
  children: ReactNode
}

const TransactionDrawer = ({ title, children }: TransactionDrawerProps) => {
  const navigate = useNavigate()

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) navigate(-1)
      }}
      repositionInputs={false}
      open
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
