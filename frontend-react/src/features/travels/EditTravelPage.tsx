import { useNavigate, useParams } from 'react-router'
import TravelForm from './TravelForm'
import { Card } from '@/shared/components/ui/card'
import { useTravelShow, useTravelUpdate } from '@/shared/hooks/travels'
import { Travel } from '@/shared/types/domain'

export default function EditTravelPage() {
  const { id } = useParams()
  const parsedId = id ? parseInt(id) : NaN
  const navigate = useNavigate()
  const { data: travel, isLoading } = useTravelShow(parsedId)
  const { mutate: updateTravel } = useTravelUpdate(parsedId)

  if (isLoading) return null

  const handleSubmit = async (data: Partial<Omit<Travel, 'id'>>) => {
    updateTravel(data)
    navigate('/dashboard/travels')
  }

  return (
    <Card className="p-4">
      <TravelForm initialData={{ ...travel }} onSubmitAction={handleSubmit} />
    </Card>
  )
}
