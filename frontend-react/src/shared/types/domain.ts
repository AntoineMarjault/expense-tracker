export interface Transaction {
  id: number
  amount: number
  amount_in_default_currency: number
  name: string
  currency: string
  date: string
  category_id: number
  country_code: string
}

export interface Category {
  id: number
  name: string
  color: string
  emoji: string
}

export interface DailyCumulativeSpending {
  date: string
  cumulative_amount: number
  target_amount: number
}

export interface ExpenseForCategory {
  category_id: number
  category_name: string
  category_emoji: string
  category_color: string
  total_expense: number
}

export interface Travel {
  id: number
  name: string
  target_amount: number
  start_date: string
  end_date: string
}

export interface TravelStatistics {
  spent_amount: number
  remaining_amount: number
  progress_percentage: number
  average_daily_spending: number
  average_daily_spending_per_country: Record<string, number>
  daily_spending_target: number
  daily_cumulative_spending: DailyCumulativeSpending[]
  expenses_per_category: ExpenseForCategory[]
  days_per_country: Record<string, number>
}

export interface Country {
  code: string
  name: string
  flag: string
}
