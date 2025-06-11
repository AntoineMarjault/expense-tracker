import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router'
import { api } from '@/lib/api-client.ts'

interface LoginFormData {
  email: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>()

  async function onSubmit(data: LoginFormData) {
    setError('')

    const response = await api.login(data.email, data.password)

    if (response?.error) {
      setError('Identifiants invalides')
      return
    }

    navigate('/dashboard/transactions')
  }

  const handleDemoLogin = async () => {
    setError('')

    const response = await api.login('demo@expense-tracker.com', 'demoPassword')

    if (response?.error) {
      setError('Le compte de démonstration est indisponible')
      return
    }

    navigate('/dashboard/transactions')
  }

  return (
    <>
      <h2 className="mb-6 text-center text-xl font-semibold">Connexion</h2>
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
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
      <div className="mt-4 flex flex-col items-center gap-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleDemoLogin}
        >
          Essayer la démo
        </Button>
        <Link
          to="/auth/signup"
          className="text-sm text-primary hover:underline"
        >
          Pas encore de compte ? Inscrivez-vous
        </Link>
      </div>
    </>
  )
}

export default LoginPage
