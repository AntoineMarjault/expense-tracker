import Nav from './Nav'
import Header from './Header'
import { Outlet } from 'react-router'

// TODO: add metadata title

const DashboardLayout = () => (
  <div className="flex min-h-screen flex-col bg-gray-100">
    <Header />
    <main className="mx-auto w-full max-w-7xl flex-1 overflow-auto px-4 py-2 sm:px-16 sm:py-4 md:px-32 md:py-6">
    <Outlet />
    </main>
    <Nav className="sticky bottom-0 sm:pb-2 md:pb-4" />
  </div>
)

export default DashboardLayout
