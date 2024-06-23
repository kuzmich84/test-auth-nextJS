import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { FcGoogle } from 'react-icons/fc'
import React from 'react'
import GoogleSignInButton from './GoogleSignInButton'
import { getServerSession } from 'next-auth'
import GoogleSignInError from './GoogleSignInError'
import SignInForm from './SignInForm'

export default async function SignIn() {
  const session = await getServerSession()
  return (
    <Card className="max-w-[400px] p-5 mt-10">
      <CardHeader className="justify-center text-2xl">Авторизация</CardHeader>
      <CardBody>
        {session ? (
          <p className="text-center">You are already signed in.</p>
        ) : (
          <>
            <SignInForm />
            <div className='text-center relative my-8 after:content-[""] after:block after:w-full after:h-[1px] after:bg-zinc-300 after:relative after:-top-3 after:z-0'>
              <span className="bg-white px-4 relative z-10 text-zinc-400">
                or
              </span>
            </div>
            <GoogleSignInButton />
            <GoogleSignInError />
          </>
        )}
      </CardBody>
    </Card>
  )
}
