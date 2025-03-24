'use client'

import { useBudgetIndex } from '@/hooks/budgets'

const BudgetsPage = () => {
  const { data, isLoading } = useBudgetIndex()

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        data?.map((budget) => (
          <div key={budget.id}>
            <p>{budget.name}</p>
          </div>
        ))}
    </>
  )
}

export default BudgetsPage
