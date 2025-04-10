import Link from 'next/link'
import { BiPlus } from 'react-icons/bi'

interface FloatingActionButtonProps {
  href: string
}

const FloatingActionButton = ({ href }: FloatingActionButtonProps) => (
  <Link
    href={href}
    className="fixed bottom-20 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110"
  >
    <BiPlus className="h-6 w-6" />
  </Link>
)

export default FloatingActionButton
