'use client'

import { Button, Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

type FormErrorsT = {
  identifier?: undefined | string[]
  password?: undefined | string[]
  strapiError?: string
}

const formSchema = z.object({
  identifier: z.string().min(2).max(30),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(30),
})

const initialState = {
  identifier: '',
  password: '',
}

export default function SignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const router = useRouter()
  const [data, setData] = useState(initialState)
  const [error, setError] = useState<FormErrorsT>({})
  const [loading, setLoading] = useState<boolean>(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  function translateStrapiError(error: string): string | JSX.Element {
    switch (error) {
      case 'Your account email is not confirmed':
        return (
          <p>
            Ваш аккаунт не подтвержден по email. Пожалуйста подтвердите или
            запросите заново по ссылке{' '}
            <Link
              className="underline underline-offset-4"
              href="/confirmation/newrequest"
            >
              запрос подтверждения по email.
            </Link>
          </p>
        )

      case 'Invalid identifier or password':
        return 'Неверный email или пароль. Попробуйте еще раз. '
      default:
        return error
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const validatedFields = formSchema.safeParse(data)

    if (!validatedFields.success) {
      setError(validatedFields.error.formErrors.fieldErrors)
      setLoading(false)
    } else {
      const signInResponse = await signIn('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      })

      setLoading(false)

      if (signInResponse && !signInResponse.ok) {
        setLoading(false)
        setError({
          strapiError: signInResponse.error
            ? signInResponse.error
            : 'Something went wrong.',
        })
      } else {
        setLoading(false)
        console.log('Enter success')
        router.push(callbackUrl)
        router.refresh()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        label="Email"
        name="identifier"
        variant="bordered"
        isInvalid={error.identifier ? true : false}
        errorMessage={error?.identifier ? error.identifier[0] : ''}
        size="lg"
        labelPlacement="outside"
        onChange={handleChange}
        className="mb-10"
      />

      <Input
        type="password"
        label="Password"
        variant="bordered"
        name="password"
        isInvalid={error.password ? true : false}
        errorMessage={error?.password ? error.password[0] : ''}
        size="lg"
        labelPlacement="outside"
        autoComplete=""
        onChange={handleChange}
      />

      <div className="mt-4">
        <Link
          className="underline underline-offset-4 text-secondary hover:text-green-700"
          href="/password/request-reset"
        >
          Забыли пароль?
        </Link>
      </div>
      <Button
        className="w-full mt-6"
        type="submit"
        color="secondary"
        size="lg"
        isLoading={loading}
      >
        Login
      </Button>
      {error.password || error.identifier ? (
        <div className="text-red-700" aria-live="polite">
          Something went wrong. Please check your data.
        </div>
      ) : null}

      {error.strapiError ? (
        <div className="text-red-700 mt-4" aria-live="polite">
          {translateStrapiError(error.strapiError)}
        </div>
      ) : null}
    </form>
  )
}
