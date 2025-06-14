import { useNavigate } from 'react-router'
import TravelForm from './TravelForm'
import { Card } from '@/shared/components/ui/card'
import { useTravelCreate } from '@/shared/hooks/travels'
import { Travel } from '@/shared/types/domain'

export default function NewTravelPage() {
  const navigate = useNavigate()
  const { mutate: createTravel } = useTravelCreate()

  const handleSubmit = async (data: Omit<Travel, 'id'>) => {
    createTravel(data)
    navigate('/dashboard/travels')
  }

  return (
    <Card className="p-4">
      <TravelForm onSubmitAction={handleSubmit} />
    </Card>
  )
}
