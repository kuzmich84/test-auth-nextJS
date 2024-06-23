'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom'

type PendingButtonProps = {
  title: string
}

export default function PendingSubmitButton({ title }: PendingButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button
      className="w-full mt-6"
      type="submit"
      color="secondary"
      size="lg"
      isLoading={pending}
    >
      {title}
    </Button>
  )
}
