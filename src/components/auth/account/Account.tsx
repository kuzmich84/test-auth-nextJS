import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser'
import { getServerSession } from 'next-auth'

export default async function Account() {
  const session = await getServerSession(authOptions)
  const user = await getCurrentUser(session!.strapiToken!)

  const { username, email, updatedAt, firstName, lastName } = user

  console.log(user)

  return (
    <div className="bg-zinc-100 rounded-sm px-4 py-8 mb-8">
      <h2 className="font-bold text-lg mb-4">Account</h2>

      <div className="mb-8">
        <h3 className="font-bold mb-4 text-sky-700">User Data</h3>
        <div className="mb-2">
          <div className="block italic">Username: </div>
          <div>{username}</div>
        </div>
        <div className="mb-2">
          <div className="block italic">Email: </div>
          <div>{email}</div>
          <div>(You cannot edit your email.)</div>
        </div>
        <div className="mb-2">
          Last updated: {new Date(updatedAt).toLocaleString()}
        </div>
        <div className="mb-2">
          <div className="block italic">FirstName: </div>
          <div>{firstName}</div>
        </div>
        <div className="mb-2">
          <div className="block italic">LastName: </div>
          <div>{lastName}</div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold mb-4 text-sky-700">Change password</h3>
        [change password component]
      </div>
    </div>
  )
}
