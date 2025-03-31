'use client'

import { useRouter } from 'next/navigation'
import { BiArrowBack } from 'react-icons/bi'
import HeaderMenu from '@/components/HeaderMenu'
import { useHeaderConfig } from '@/hooks/useHeaderConfig'

const Header = () => {
  const router = useRouter()
  const config = useHeaderConfig()

  return (
    <header className="flex items-center h-12 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between w-full px-4">
        <div
          className={`flex ${!config.showBack && !config.menuActions ? 'w-full justify-center' : ''}`}
        >
          {config.showBack && (
            <button onClick={() => router.back()} className="mr-4">
              <BiArrowBack className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-l font-bold">{config.title}</h1>
        </div>
        {config.menuActions && (
          <div className="flex items-center">
            <HeaderMenu actions={config.menuActions} />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
