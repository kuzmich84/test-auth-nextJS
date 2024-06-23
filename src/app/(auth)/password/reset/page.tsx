import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import ResetPassword from '@/components/auth/password/ResetPassword'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

type passwordResetProps = {
  searchParams: {
    code?: string
  }
}

export default async function PasswordResetPage({
  searchParams,
}: passwordResetProps) {
  const session = await getServerSession(authOptions)
  if (session) redirect('/account')
  return <ResetPassword code={searchParams.code} />
}
