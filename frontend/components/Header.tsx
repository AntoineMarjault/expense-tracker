'use client'

import { usePathname, useRouter } from 'next/navigation'
import { BiArrowBack } from 'react-icons/bi'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()

  const getTitle = () => {
    if (pathname?.includes('/budgets')) return 'Budgets'
    if (pathname?.includes('/transactions')) return 'Dépenses'
    return 'Dépenses'
  }

  const displayBackButton = pathname?.match(/^\/dashboard\/budgets\/\d+$/)

  return (
    <header className="flex items-center justify-center h-12 bg-white border-b border-gray-200">
      <div
        className={`flex items-center ${displayBackButton ? 'px-4' : 'justify-center'} w-full`}
      >
        {displayBackButton && (
          <button onClick={() => router.back()} className="mr-4">
            <BiArrowBack className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-l font-bold">{getTitle()}</h1>
      </div>
    </header>
  )
}

export default Header
