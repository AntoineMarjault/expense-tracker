'use client'

import { Budget } from '@/types/domain'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import BudgetDetailCard from '@/components/features/budgets/BudgetDetailCard'

interface BudgetTargetVersusRealityChartProps {
  budget: Budget
}

const BudgetProgress = ({ budget }: BudgetTargetVersusRealityChartProps) => {
  const today = new Date().toISOString().split('T')[0]
  const data = budget.daily_cumulative_spending?.map((day) => {
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
        day.date >= today && budget?.average_daily_spending
          ? day.cumulative_amount +
            budget.average_daily_spending * daysFromToday
          : null,
      isOverBudget: day.cumulative_amount > day.target_amount,
      today: isToday && daysFromToday === 0 ? day.cumulative_amount : null,
    }
  })

  return (
    <BudgetDetailCard title="Évolution">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3181FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3181FF" stopOpacity={0.1} />
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
              stroke="#E37900"
              strokeWidth={2}
              name="Objectif"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="spent"
              stroke="#3181FF"
              strokeWidth={2}
              dot={false}
              name="Dépenses"
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="#3181FF"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Prévision"
            />
            <Line
              type="monotone"
              dataKey="today"
              stroke="#3181FF"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Aujourd'hui"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </BudgetDetailCard>
  )
}

export default BudgetProgress
