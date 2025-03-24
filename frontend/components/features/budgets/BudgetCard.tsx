import { Card } from '@/components/ui/card'
import { BiChevronRight } from 'react-icons/bi'

interface BudgetCardProps {
  name: string
}

const BudgetCard = ({ name }: BudgetCardProps) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 flex items-center justify-between mb-2 px-6 py-2">
      <span>{name}</span>
      <BiChevronRight className="h-5 w-5" />
    </Card>
  )
}

export default BudgetCard
