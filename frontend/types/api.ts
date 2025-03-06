export interface BaseTransaction {
  id: number
  amount: number
  name: string
  currency: string
  date: string
  category_id: number
}

export type TransactionCreate = Omit<BaseTransaction, 'id' | 'currency'> & {
  currency: 'EUR'
}
