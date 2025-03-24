'use client'

import TransactionCard from '@/components/features/transactions/TransactionCard'
import { useTransactionIndex } from '@/hooks/transactions'
import { useCategoryIndex } from '@/hooks/categories'
import Link from 'next/link'

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
      {isLoading && <p>Loading...</p>}
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
