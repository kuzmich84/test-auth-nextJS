'use client'
import { Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import PendingSubmitButton from '../signup/PendingSubmitButton'
import { useFormState } from 'react-dom'
import resetPasswordAction from '@/actions/resetPasswordAction'
import Link from 'next/link'

type resetPasswordProps = {
  code: string | undefined
}
type InputErrorsT = {
  password?: string[]
  passwordConfirmation?: string[]
}
export type ResetPasswordFormStateT = {
  error: boolean
  message?: string
  inputErrors?: InputErrorsT
  code?: string
}

export default function ResetPassword({ code }: resetPasswordProps) {
  const initialState: ResetPasswordFormStateT = {
    error: false,
    code: code || '',
  }

  const [state, formAction] = useFormState<ResetPasswordFormStateT, FormData>(
    resetPasswordAction,
    initialState
  )

  if (!code) return <p>Error, please use the link we mailed you.</p>
  if (!state.error && 'message' in state && state.message === 'Success') {
    return (
      <div className="bg-zinc-100 rounded-sm px-4 py-8 mb-8">
        <h2 className="font-bold text-lg mb-4">Password was reset</h2>
        <p>
          Your password was reset. You can now{' '}
          <Link href="/signin" className="underline">
            sign in
          </Link>{' '}
          with your new password.
        </p>
      </div>
    )
  }

  return (
    <Card className="max-w-[500px] p-5 mt-10">
      <CardHeader className="flex-col justify-center text-2xl">
        <h1 className="text-3xl mb-5">Восстановление пароля</h1>
        <p className="text-sm">Придумайте новый надежный пароль</p>
      </CardHeader>
      <CardBody>
        <form action={formAction}>
          <Input
            type="text"
            label="Новый пароль"
            name="password"
            variant="bordered"
            isInvalid={state.error ? true : false}
            errorMessage={
              state.error && state?.inputErrors?.password
                ? state?.inputErrors?.password[0]
                : ''
            }
            size="lg"
            labelPlacement="outside"
            isRequired={true}
          />
          <Input
            type="text"
            label="Повторите новый пароль"
            name="passwordConfirmation"
            variant="bordered"
            isInvalid={state.error ? true : false}
            errorMessage={
              state.error && state?.inputErrors?.passwordConfirmation
                ? state?.inputErrors?.passwordConfirmation[0]
                : ''
            }
            size="lg"
            labelPlacement="outside"
            isRequired={true}
          />
          <PendingSubmitButton title="Send" />
          {state.error && state.message ? (
            <div className="text-red-700 mt-5" aria-live="polite">
              {state.message}
            </div>
          ) : null}
        </form>
      </CardBody>
    </Card>
  )
}
