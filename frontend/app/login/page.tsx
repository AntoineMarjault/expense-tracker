'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { WalletCards } from 'lucide-react'

interface LoginFormData {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>()

  async function onSubmit(data: LoginFormData) {
    setError('')

    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (response?.error) {
      setError('Identifiants invalides')
      return
    }

    router.push('/dashboard/transactions')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <WalletCards className="h-12 w-12 text-primary mb-2" />
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
        </div>
        <h2 className="text-xl font-semibold text-center mb-6">Connexion</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="w-full"
            />
          </div>
          <div>
            <Input
              {...register('password', { required: true })}
              type="password"
              placeholder="Mot de passe"
              className="w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
