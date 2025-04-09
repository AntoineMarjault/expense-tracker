'use client'

import TransactionCard from '@/components/features/transactions/TransactionCard'
import { useTransactionIndex } from '@/hooks/transactions'
import { useCategoryIndex } from '@/hooks/categories'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

const TransactionGroupSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-5 w-32 mb-2" />
    <div className="space-y-2">
      <div className="bg-white rounded-lg px-6 py-2 shadow">
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
      <div className="bg-white rounded-lg px-6 py-2 shadow">
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

const TransactionsPage = () => {
  const { data: transactions = [], isLoading: transactionsLoading } =
    useTransactionIndex()
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategoryIndex()

  const isLoading = transactionsLoading || categoriesLoading

  const transactionsWithCategory = transactions.map((transaction) => {
    const category = categories.find(
      (category) => category.id === transaction.category_id
    )
    return {
      ...transaction,
      category: category || { name: '', emoji: '' },
    }
  })

  const groupedTransactions = transactionsWithCategory.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
      return groups
    },
    {} as Record<string, typeof transactionsWithCategory>
  )

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

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
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {formatDate(date)}
            </h3>
            {transactions.map((transaction) => (
              <Link
                key={transaction.id}
                href={`/dashboard/transactions/${transaction.id}`}
              >
                <TransactionCard
                  amount={transaction.amount}
                  name={transaction.name}
                  categoryName={transaction.category.name}
                  categoryEmoji={transaction.category.emoji}
                />
              </Link>
            ))}
          </div>
        ))}
    </div>
  )
}

export default TransactionsPage
