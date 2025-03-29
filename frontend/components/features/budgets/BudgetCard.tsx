import { Card } from '@/components/ui/card'
import { BiChevronRight } from 'react-icons/bi'
import Link from 'next/link'

interface BudgetCardProps {
  name: string
  id: number
}

const BudgetCard = ({ name, id }: BudgetCardProps) => {
  return (
    <Link href={`/dashboard/budgets/${id}`}>
      <Card className="cursor-pointer hover:shadow-md transition-all duration-200 flex items-center justify-between mb-2 px-6 py-2">
        <span>{name}</span>
        <BiChevronRight className="h-5 w-5" />
      </Card>
    </Link>
  )
}

export default BudgetCard
