'use client'

import { BiDotsVertical } from 'react-icons/bi'
import { HeaderAction } from '@/types/header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type HeaderMenuProps = {
  actions: HeaderAction[]
}

const HeaderMenu = ({ actions }: HeaderMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <BiDotsVertical className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className="flex items-center cursor-pointer"
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
