import { sendApiResponse } from '@/utils/api-response'
import env from '@/utils/config'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, password, passwordVerif } = await req.json()

  if (!password || !passwordVerif || !name || !email) {
    return sendApiResponse({
      success: false,
      error: 'Veuillez remplir tous les champs.',
    })
  }
  if (password !== passwordVerif) {
    return sendApiResponse({
      success: false,
      error: 'Les mots de passe ne correspondent pas.',
    })
  }
  try {
    const signupRequest = await fetch(`${env.API_URL}/user/signup/client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: 'CLIENT',
      }),
    })

    if (signupRequest.ok) {
      return sendApiResponse({
        success: true,
        data: {
          message: 'Utilisateur créé avec succès.',
        },
      })
    } else {
      return sendApiResponse({
        success: false,
        error:
          "Une erreur s'est produite ou alors l'email utilisé existe déjà.",
      })
    }
  } catch (err) {
    return sendApiResponse({
      success: false,
      error: "Problème de liaison avec le serveur d'authentification.",
    })
  }
}
