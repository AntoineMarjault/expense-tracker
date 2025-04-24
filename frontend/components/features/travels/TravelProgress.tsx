'use client'

import { Travel } from '@/types/domain'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import TravelDetailCard from '@/components/features/travels/TravelDetailCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

const targetColor = '#E89F76'
const spentColor = '#6BBED6'

export const TravelProgressSkeleton = () => (
  <Card className="p-6">
    <Skeleton className="h-[300px] w-full" />
  </Card>
)

interface TravelProgressProps {
  travel: Travel
}

const TravelProgress = ({ travel }: TravelProgressProps) => {
  const today = new Date().toISOString().split('T')[0]
  const data = travel.daily_cumulative_spending?.map((day) => {
    const isToday = day.date >= today
    const daysFromToday = isToday
      ? Math.floor(
          (new Date(day.date).getTime() - new Date(today).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0

    return {
      date: new Date(day.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
      }),
      target: day.target_amount,
      spent: isToday ? null : day.cumulative_amount,
      prediction:
        day.date >= today && travel?.average_daily_spending
          ? day.cumulative_amount +
            travel.average_daily_spending * daysFromToday
          : null,
      isOverTravel: day.cumulative_amount > day.target_amount,
      today: isToday && daysFromToday === 0 ? day.cumulative_amount : null,
    }
  })

  return (
    <TravelDetailCard title="Progression">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={spentColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={spentColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval={Math.floor(data ? data.length / 6 : 1)}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value.toLocaleString('fr-FR')}€`}
            />
            <Tooltip
              formatter={(value: number) => [
                `${value.toLocaleString('fr-FR')}€`,
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke={targetColor}
              strokeWidth={2}
              name="Objectif"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="spent"
              stroke={spentColor}
              strokeWidth={2}
              dot={false}
              name="Dépenses"
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke={spentColor}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Prévision"
            />
            <Line
              type="monotone"
              dataKey="today"
              stroke={spentColor}
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Aujourd'hui"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </TravelDetailCard>
  )
}

export default TravelProgress
