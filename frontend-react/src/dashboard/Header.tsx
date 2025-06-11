import { BiArrowBack } from 'react-icons/bi'
import HeaderMenu from './HeaderMenu'
import { useHeaderConfig } from '../hooks/useHeaderConfig'
import { useNavigate } from 'react-router'

const Header = () => {
  const navigate = useNavigate()
  const config = useHeaderConfig()

  return (
    <header className="flex h-12 items-center border-b border-gray-200 bg-white">
      <div className="flex w-full items-center justify-between px-4">
        <div
          className={`flex ${!config.showBack && !config.menuActions ? 'w-full justify-center' : ''}`}
        >
          {config.showBack && (
            <button onClick={() => navigate(-1)} className="mr-4">
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
