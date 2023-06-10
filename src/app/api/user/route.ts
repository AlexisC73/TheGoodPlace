import env from '@/utils/config'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await req.json()
  const request = await fetch(`${env.API_URL}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.access_token}`,
    },
    body: JSON.stringify(body),
  })

  return NextResponse.json({ user: body }, { status: 200 })
}
