'use client'

import { Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import React from 'react'
import PendingSubmitButton from '../signup/PendingSubmitButton'
import { useFormState } from 'react-dom'
import confirmationNewRequestAction from '@/actions/confirmationNewRequestAction'

type InputErrorsT = {
  email?: string[]
}

type InitialFormStateT = {
  error: false
}

type ErrorFormStateT = {
  error: true
  message: string
  inputErrors?: InputErrorsT
}

export type ConfirmationNewRequestFormStateT =
  | InitialFormStateT
  | ErrorFormStateT

const initialState: InitialFormStateT = {
  error: false,
}

export default function ConfirmationNewReques() {
  const [state, formAction] = useFormState<
    ConfirmationNewRequestFormStateT,
    FormData
  >(confirmationNewRequestAction, initialState)

  return (
    <Card className="max-w-[500px] p-5 mt-10">
      <CardHeader className="flex-col justify-center text-2xl">
        <h1 className="text-3xl mb-5">Подтвердите свой email</h1>
        <p className="text-sm">
          Запрос на новый запрос подтверждения вашего email.
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
