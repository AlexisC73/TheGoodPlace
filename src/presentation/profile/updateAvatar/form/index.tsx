import UpdateAvatarContext from '@/application/profile/contexts/updateAvatar'
import UpdateAvatarElement from './updateAvatarElement'

export default function UpdateAvatarForm () {
  return (
    <UpdateAvatarContext>
      <UpdateAvatarElement />
    </UpdateAvatarContext>
  )
}
