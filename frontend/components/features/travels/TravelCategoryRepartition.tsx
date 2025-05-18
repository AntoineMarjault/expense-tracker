'use client'

import TravelDetailCard from '@/components/features/travels/TravelDetailCard'
import { Travel } from '@/types/domain'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

interface TravelCategoryRepartition {
  travel: Travel
}

interface RenderCustomizedLabelParams {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: RenderCustomizedLabelParams) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const TravelCategoryRepartitionSkeleton = () => (
  <TravelDetailCard title="Répartition">
    <Skeleton className="h-5 w-36 mb-6" />
    <div className="flex justify-center">
      <div className="relative w-[300px] h-[300px]">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <Skeleton className="w-full h-full rounded-full" />
        </div>
      </div>
    </div>
  </TravelDetailCard>
)

const TravelCategoryRepartition = ({ travel }: TravelCategoryRepartition) => {
  const data = travel.expenses_per_category || []

  return (
    <TravelDetailCard title="Répartition">
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total_expense"
              nameKey="category_name"
              outerRadius={100}
              labelLine={false}
              activeShape={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.category_color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(total_expense: number) =>
                `${total_expense.toLocaleString('fr-FR')}€`
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </TravelDetailCard>
  )
}

export default TravelCategoryRepartition
