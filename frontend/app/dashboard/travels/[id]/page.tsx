'use client'

import { useTravelShow } from '@/hooks/travels'
import { use } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import TravelProgress, {
  TravelProgressSkeleton,
} from '@/components/features/travels/TravelProgress'
import TravelSummary, {
  TravelSummarySkeleton,
} from '@/components/features/travels/TravelSummary'
import TravelCategoryRepartition, {
  TravelCategoryRepartitionSkeleton,
} from '@/components/features/travels/TravelCategoryRepartition'

interface TravelDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const TravelDetailSkeleton = () => (
  <>
    <Skeleton className="h-8 w-48 mb-2" />
    <div className="flex flex-col gap-4">
      <TravelSummarySkeleton />
      <TravelProgressSkeleton />
      <TravelCategoryRepartitionSkeleton />
    </div>
  </>
)

const TravelDetailPage = ({ params }: TravelDetailPageProps) => {
  const { id } = use(params)
  const { data: travel, isLoading } = useTravelShow(parseInt(id))

  return (
    <>
      {isLoading && <TravelDetailSkeleton />}
      {!isLoading && travel && (
        <>
          <h1 className="text-2xl font-bold mb-2">{travel.name}</h1>
          <div className="flex flex-col gap-4">
            <TravelSummary travel={travel} />
            <TravelProgress travel={travel} />
            <TravelCategoryRepartition travel={travel} />
          </div>
        </>
      )}
    </>
  )
}

export default TravelDetailPage
