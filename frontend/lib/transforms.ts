import { ApiTransaction } from '@/types/api'
import { Transaction } from '@/types/domain'

export function transformTransaction(
  apiTransaction: ApiTransaction
): Transaction {
  return {
    id: apiTransaction.id,
    amount: parseFloat(apiTransaction.amount),
    name: apiTransaction.name,
    currency: apiTransaction.currency,
    date: formatDate(apiTransaction.date),
    category_id: apiTransaction.category_id,
  }
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
