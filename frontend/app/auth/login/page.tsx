'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

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
    <>
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
      <div className="mt-4 text-center">
        <Link
          href="/auth/signup"
          className="text-sm text-primary hover:underline"
        >
          Pas encore de compte ? Inscrivez-vous
        </Link>
      </div>
    </>
  )
}

export default LoginPage
