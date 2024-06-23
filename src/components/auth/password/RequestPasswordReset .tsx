'use client'

import { Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import React from 'react'
import PendingSubmitButton from '../signup/PendingSubmitButton'
import { useFormState } from 'react-dom'
import requestPasswordResetAction from '@/actions/requestPasswordResetAction'

type InputErrorsT = {
  email?: string[]
}
type NoErrorFormStateT = {
  error: false
  message?: string
}
type ErrorFormStateT = {
  error: true
  message: string
  inputErrors?: InputErrorsT
}

export type RequestPasswordResetFormStateT = NoErrorFormStateT | ErrorFormStateT

const initialState: NoErrorFormStateT = {
  error: false,
}

export default function RequestPasswordReset() {
  const [state, formAction] = useFormState<
    RequestPasswordResetFormStateT,
    FormData
  >(requestPasswordResetAction, initialState)

  if (!state.error && state.message === 'Success') {
    return (
      <div className="bg-zinc-100 rounded-sm px-4 py-8 mb-8">
        <h2 className="font-bold text-lg mb-4">Check your email</h2>
        <p>
          We sent you an email with a link. Open this link to reset your
          password. Careful, expires ...
        </p>
      </div>
    )
  }

  return (
    <Card className="max-w-[500px] p-5 mt-10">
      <CardHeader className="flex-col justify-center text-2xl">
        <h1 className="text-3xl mb-5">Забыли пароль?</h1>
        <p className="text-sm">
          На ваш email придет письмо с ссылкой для восстановления пароля.
        </p>
      </CardHeader>
      <CardBody>
        <form action={formAction}>
          <Input
            type="email"
            label="Email"
            name="email"
            variant="bordered"
            isInvalid={state.error ? true : false}
            errorMessage={
              state.error && state?.inputErrors?.email
                ? state?.inputErrors?.email[0]
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
