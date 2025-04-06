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
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={100}
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
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
            <Legend
              formatter={(total_expense) => {
                const item = data.find((d) => d.category_name === total_expense)
                return `${item?.category_emoji} ${total_expense}`
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </BudgetDetailCard>
  )
}

export default BudgetCategoryRepartition
