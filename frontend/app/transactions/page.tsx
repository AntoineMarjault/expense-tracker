import TransactionCard from '@/app/transactions/TransactionCard'

const transactions: Transaction[] = [
  {
    id: 1,
    amount: 59.63,
    name: 'Train Paris - Nantes',
    currency: 'EUR',
    date: '25/02/2025',
    category_id: 12,
    categoryName: 'Transport',
    categoryEmoji: '🚆',
  },
  {
    id: 2,
    amount: 8.63,
    name: 'Petit dej',
    currency: 'EUR',
    date: '25/02/2025',
    category_id: 4,
    categoryName: 'Food',
    categoryEmoji: '🍔',
  },
  {
    id: 3,
    amount: 75.0,
    name: 'Hotel La Baule',
    currency: 'EUR',
    date: '25/02/2025',
    category_id: 8,
    categoryName: 'Accomodation',
    categoryEmoji: '🏨',
  },
]

// Transformations API:
// Get the category name and emoji -> GET route on the API
// Change amount from string to numer -> change in the /GET transactions :id route
// Return currency symbol instead of currency ?
// Format the date to JJ/MM/AA -> I think we can change that in the frontend

interface Transaction {
  id: number
  amount: number
  name: string
  currency: string
  date: string
  category_id: number
  categoryName: string
  categoryEmoji: string
}

const TransactionsPage = () => {
  return (
    <div className="">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          amount={transaction.amount}
          name={transaction.name}
          date={transaction.date}
          categoryName={transaction.categoryName}
          categoryEmoji={transaction.categoryEmoji}
        />
      ))}
    </div>
  )
}

export default TransactionsPage
