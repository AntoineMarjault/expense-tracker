import { BiHomeAlt2 } from 'react-icons/bi'
import { BiPieChartAlt2 } from 'react-icons/bi'
import Link from 'next/link'
import { ReactNode } from 'react'

const iconSize = 20

interface NavProps {
  className: string
}

const Nav = ({ className }: NavProps) => {
  return (
    <nav
      className={`${className} flex justify-around p-3 bg-white border-t border-t-gray-200`}
    >
      <NavItem
        icon={<BiHomeAlt2 size={iconSize} />}
        name="Transactions"
        href="/dashboard/transactions"
      />
      <NavItem
        icon={<BiPieChartAlt2 size={iconSize} />}
        name="Budgets"
        href="/dashboard/budgets"
      />
    </nav>
  )
}

interface NavItemProps {
  icon: ReactNode
  name: string
  href: string
}

const NavItem = ({ icon, name, href }: NavItemProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition-colors duration-300"
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{name}</span>
    </Link>
  )
}

export default Nav
