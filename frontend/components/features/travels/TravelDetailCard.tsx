import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

interface TravelDetailCardProps {
  title?: string
  children: ReactNode
}

const TravelDetailCard = ({ title, children }: TravelDetailCardProps) => (
  <Card className="p-6">
    {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
    {children}
  </Card>
)

export default TravelDetailCard
