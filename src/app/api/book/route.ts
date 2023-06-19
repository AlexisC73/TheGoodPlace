import { sendApiResponse } from '@/utils/api-response'
import env from '@/utils/config'

export async function GET() {
  try {
    console.log('ici')
    const request = await fetch(`${env.API_URL}/book`, {
      next: { revalidate: 0 },
    })
    const response = await request.json()
    if (request.ok) {
      console.log(response)
      return sendApiResponse({
        success: true,
        data: response,
      })
    } else {
      return sendApiResponse({
        success: false,
        error: response.error,
      })
    }
  } catch (err) {
    return sendApiResponse({
      success: false,
      error: 'Il y a un problème de liaison avec le server.',
    })
  }
}
