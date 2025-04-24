import { useRouter, usePathname } from 'next/navigation'
import { HeaderConfig } from '@/types/header'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useTravelDelete } from '@/hooks/travels'

export const useHeaderConfig = (): HeaderConfig => {
  const router = useRouter()
  const pathname = usePathname()
  const { mutate: deleteTravel } = useTravelDelete()

  if (pathname.match(/^\/dashboard\/travels\/\d+$/)) {
    const travelId = pathname.split('/').pop() || ''
    return {
      title: 'Détails du voyage',
      showBack: true,
      menuActions: [
        {
          label: 'Modifier',
          icon: BiEdit,
          onClick: () => router.push(`/dashboard/travels/${travelId}/edit`),
        },
        {
          label: 'Supprimer',
          icon: BiTrash,
          onClick: () => {
            deleteTravel(parseInt(travelId))
            router.back()
          },
        },
      ],
    }
  }

  // Travel edit page
  if (pathname.match(/^\/dashboard\/travels\/\d+\/edit$/)) {
    return {
      title: 'Modifier le voyage',
      showBack: true,
    }
  }

  // Travel new page
  if (pathname.match(/^\/dashboard\/travels\/new/)) {
    return {
      title: 'Créer un voyage',
      showBack: true,
    }
  }

  // All transaction pages
  if (pathname.startsWith('/dashboard/transactions')) {
    return {
      title: 'Dépenses',
    }
  }

  // Default configs
  const configs: Record<string, HeaderConfig> = {
    '/dashboard/travels': {
      title: 'Voyages',
    },
    '/dashboard/settings': {
      title: 'Réglages',
    },
  }

  return configs[pathname] || { title: 'Dashboard' }
}
