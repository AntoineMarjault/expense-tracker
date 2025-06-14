import { IconType } from 'react-icons/lib'

export type HeaderAction = {
  label: string
  icon: IconType
  onClick: () => void
}

export type HeaderConfig = {
  title: string
  showBack?: boolean
  menuActions?: HeaderAction[]
}
