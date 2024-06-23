'use client'

import signUpAction from '@/actions/sign-up-action'
import { Button, Input } from '@nextui-org/react'
import { useFormState } from 'react-dom'
import PendingSubmitButton from './PendingSubmitButton'

export type InputErrorsT = {
  username?: string[]
  email?: string[]
  password?: string[]
}

export type RegisterFormStateT = {
  error: boolean
  InputErrors?: InputErrorsT
  message?: string
}

type SignUpFormInitialStateT = {
  error: false // not boolean
}
type SignUpFormErrorStateT = {
  error: true // not boolean
  message: string // not optional
  inputErrors?: InputErrorsT
}
// discriminated union
export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT
// explicitly set type here
const initialState: SignUpFormInitialStateT = {
  error: false,
}

export default function SignUpForm() {
  const [state, formAction] = useFormState<SignUpFormStateT, FormData>(
    signUpAction,
    initialState
  )

  console.log(state)
  return (
    <form action={formAction}>
      <Input
        type="text"
        label="Username"
        name="username"
        variant="bordered"
        isInvalid={state.error && state?.inputErrors?.username ? true : false}
        errorMessage={
          state.error && state?.inputErrors?.username
            ? state.inputErrors.username[0]
            : ''
        }
        size="lg"
        labelPlacement="outside"
        isRequired={true}
      />

      <Input
        type="email"
        label="Email"
        name="email"
        variant="bordered"
        isInvalid={state.error && state?.inputErrors?.email ? true : false}
        errorMessage={
          state.error && state?.inputErrors?.email
            ? state.inputErrors.email[0]
            : ''
        }
        size="lg"
        labelPlacement="outside"
        isRequired={true}
      />

      <Input
        type="password"
        label="Password"
        variant="bordered"
        name="password"
        isInvalid={state.error && state?.inputErrors?.password ? true : false}
        errorMessage={
          state.error && state?.inputErrors?.password
            ? state.inputErrors.password[0]
            : ''
        }
        size="lg"
        labelPlacement="outside"
        autoComplete=""
        isRequired={true}
      />

      <PendingSubmitButton title="Register" />

      {state.error && state.message ? (
        <div className="text-red-700" aria-live="polite">
          {state.message}
        </div>
      ) : null}
    </form>
  )
}
