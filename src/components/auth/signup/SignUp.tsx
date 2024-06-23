import { Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'
import SignUpFrom from './SignUpForm'
import Link from 'next/link'

export default function SignUp() {
  return (
    <Card className="max-w-[400px] p-5 mt-10">
      <CardHeader className="flex-col justify-center text-2xl">
        <h1 className="text-3xl mb-5">Регистрация</h1>
        <p className="text-sm">
          Sign up for a new account or{' '}
          <Link href="/signin" className="underline text-blue-600 font-bold">
            sign in
          </Link>{' '}
          when you already have an account
        </p>
      </CardHeader>
      <CardBody>
        <SignUpFrom />
      </CardBody>
    </Card>
  )
}
