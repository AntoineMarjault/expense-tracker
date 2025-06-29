import TransactionCard from './TransactionCard'
import { useTransactionIndex } from '@/shared/hooks/transactions'
import { useCategoryIndex } from '@/shared/hooks/categories'
import { Link, Outlet } from 'react-router'
import { Skeleton } from '@/shared/components/ui/skeleton'
import FloatingActionButton from '@/shared/components/ui/custom/FloatingActionButton.tsx'

const TransactionGroupSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="mb-2 h-5 w-32" />
    <div className="space-y-2">
      <div className="rounded-lg bg-white px-6 py-2 shadow">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="rounded-lg bg-white px-6 py-2 shadow">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  </div>
)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const TransactionsPage = () => {
  const { data: transactions = [], isLoading: transactionsLoading } =
    useTransactionIndex()
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategoryIndex()

  const isLoading = transactionsLoading || categoriesLoading

  const transactionsWithCategory = transactions.map((transaction) => {
    const category = categories.find(
      (category) => category.id === transaction.category_id,
    )
    return {
      ...transaction,
      category: category || { name: '', emoji: '' },
    }
  })

  const groupedTransactions = transactionsWithCategory.reduce(
    (groups, transaction) => {
      const date = formatDate(transaction.date)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
      return groups
    },
    {} as Record<string, typeof transactionsWithCategory>,
  )

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <TransactionGroupSkeleton />
          <TransactionGroupSkeleton />
        </>
      )}
      {!isLoading &&
        Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date}>
            <h3 className="mb-2 text-sm font-medium text-gray-500">{date}</h3>
            {transactions.map((transaction) => (
              <Link
                to={`/dashboard/transactions/${transaction.id}`}
                key={transaction.id}
              >
                <TransactionCard
                  amount={transaction.amount}
                  amountInDefaultCurrency={
                    transaction.amount_in_default_currency
                  }
                  name={transaction.name}
                  categoryName={transaction.category.name}
                  categoryEmoji={transaction.category.emoji}
                  currency={transaction.currency}
                />
              </Link>
            ))}
          </div>
        ))}
      <FloatingActionButton href="/dashboard/transactions/new" />
      <Outlet />
    </div>
  )
}

export default TransactionsPage
