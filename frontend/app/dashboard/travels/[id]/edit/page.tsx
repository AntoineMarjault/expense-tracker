'use client'

import { useRouter } from 'next/navigation'
import TravelForm from '@/components/features/travels/TravelForm'
import { Card } from '@/components/ui/card'
import { useTravelShow, useTravelUpdate } from '@/hooks/travels'
import { Travel } from '@/types/domain'
import { use } from 'react'

interface EditTravelPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditTravelPage({ params }: EditTravelPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { data: travel, isLoading } = useTravelShow(parseInt(id))
  const { mutate: updateTravel } = useTravelUpdate(parseInt(id))

  if (isLoading) return null

  const handleSubmit = async (data: Partial<Omit<Travel, 'id'>>) => {
    updateTravel(data)
    router.push('/dashboard/travels')
  }

  return (
    <Card className="p-4">
      <TravelForm initialData={{ ...travel }} onSubmitAction={handleSubmit} />
    </Card>
  )
}
