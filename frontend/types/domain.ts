export interface Transaction {
  id: number
  amount: number
  name: string
  currency: string
  date: string
  category_id: number
}

export interface Category {
  id: number
  name: string
  color: string
  emoji: string
}

export interface Budget {
  id: number
  name: string
  target_amount: number
  start_date: string
  end_date: string
}
