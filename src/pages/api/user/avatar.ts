import env from '@/utils/config'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (req.method === 'GET') {
    const request = await fetch(`${env.API_URL}/user/avatar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    })
    const response = await request.json()
    res.status(200).json(response)
    return
  }
  res.send(`Route ${req.method} not implemented.`)
}
