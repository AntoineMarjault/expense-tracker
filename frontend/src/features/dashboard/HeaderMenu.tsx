import { BiDotsVertical } from 'react-icons/bi'
import { HeaderAction } from '@/shared/types/header.ts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu.tsx'

type HeaderMenuProps = {
  actions: HeaderAction[]
}

const HeaderMenu = ({ actions }: HeaderMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <BiDotsVertical className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className="flex cursor-pointer items-center"
          >
            <action.icon className="h-5 w-5" />
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HeaderMenu
