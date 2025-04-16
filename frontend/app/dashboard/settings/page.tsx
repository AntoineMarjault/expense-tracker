'use client'

import { Button } from '@/components/ui/button'
import { BiLogOut } from 'react-icons/bi'
import { FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useUserDelete } from '@/hooks/users'
import { useAccount } from '@/hooks/account'
import ConfirmationModal from '@/components/ui/custom/ConfirmationModal'

const SettingsPage = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { mutate: deleteUser } = useUserDelete()
  const { user_id } = useAccount()

  const handleDeleteUser = () => {
    deleteUser(user_id, {
      onSuccess: () => signOut(),
    })
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      <ConfirmationModal
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={() => signOut()}
        title="Se déconnecter"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Confirmer la déconnexion"
        cancelText="Annuler"
      >
        <Button
          variant="default"
          className="w-full flex items-center justify-center gap-2"
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
          className="w-full flex items-center justify-center gap-2"
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
