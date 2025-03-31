import { useRouter, usePathname } from 'next/navigation'
import { HeaderConfig } from '@/types/header'
import { BiEdit, BiTrash } from 'react-icons/bi'

export const useHeaderConfig = (): HeaderConfig => {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname.match(/^\/dashboard\/budgets\/\d+$/)) {
    const budgetId = pathname.split('/').pop()
    return {
      title: 'Budget',
      showBack: true,
      menuActions: [
        {
          label: 'Edit',
          icon: BiEdit,
          onClick: () => router.push(`/dashboard/budgets/${budgetId}/edit`),
        },
        {
          label: 'Delete',
          icon: BiTrash,
          onClick: () => console.log('Delete budget', budgetId),
        },
      ],
    }
  }

  // Budget edit page
  if (pathname.match(/^\/dashboard\/budgets\/\d+\/edit$/)) {
    return {
      title: 'Edit Budget',
      showBack: true,
    }
  }

  // All transaction pages
  if (pathname.startsWith('/dashboard/transactions')) {
    return {
      title: 'Transactions',
    }
  }

  // Default configs
  const configs: Record<string, HeaderConfig> = {
    '/dashboard/budgets': {
      title: 'Budgets',
    },
  }

  return configs[pathname] || { title: 'Dashboard' }
}
