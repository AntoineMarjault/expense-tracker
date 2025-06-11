import { Button } from '@/components/ui/button'
import { BiLogOut } from 'react-icons/bi'
import { FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { api } from '@/lib/api-client'
import { useUserDelete } from '@/hooks/users'
import { useAccount } from '@/hooks/account'
import ConfirmationModal from './ConfirmationModal'

const SettingsPage = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { mutate: deleteUser } = useUserDelete()
  const { user_id } = useAccount()

  const handleDeleteUser = () => {
    deleteUser(user_id, {
      onSuccess: () => api.logout(),
    })
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <ConfirmationModal
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={() => api.logout()}
        title="Se déconnecter"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Confirmer la déconnexion"
        cancelText="Annuler"
      >
        <Button
          variant="default"
          className="flex w-full items-center justify-center gap-2"
          onClick={() => setShowLogoutDialog(true)}
        >
          <BiLogOut size={20} />
          Se déconnecter
        </Button>
      </ConfirmationModal>

      <ConfirmationModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteUser}
        title="Supprimer mon compte"
        description="Cette action est irréversible. Toutes vos données seront supprimées définitivement."
        confirmText="Confirmer la suppression"
        cancelText="Annuler"
      >
        <Button
          variant="destructive"
          className="flex w-full items-center justify-center gap-2"
          onClick={() => setShowDeleteDialog(true)}
        >
          <FiTrash2 size={20} />
          Supprimer mon compte
        </Button>
      </ConfirmationModal>
    </div>
  )
}

export default SettingsPage
