import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Link, useNavigate } from 'react-router'
import { useUserCreate } from '../../hooks/user.ts'

interface SignUpFormData {
  email: string
  password: string
  password_confirmation: string
}

const SignUpPage = () => {
  const navigate = useNavigate()
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
        onSuccess: () => navigate('/auth/login'),
      },
    )
  }

  return (
    <>
      <h2 className="mb-6 text-center text-xl font-semibold">Inscription</h2>
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
          <p className="text-sm text-red-500">
            Une erreur est survenue lors de l&apos;inscription
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Inscription...' : "S'inscrire"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/auth/login" className="text-sm text-primary hover:underline">
          Déjà un compte ? Connectez-vous
        </Link>
      </div>
    </>
  )
}

export default SignUpPage
