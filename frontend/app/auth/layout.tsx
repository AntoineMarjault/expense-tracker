import { ReactNode } from 'react'
import { WalletCards } from 'lucide-react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-sm p-8">
      <div className="flex flex-col items-center mb-8">
        <WalletCards className="h-12 w-12 text-primary mb-2" />
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
      </div>
      {children}
    </div>
  </div>
)

export default AuthLayout
