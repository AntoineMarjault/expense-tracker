import { Button } from '@/shared/components/ui/button'
import { BiLogOut } from 'react-icons/bi'
import { FiTrash2 } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { useUserDelete } from '@/shared/hooks/users'
import { useAccount } from '@/shared/hooks/account'
import ConfirmationModal from '../../shared/components/ui/custom/ConfirmationModal.tsx'
import { useNavigate } from 'react-router'
import { AuthContext } from '@/providers/AuthProvider.tsx'

const SettingsPage = () => {
  const navigate = useNavigate()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { mutate: deleteUser } = useUserDelete()
  const { user_id } = useAccount()
  const { logout } = useContext(AuthContext)

  const handleDeleteUser = () => {
    if (!user_id) return
    deleteUser(user_id, {
      onSuccess: () => {
        logout()
        navigate('/auth/login')
      },
    })
  }

  const handleLogOut = () => {
    setShowLogoutDialog(false)
    logout()
    navigate('/auth/login')
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <ConfirmationModal
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogOut}
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
