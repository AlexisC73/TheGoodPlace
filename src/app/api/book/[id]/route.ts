import { sendApiResponse } from '@/utils/api-response'
import env from '@/utils/config'
import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const request = await fetch(`${env.API_URL}/book/${params.id}`)
  const result = await request.json()
  if (request.ok) {
    return sendApiResponse({
      success: true,
      data: result,
    })
  } else {
    return sendApiResponse({
      success: false,
      error: await request.json(),
    })
  }
}
