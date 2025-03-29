'use client'

import { useBudgetIndex } from '@/hooks/budgets'
import BudgetCard from '@/components/features/budgets/BudgetCard'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const BudgetSkeleton = () => (
  <Card className="mb-2 p-4">
    <div className="flex items-center justify-between mb-2">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-5 w-5" />
    </div>
    <Skeleton className="h-2 w-full mb-2" />
    <div className="flex justify-between">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
  </Card>
)

const BudgetsPage = () => {
  const { data: budgets = [], isLoading } = useBudgetIndex()

  return (
    <>
      {isLoading && (
        <>
          <BudgetSkeleton />
          <BudgetSkeleton />
          <BudgetSkeleton />
        </>
      )}
      {!isLoading &&
        budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            id={budget.id}
            name={budget.name}
            target_amount={budget.target_amount}
            spent_amount={budget.spent_amount || 0}
            progress_percentage={budget.progress_percentage || 0}
            remaining_amount={budget.remaining_amount || 0}
          />
        ))}
    </>
  )
}

export default BudgetsPage
