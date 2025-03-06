import { BaseTransaction } from '@/types/api'
import { Transaction } from '@/types/domain'

export function transformTransaction(
  baseTransaction: BaseTransaction
): Transaction {
  return {
    id: baseTransaction.id,
    amount: baseTransaction.amount,
    name: baseTransaction.name,
    currency: baseTransaction.currency,
    date: formatDate(baseTransaction.date),
    category_id: baseTransaction.category_id,
  }
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
