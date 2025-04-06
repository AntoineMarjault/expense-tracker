'use client'

import BudgetDetailCard from '@/components/features/budgets/BudgetDetailCard'
import { Budget } from '@/types/domain'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

interface BudgetCategoryRepartition {
  budget: Budget
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

const BudgetCategoryRepartition = ({ budget }: BudgetCategoryRepartition) => {
  const data = budget.expenses_per_category || []

  return (
    <BudgetDetailCard title="Répartition">
      <div className="h-[300px]">
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
    </BudgetDetailCard>
  )
}

export default BudgetCategoryRepartition
