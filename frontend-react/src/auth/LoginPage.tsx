import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'

interface LoginFormData {
  email: string
  password: string
}

const LoginPage = () => {
  // setError
  const [error] = useState('')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>()

  // data: LoginFormData
  async function onSubmit() {
    console.log('Login in...')
    /*    
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
 */
  }

  const handleDemoLogin = async () => {
    console.log('Login in demo account...')
    /*    setError('')
    const response = await signIn('credentials', {
      email: 'demo@expense-tracker.com',
      password: 'demoPassword',
      redirect: false,
    })

    if (response?.error) {
      setError('Le compte de démonstration est indisponible')
      return
    }

    router.push('/dashboard/transactions')

 */
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
          className="text-primary text-sm hover:underline"
        >
          Pas encore de compte ? Inscrivez-vous
        </Link>
      </div>
    </>
  )
}

export default LoginPage
