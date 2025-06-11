import { useTravelIndex } from '@/hooks/travels'
import TravelCard from './TravelCard'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const TravelSkeleton = () => (
  <Card className="mb-2 p-4">
    <div className="mb-2 flex items-center justify-between">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-5 w-5" />
    </div>
    <Skeleton className="mb-2 h-2 w-full" />
    <div className="flex justify-between">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
  </Card>
)

const TravelsPage = () => {
  const { data: travels = [], isLoading } = useTravelIndex()

  return (
    <>
      {isLoading && (
        <>
          <TravelSkeleton />
          <TravelSkeleton />
          <TravelSkeleton />
        </>
      )}
      {!isLoading &&
        travels.map((travel) => (
          <TravelCard
            key={travel.id}
            id={travel.id}
            name={travel.name}
            start_date={travel.start_date}
            end_date={travel.end_date}
          />
        ))}
    </>
  )
}

export default TravelsPage
