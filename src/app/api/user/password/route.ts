import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import env from '@/utils/config'
import { sendApiResponse } from '@/utils/api-response'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user)
    return sendApiResponse({
      success: !!user,
      error: 'Vous semblez ne pas être connecté.',
    })

  const { oldPassword, newPassword, newPasswordConfirmation } = await req.json()

  const missinfFields = ![
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  ].every(Boolean)

  if (missinfFields) {
    return sendApiResponse({
      success: !missinfFields,
      error: 'Certains champs ne sont pas remplis.',
    })
  }

  const passwordMatch = newPassword === newPasswordConfirmation
  if (!passwordMatch) {
    return sendApiResponse({
      success: passwordMatch,
      error: 'Erreur de confirmation du nouveau mot de passe.',
    })
  }

  try {
    const request = await fetch(`${env.API_URL}/user/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.access_token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    })

    if (request.ok) {
      return sendApiResponse({
        success: request.ok,
        data: { message: 'Votre mot de passe a bien été modifié.' },
      })
    } else {
      return sendApiResponse({ success: request.ok, error: request.statusText })
    }
  } catch (err) {
    return sendApiResponse({
      success: false,
      error: "'Problème de liaison avec le serveur d'authentification.",
    })
  }
}
