import { NextResponse } from 'next/server'

export const sendApiResponse = (response: ApiResponse) => {
  if (!response.success) {
    return NextResponse.json({
      success: false,
      error: response.error,
    })
  }
  return NextResponse.json({
    success: true,
    data: response.data,
  })
}

export type ApiResponse =
  | { success: true; data: { message: string; [key: string]: any } }
  | { success: false; error: string }
