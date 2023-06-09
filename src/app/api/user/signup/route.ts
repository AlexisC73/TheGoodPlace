import env from '@/utils/config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { username, email, password, passwordVerif } = await req.json()

  if (!password || !passwordVerif || !username || !email) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
  }
  if (password !== passwordVerif) {
    return NextResponse.json(
      { message: 'Passwords do not match' },
      { status: 400 }
    )
  }
  try {
    const signupRequest = await fetch(`${env.API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password,
        role: 'CLIENT',
      }),
    })
    if (signupRequest.ok) {
      return NextResponse.json({ message: 'User created' }, { status: 200 })
    } else {
      const signupRes = await signupRequest.json()
      return NextResponse.json(signupRes, { status: signupRequest.status })
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
