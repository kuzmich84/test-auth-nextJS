'use client'

import { Button } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOutButton() {
  return (
    <Button color="primary" variant="solid" onClick={() => signOut()}>
      SignOut
    </Button>
  )
}
