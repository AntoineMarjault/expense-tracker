import { Outlet } from 'react-router'
import { WalletCards } from 'lucide-react'

const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-sm p-8">
      <div className="mb-8 flex flex-col items-center">
        <WalletCards className="text-primary mb-2 h-12 w-12" />
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
      </div>
      <Outlet />
    </div>
  </div>
)

export default AuthLayout
