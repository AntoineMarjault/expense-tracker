import { ReactNode } from 'react'
import { Card } from '@/shared/components/ui/card'

interface TravelDetailCardProps {
  title?: string
  children: ReactNode
}

const TravelDetailCard = ({ title, children }: TravelDetailCardProps) => (
  <Card className="p-6">
    {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
    {children}
  </Card>
)

export default TravelDetailCard
