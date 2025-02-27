'use client'

import TransactionCard from '@/app/transactions/TransactionCard'
import { useTransactionIndex } from '@/hooks/transactions'

// Transformations API:
// Get the category name and emoji -> GET route on the API
// Change amount from string to numer -> change in the /GET transactions :id route
// Return currency symbol instead of currency ?
// Format the date to JJ/MM/AA -> I think we can change that in the frontend

const TransactionsPage = () => {
  const { data: transactions = [], isLoading } = useTransactionIndex()

  return (
    <div className="">
      {isLoading && <p>Loading...</p>}
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          amount={transaction.amount}
          name={transaction.name}
          date={transaction.date}
          categoryName="food"
          categoryEmoji="🚆"
        />
      ))}
    </div>
  )
}

export default TransactionsPage
