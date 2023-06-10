import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import env from '@/utils/config'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user)
    return NextResponse.json({ error: 'not authenticated' }, { status: 401 })

  const { oldPassword, newPassword, newPasswordConfirmation } = await req.json()
  console.log({ oldPassword, newPassword, newPasswordConfirmation })
  if (!oldPassword || !newPassword || !newPasswordConfirmation) {
    return NextResponse.json(
      { success: false, error: 'missing fields' },
      { status: 400 }
    )
  }
  if (newPassword !== newPasswordConfirmation) {
    return NextResponse.json(
      { success: false, error: 'passwords do not match' },
      { status: 400 }
    )
  }
  const request = await fetch(`${env.API_URL}/user/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.access_token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  })

  if (request.status !== 200) {
    return NextResponse.json(
      { success: false, error: request.statusText },
      { status: request.status }
    )
  }
  return NextResponse.json(
    { success: true, message: request.statusText },
    { status: 200 }
  )
}
