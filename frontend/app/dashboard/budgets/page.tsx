'use client'

import { useBudgetIndex } from '@/hooks/budgets'
import BudgetCard from '@/components/features/budgets/BudgetCard'

const BudgetsPage = () => {
  const { data, isLoading } = useBudgetIndex()

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        data?.map((budget) => (
          <BudgetCard key={budget.id} id={budget.id} name={budget.name} />
        ))}
    </>
  )
}

export default BudgetsPage
