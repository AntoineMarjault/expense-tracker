'use client'

import { Progress } from '@/components/ui/progress'
import { useBudgetShow } from '@/hooks/budgets'
import { use } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import BudgetTargetVersusRealityChart from '@/components/features/budgets/BudgetTargetVersusRealityChart'

interface BudgetDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const BudgetDetailSkeleton = () => (
  <>
    <Skeleton className="h-8 w-48 mb-2" />
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
  </>
)

const BudgetDetailPage = ({ params }: BudgetDetailPageProps) => {
  const { id } = use(params)
  const { data: budget, isLoading } = useBudgetShow(id)
  const remaining = budget?.remaining_amount || 0

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  return (
    <>
      {isLoading && <BudgetDetailSkeleton />}
      {!isLoading && budget && (
        <>
          <h1 className="text-2xl font-bold mb-2">{budget.name}</h1>
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Période</p>
                <p className="font-medium">
                  {formatDate(new Date(budget.start_date))} -{' '}
                  {formatDate(new Date(budget.end_date))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Objectif</p>
                <p className="font-medium">
                  {budget.target_amount.toLocaleString('fr-FR')} €
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Moyenne / jour</p>
                <p className="font-medium">
                  <span
                    className={`${
                      (budget.average_daily_spending || 0) >
                      (budget.target_daily_amount || 0)
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {budget.average_daily_spending?.toLocaleString('fr-FR')} €
                  </span>
                  {' / '}
                  {budget.target_daily_amount?.toLocaleString('fr-FR')} €
                </p>
              </div>
            </div>
            <Progress value={budget.progress_percentage} className="h-3 mb-4" />
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-gray-600">Dépensé : </span>
                <span className="font-medium text-red-600">
                  {budget.spent_amount || '?'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Reste : </span>
                <span
                  className={`font-medium ${
                    remaining >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {remaining.toLocaleString('fr-FR')} €
                </span>
              </div>
            </div>
          </Card>
          <BudgetTargetVersusRealityChart budget={budget} />
        </>
      )}
    </>
  )
}

export default BudgetDetailPage
