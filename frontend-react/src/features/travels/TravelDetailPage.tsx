import { useTravelShow, useTravelStatisticsShow } from '@/shared/hooks/travels'
import { useParams } from 'react-router'
import { Skeleton } from '@/shared/components/ui/skeleton'
import TravelProgress, { TravelProgressSkeleton } from './TravelProgress'
import TravelSummary, { TravelSummarySkeleton } from './TravelSummary'
import TravelCategoryRepartition, {
  TravelCategoryRepartitionSkeleton,
} from './TravelCategoryRepartition'
import TravelSpendingPerCountry, {
  TravelSpendingPerCountrySkeleton,
} from './TravelSpendingPerCountry'

const TravelDetailSkeleton = () => (
  <>
    <Skeleton className="mb-2 h-8 w-48" />
    <div className="flex flex-col gap-4">
      <TravelSummarySkeleton />
      <TravelProgressSkeleton />
      <TravelCategoryRepartitionSkeleton />
      <TravelSpendingPerCountrySkeleton />
    </div>
  </>
)

const TravelDetailPage = () => {
  const { id } = useParams()
  const parsedId = id ? parseInt(id) : NaN
  const { data: travel, isLoading: travelLoading } = useTravelShow(parsedId)
  const { data: statistics, isLoading: statisticsLoading } =
    useTravelStatisticsShow(parsedId)

  const isLoading = travelLoading || statisticsLoading

  return (
    <>
      {isLoading && <TravelDetailSkeleton />}
      {!isLoading && travel && statistics && (
        <>
          <h1 className="mb-2 text-2xl font-bold">{travel.name}</h1>
          <div className="flex flex-col gap-4">
            <TravelSummary travel={travel} statistics={statistics} />
            <TravelProgress statistics={statistics} />
            <TravelCategoryRepartition statistics={statistics} />
            <TravelSpendingPerCountry statistics={statistics} />
          </div>
        </>
      )}
    </>
  )
}

export default TravelDetailPage
