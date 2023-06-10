import { ApiResponse } from './api-response'

export const fetchAvatarUrl = async () => {
  const request = await fetch('/api/user/avatar')
  const response: ApiResponse = await request.json()
  if (response.success) {
    return response.data.avatarUrl
  } else {
    return null
  }
}
