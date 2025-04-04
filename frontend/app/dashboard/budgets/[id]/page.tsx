'use client'

import { useBudgetShow } from '@/hooks/budgets'
import { use } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import BudgetTargetVersusRealityChart from '@/components/features/budgets/BudgetTargetVersusRealityChart'
import BudgetSummary from '@/components/features/budgets/BudgetSummary'

interface BudgetDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const BudgetDetailSkeleton = () => (
  <>
    <Skeleton className="h-8 w-48 mb-2" />
    <div className="flex flex-col gap-4">
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
      <Card className="p-6">
        <Skeleton className="h-[300px] w-full" />
      </Card>
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
            <BudgetTargetVersusRealityChart budget={budget} />
          </div>
        </>
      )}
    </>
  )
}

export default BudgetDetailPage
