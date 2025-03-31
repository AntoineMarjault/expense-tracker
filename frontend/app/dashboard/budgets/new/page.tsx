'use client'

import { useRouter } from 'next/navigation'
import BudgetForm from '@/components/features/budgets/BudgetForm'
import { Card } from '@/components/ui/card'
import { useBudgetCreate } from '@/hooks/budgets'
import { Budget } from '@/types/domain'

export default function NewBudgetPage() {
  const router = useRouter()
  const { mutate: createBudget } = useBudgetCreate()

  const handleSubmit = async (data: Omit<Budget, 'id'>) => {
    createBudget(data)
    router.push('/dashboard/budgets')
  }

  return (
    <Card className="p-4">
      <BudgetForm onSubmitAction={handleSubmit} />
    </Card>
  )
}
