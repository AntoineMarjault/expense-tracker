'use client'

import { useBudgetShow } from '@/hooks/budgets'
import { use } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import BudgetProgress, {
  BudgetProgressSkeleton,
} from '@/components/features/budgets/BudgetProgress'
import BudgetSummary, {
  BudgetSummarySkeleton,
} from '@/components/features/budgets/BudgetSummary'
import BudgetCategoryRepartition, {
  BudgetCategoryRepartitionSkeleton,
} from '@/components/features/budgets/BudgetCategoryRepartition'

interface BudgetDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const BudgetDetailSkeleton = () => (
  <>
    <Skeleton className="h-8 w-48 mb-2" />
    <div className="flex flex-col gap-4">
      <BudgetSummarySkeleton />
      <BudgetProgressSkeleton />
      <BudgetCategoryRepartitionSkeleton />
    </div>
  </>
)

const BudgetDetailPage = ({ params }: BudgetDetailPageProps) => {
  const { id } = use(params)
  const { data: budget, isLoading } = useBudgetShow(id)

  return (
    <>
      {isLoading && <BudgetDetailSkeleton />}
      {!isLoading && budget && (
        <>
          <h1 className="text-2xl font-bold mb-2">{budget.name}</h1>
          <div className="flex flex-col gap-4">
            <BudgetSummary budget={budget} />
            <BudgetProgress budget={budget} />
            <BudgetCategoryRepartition budget={budget} />
          </div>
        </>
      )}
    </>
  )
}

export default BudgetDetailPage
