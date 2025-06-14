import { Card } from '@/shared/components/ui/card'
import { BiChevronRight } from 'react-icons/bi'
import { Link } from 'react-router'

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
  <Link to={`/dashboard/travels/${id}`}>
    <Card className="mb-2 cursor-pointer p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex h-full items-center justify-between">
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
