'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useUserCreate } from '@/hooks/users'

interface SignUpFormData {
  email: string
  password: string
  password_confirmation: string
}

const SignUpPage = () => {
  const router = useRouter()
  const { mutate: createUser, isPending, error } = useUserCreate()
  const { register, handleSubmit, getValues } = useForm<SignUpFormData>()

  const onSubmit = (data: SignUpFormData) => {
    createUser(
      {
        user: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: () => router.push('/auth/login'),
      }
    )
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-6">Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          className="w-full"
        />
        <Input
          {...register('password', { required: true })}
          type="password"
          placeholder="Mot de passe"
          className="w-full"
        />
        <Input
          {...register('password_confirmation', {
            required: true,
            validate: (value) =>
              value === getValues('password') ||
              'Les mots de passe ne correspondent pas',
          })}
          type="password"
          placeholder="Confirmer le mot de passe"
          className="w-full"
        />
        {error && (
          <p className="text-red-500 text-sm">
            Une erreur est survenue lors de l&apos;inscription
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Inscription...' : "S'inscrire"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link
          href="/auth/login"
          className="text-sm text-primary hover:underline"
        >
          Déjà un compte ? Connectez-vous
        </Link>
      </div>
    </>
  )
}

export default SignUpPage
