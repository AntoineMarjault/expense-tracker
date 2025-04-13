'use client'

import { Button } from '@/components/ui/button'
import { BiLogOut } from 'react-icons/bi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

const SettingsPage = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  return (
    <div className="py-4">
      <Button
        variant="destructive"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => setShowLogoutDialog(true)}
      >
        <BiLogOut size={20} />
        Se déconnecter
      </Button>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Se déconnecter</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </DialogDescription>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => signOut()}
            >
              <BiLogOut size={20} />
              Confirmer la déconnexion
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
              className="w-full"
            >
              Annuler
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SettingsPage
