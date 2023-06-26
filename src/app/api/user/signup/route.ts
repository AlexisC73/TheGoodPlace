import { sendApiResponse } from '@/utils/api-response'
import { NextRequest } from 'next/server'
import { config } from '../../../../../config/repository'
import { SignupClientUseCase } from '../../../../../domain/auth/usecases/signup-client.usecase'

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

  const userRepository = config.userRepository
  const signupClientUseCase = new SignupClientUseCase(userRepository)

  try {
    await signupClientUseCase.handle({
      email,
      name,
      password,
      passwordConfirmation: passwordVerif,
    })
    return sendApiResponse({
      success: true,
      data: {
        message: 'ok',
      },
    })
  } catch (err) {
    console.log(err)
    return sendApiResponse({
      success: false,
      error: 'pas ok',
    })
  }
}
