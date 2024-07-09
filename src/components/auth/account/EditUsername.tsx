'use client'

import { useState } from 'react'

type Props = {
  firstName: string
}

export default function EditfirstName({ firstName }: Props) {
  const [edit, setEdit] = useState(false)
  return (
    <div className="mb-2">
      <div className="block italic">Firstname: </div>
      <div>{firstName}</div>
    </div>
  )
}
