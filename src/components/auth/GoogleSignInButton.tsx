'use client'

import { Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { useSearchParams } from 'next/navigation'

export default function GoogleSignInButton() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  return (
    <Button
      color="primary"
      startContent={<FcGoogle />}
      onClick={() => signIn('google', { callbackUrl })}
    >
      Sign in with Google
    </Button>
  )
}
