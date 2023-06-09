export const fetchAvatarUrl = async () => {
  const request = await fetch('/api/user/avatar')
  const response = await request.json()
  return response.data.avatarUrl
}
