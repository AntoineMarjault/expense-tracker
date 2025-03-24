'use client'

import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname?.includes('/budgets')) return 'Budgets'
    if (pathname?.includes('/transactions')) return 'Expenses'
    return 'Expenses'
  }

  return (
    <header className="flex items-center justify-center h-12 bg-white border-b border-gray-200">
      <h1 className="text-l font-bold">{getTitle()}</h1>
    </header>
  )
}

export default Header
