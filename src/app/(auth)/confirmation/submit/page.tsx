import ConfirmationSubmit from '@/components/auth/confirmation/ConfirmationSubmit'

type Props = {
  searchParams: {
    confirmation?: string
  }
}

export default async function SubmitPage({ searchParams }: Props) {
  return <ConfirmationSubmit confirmationToken={searchParams?.confirmation} />
}
