'use client'

import TransactionCard from '@/components/features/transactions/TransactionCard'
import { useTransactionIndex } from '@/hooks/transactions'
import { useCategoryIndex } from '@/hooks/categories'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

const TransactionSkeleton = () => (
  <div className="p-4 mb-2 bg-white rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
      <Skeleton className="h-4 w-[80px]" />
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

  return (
    <div className="">
      {isLoading && (
        <>
          <TransactionSkeleton />
          <TransactionSkeleton />
          <TransactionSkeleton />
        </>
      )}
      {transactionsWithCategory.map((transactionWithCategory) => (
        <Link
          key={transactionWithCategory.id}
          href={`/dashboard/transactions/${transactionWithCategory.id}`}
        >
          <TransactionCard
            amount={transactionWithCategory.amount}
            name={transactionWithCategory.name}
            date={transactionWithCategory.date}
            categoryName={transactionWithCategory.category.name}
            categoryEmoji={transactionWithCategory.category.emoji}
          />
        </Link>
      ))}
    </div>
  )
}

export default TransactionsPage
