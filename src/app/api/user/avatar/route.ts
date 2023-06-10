import env from '@/utils/config'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { sendApiResponse } from '@/utils/api-response'

export async function GET() {
  const session = await getServerSession(authOptions)
  const request = await fetch(`${env.API_URL}/user/avatar`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  })

  if (request.ok) {
    const result = await request.json()
    console.log(result)
    return sendApiResponse({
      success: request.ok,
      data: { ...result.data, message: 'Avatar récupéré avec succès.' },
    })
  } else {
    return sendApiResponse({
      success: request.ok,
      error: "Erreur lors de la récupération de l'avatar.",
    })
  }
}
