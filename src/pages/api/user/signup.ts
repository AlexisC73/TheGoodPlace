import env from '@/utils/config'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password, passwordVerif } = req.body
    if (!password || !passwordVerif || !username || !email) {
      res.status(400).json({ message: 'Missing fields' })
      return
    }
    if (password !== passwordVerif) {
      res.status(400).json({ message: 'Passwords do not match' })
      return
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
        res.status(200).json({ message: 'User created' })
      } else {
        const signupRes = await signupRequest.json()
        res.status(signupRes.statusCode).json(signupRes)
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(405).json({ message: 'We only support POST' })
  }
}
