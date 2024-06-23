'use client'

import useCallbackUrl from '@/hooks/useCallBackUrl'
import Link from 'next/link'

export default function SignUpButton() {
  const callbackUrl = useCallbackUrl()
  return (
    <Link
      className="flex items-center bg-primary py-2 px-4 text-white rounded-xl text-[14px]"
      href={`/signup`}
    >
      Sign Up
    </Link>
  )
}
