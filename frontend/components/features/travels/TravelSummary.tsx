import TravelDetailCard from '@/components/features/travels/TravelDetailCard'
import { Progress } from '@/components/ui/progress'
import { Travel } from '@/types/domain'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { formatAmount } from '@/lib/utils'

export const TravelSummarySkeleton = () => (
  <Card className="p-6">
    <div className="flex justify-between items-center mb-4">
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="text-right">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>

    <Skeleton className="h-2.5 w-full mb-3" />

    <div className="grid grid-cols-3 text-sm">
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="text-center">
        <Skeleton className="h-4 w-16 mx-auto mb-2" />
        <Skeleton className="h-5 w-32 mx-auto" />
      </div>
      <div className="text-right">
        <Skeleton className="h-4 w-16 ml-auto mb-2" />
        <Skeleton className="h-5 w-24 ml-auto" />
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
}

const TravelSummary = ({ travel }: TravelSummaryProps) => {
  const remaining = travel?.remaining_amount || 0

  return (
    <TravelDetailCard>
      <div className="flex justify-between items-center mb-4">
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

      <Progress value={travel.progress_percentage} className="h-2.5 mb-3" />

      <div className="grid grid-cols-3 text-sm">
        <div>
          <span className="text-gray-500">Dépensé</span>
          <p className="font-medium text-red-600">
            {formatAmount(travel.spent_amount || 0)} €
          </p>
        </div>
        <div className="text-center">
          <span className="text-gray-500">Moy. / jour</span>
          <p>
            <span
              className={`font-medium ${
                (travel.average_daily_spending || 0) >
                (travel.target_daily_amount || 0)
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {formatAmount(travel.average_daily_spending || 0)} €
            </span>
            {` / ${formatAmount(travel.target_daily_amount || 0)} €`}
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
