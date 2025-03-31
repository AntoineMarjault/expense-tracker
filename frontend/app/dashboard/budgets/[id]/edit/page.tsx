'use client'

import { useRouter } from 'next/navigation'
import BudgetForm from '@/components/features/budgets/BudgetForm'
import { Card } from '@/components/ui/card'
import { useBudgetShow, useBudgetUpdate } from '@/hooks/budgets'
import { Budget } from '@/types/domain'
import { use } from 'react'

interface EditBudgetPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditBudgetPage({ params }: EditBudgetPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { data: budget, isLoading } = useBudgetShow(id)
  const { mutate: updateBudget } = useBudgetUpdate(id)

  if (isLoading) return null

  const handleSubmit = async (data: Partial<Omit<Budget, 'id'>>) => {
    updateBudget(data)
    router.push('/dashboard/budgets')
  }

  return (
    <Card className="p-4">
      <BudgetForm initialData={{ ...budget }} onSubmitAction={handleSubmit} />
    </Card>
  )
}
