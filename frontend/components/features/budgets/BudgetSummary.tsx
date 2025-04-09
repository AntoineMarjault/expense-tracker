import BudgetDetailCard from '@/components/features/budgets/BudgetDetailCard'
import { Progress } from '@/components/ui/progress'
import { Budget } from '@/types/domain'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

interface BudgetSummaryProps {
  budget: Budget
}

export const BudgetSummarySkeleton = () => (
  <Card className="p-6">
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-5 w-36" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
    <Skeleton className="h-3 w-full mb-4" />
    <div className="flex justify-between">
      <div>
        <Skeleton className="h-4 w-28" />
      </div>
      <div>
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  </Card>
)

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

const BudgetSummary = ({ budget }: BudgetSummaryProps) => {
  const remaining = budget?.remaining_amount || 0

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
    })

  return (
    <BudgetDetailCard>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">Période</p>
          <p className="font-medium">
            {formatDate(new Date(budget.start_date))} →{' '}
            {formatDate(new Date(budget.end_date))}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Objectif</p>
          <p className="font-medium">
            {formatAmount(budget.target_amount || 0)} €
          </p>
        </div>
      </div>

      <Progress value={budget.progress_percentage} className="h-2.5 mb-3" />

      <div className="grid grid-cols-3 text-sm">
        <div>
          <span className="text-gray-500">Dépensé</span>
          <p className="font-medium text-red-600">
            {formatAmount(budget.spent_amount || 0)} €
          </p>
        </div>
        <div className="text-center">
          <span className="text-gray-500">Moy. / jour</span>
          <p>
            <span
              className={`font-medium ${
                (budget.average_daily_spending || 0) >
                (budget.target_daily_amount || 0)
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {formatAmount(budget.average_daily_spending || 0)} €
            </span>
            {` / ${formatAmount(budget.target_daily_amount || 0)} €`}
          </p>
        </div>
        <div className="text-right">
          <span className="text-gray-500">Reste</span>
          <p
            className={`font-medium ${
              remaining >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {formatAmount(remaining)} €
          </p>
        </div>
      </div>
    </BudgetDetailCard>
  )
}

export default BudgetSummary
