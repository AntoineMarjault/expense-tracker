'use client'

import Link from 'next/link'
import { BiPlus } from 'react-icons/bi'

const FloatingActionButton = () => {
  return (
    <Link
      href="/dashboard/transactions/new"
      className="fixed bottom-24 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110"
    >
      <BiPlus className="h-6 w-6" />
    </Link>
  )
}

export default FloatingActionButton
