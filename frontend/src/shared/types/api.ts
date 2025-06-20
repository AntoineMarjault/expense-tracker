export interface BaseTransaction {
  id: number
  amount: number
  name: string
  currency: string
  date: string
  category_id: number
  country_code?: string
}

export type TransactionCreate = Omit<BaseTransaction, 'id' | 'currency'> & {
  currency: 'EUR'
}

export type TransactionUpdate = Partial<
  Omit<BaseTransaction, 'currency' | 'id'>
>
