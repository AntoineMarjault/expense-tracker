import { Card } from '@/components/ui/card'
import { BiChevronRight } from 'react-icons/bi'
import Link from 'next/link'

interface TravelCardProps {
  name: string
  id: number
  start_date: string
  end_date: string
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const TravelCard = ({ name, id, start_date, end_date }: TravelCardProps) => (
  <Link href={`/dashboard/travels/${id}`}>
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 mb-2 p-4">
      <div className="flex items-center justify-between h-full">
        <div className="space-y-2">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-600">
            {formatDate(start_date)} - {formatDate(end_date)}
          </div>
        </div>
        <BiChevronRight className="h-5 w-5 self-center" />
      </div>
    </Card>
  </Link>
)

export default TravelCard
