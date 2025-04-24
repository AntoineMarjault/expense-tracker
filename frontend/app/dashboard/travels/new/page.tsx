'use client'

import { useRouter } from 'next/navigation'
import TravelForm from '@/components/features/travels/TravelForm'
import { Card } from '@/components/ui/card'
import { useTravelCreate } from '@/hooks/travels'
import { Travel } from '@/types/domain'

export default function NewTravelPage() {
  const router = useRouter()
  const { mutate: createTravel } = useTravelCreate()

  const handleSubmit = async (data: Omit<Travel, 'id'>) => {
    createTravel(data)
    router.push('/dashboard/travels')
  }

  return (
    <Card className="p-4">
      <TravelForm onSubmitAction={handleSubmit} />
    </Card>
  )
}
