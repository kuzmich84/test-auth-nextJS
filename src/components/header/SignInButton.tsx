'use client'

import useCallbackUrl from '@/hooks/useCallBackUrl'
import { Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function SignInButton() {
  const callbackUrl = useCallbackUrl()
  return (
    <Link
      className="flex items-center bg-primary py-2 px-4 text-white rounded-xl text-[14px]"
      href={`/signin?callbackUrl=${callbackUrl}`}
    >
      Sign In
    </Link>
  )
}
