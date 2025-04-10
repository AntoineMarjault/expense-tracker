import { Card } from '@/components/ui/card'
import { BiChevronRight } from 'react-icons/bi'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

interface BudgetCardProps {
  name: string
  id: number
  target_amount: number
  spent_amount: number
  progress_percentage: number
  remaining_amount: number
}

const BudgetCard = ({
  name,
  id,
  target_amount,
  spent_amount,
  progress_percentage,
  remaining_amount,
}: BudgetCardProps) => (
  <Link href={`/dashboard/budgets/${id}`}>
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 mb-2 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{name}</span>
        <BiChevronRight className="h-5 w-5" />
      </div>
      <Progress value={progress_percentage} className="h-2 mb-2" />
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {spent_amount.toLocaleString('fr-FR')} € /{' '}
          {target_amount.toLocaleString('fr-FR')} €
        </span>
        <span
          className={remaining_amount >= 0 ? 'text-green-600' : 'text-red-600'}
        >
          {remaining_amount.toLocaleString('fr-FR')} €
        </span>
      </div>
    </Card>
  </Link>
)

export default BudgetCard
