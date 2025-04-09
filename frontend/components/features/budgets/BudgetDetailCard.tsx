import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

interface BudgetDetailCardProps {
  title?: string
  children: ReactNode
}

const BudgetDetailCard = ({ title, children }: BudgetDetailCardProps) => (
  <Card className="p-6">
    {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
    {children}
  </Card>
)

export default BudgetDetailCard
