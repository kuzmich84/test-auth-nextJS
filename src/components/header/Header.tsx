import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react'
import SignInButton from './SignInButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import SignOutButton from './SignOutButton'
import Link from 'next/link'
import SignUpButton from './SignUpButton'

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <Link href="/">Logo</Link>
        </p>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex"></NavbarItem>
        <NavbarItem>
          {session ? (
            <div className="flex items-center justify-around">
              <div className="text-sky-700 mr-5">
                <Link
                  href="/account"
                  className="underline underline-offset-4 font-bold"
                >
                  {session.user?.name}
                </Link>
              </div>
              <SignOutButton />
            </div>
          ) : (
            <div className="flex gap-x-4">
              <SignUpButton />
              <SignInButton />
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
