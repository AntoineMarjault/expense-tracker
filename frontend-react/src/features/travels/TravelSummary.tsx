import TravelDetailCard from './TravelDetailCard'
import { Progress } from '@/shared/components/ui/progress'
import { Travel, TravelStatistics } from '@/shared/types/domain'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Card } from '@/shared/components/ui/card'
import { formatAmount } from '@/lib/utils'

export const TravelSummarySkeleton = () => (
  <Card className="p-6">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <Skeleton className="mb-2 h-4 w-20" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="text-right">
        <Skeleton className="mb-2 h-4 w-20" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>

    <Skeleton className="mb-3 h-2.5 w-full" />

    <div className="grid grid-cols-3 text-sm">
      <div>
        <Skeleton className="mb-2 h-4 w-16" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="text-center">
        <Skeleton className="mx-auto mb-2 h-4 w-16" />
        <Skeleton className="mx-auto h-5 w-32" />
      </div>
      <div className="text-right">
        <Skeleton className="mb-2 ml-auto h-4 w-16" />
        <Skeleton className="ml-auto h-5 w-24" />
      </div>
    </div>
  </Card>
)

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
  })

interface TravelSummaryProps {
  travel: Travel
  statistics: TravelStatistics
}

const TravelSummary = ({ travel, statistics }: TravelSummaryProps) => {
  const remaining = statistics?.remaining_amount || 0

  return (
    <TravelDetailCard>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Période</p>
          <p className="font-medium">
            {formatDate(new Date(travel.start_date))} →{' '}
            {formatDate(new Date(travel.end_date))}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Objectif</p>
          <p className="font-medium">
            {formatAmount(travel.target_amount || 0)} €
          </p>
        </div>
      </div>

      <Progress value={statistics.progress_percentage} className="mb-3 h-2.5" />

      <div className="grid grid-cols-3 text-sm">
        <div>
          <span className="text-gray-500">Dépensé</span>
          <p className="font-medium text-red-600">
            {formatAmount(statistics.spent_amount || 0)} €
          </p>
        </div>
        <div className="text-center">
          <span className="text-gray-500">Moy. / jour</span>
          <p>
            <span
              className={`font-medium ${
                (statistics.average_daily_spending || 0) >
                (statistics.daily_spending_target || 0)
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {formatAmount(statistics.average_daily_spending || 0)} €
            </span>
            {` / ${formatAmount(statistics.daily_spending_target || 0)} €`}
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
    </TravelDetailCard>
  )
}

export default TravelSummary
