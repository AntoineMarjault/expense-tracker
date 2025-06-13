import { BiPieChartAlt2, BiHomeAlt2, BiCog } from 'react-icons/bi'
import { Link, useLocation } from 'react-router'
import { ReactNode } from 'react'

const iconSize = 20

interface NavProps {
  className: string
}

const Nav = ({ className }: NavProps) => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <nav
      className={`${className} flex justify-around border-t border-t-gray-200 bg-white p-3`}
    >
      <NavItem
        icon={<BiHomeAlt2 size={iconSize} />}
        name="Dépenses"
        href="/dashboard/transactions"
        active={pathname === '/dashboard/transactions'}
      />
      <NavItem
        icon={<BiPieChartAlt2 size={iconSize} />}
        name="Voyage"
        href="/dashboard/travels"
        active={pathname === '/dashboard/travels'}
      />
      <NavItem
        icon={<BiCog size={iconSize} />}
        name="Réglages"
        href="/dashboard/settings"
        active={pathname === '/dashboard/settings'}
      />
    </nav>
  )
}

interface NavItemProps {
  icon: ReactNode
  name: string
  href: string
  active?: boolean
}

const NavItem = ({ icon, name, href, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={`flex flex-col items-center transition-colors duration-300 ${
        active ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
      }`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{name}</span>
    </Link>
  )
}

export default Nav
