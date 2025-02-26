import Image from 'next/image'

const Nav = () => {
  return (
    <nav className="flex justify-around p-3 bg-white border-t-gray-200 border-t">
      <NavItem iconFileName="/icons/pie-chart.svg" name="Transactions" />
      <NavItem iconFileName="/icons/home.svg" name="Budgets" />
    </nav>
  )
}

interface NavItemProps {
  iconFileName: string
  name: string
}

const NavItem = ({ iconFileName, name }: NavItemProps) => {
  return (
    <div className="flex flex-col items-center fill-gray-500 hover:cursor-pointer hover:fill-blue-500 ">
      <Image
        aria-hidden
        src={iconFileName}
        alt={name}
        width={24}
        height={24}
        className="hover:fill-current"
      />
      <p className="text-gray-500 text-xs">{name}</p>
    </div>
  )
}

export default Nav
