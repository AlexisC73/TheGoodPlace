export const getAvatarUrl = async () => {
  const request = await fetch('/api/user/avatar')
  const response = await request.json()
  return response.data.avatarUrl
}
