import UpdateProfileContext from '@/application/profile/contexts/updateProfile'
import UpdateProfileFormElement from './UpdateProfileForm'

export default function UpdateProfileForm () {
  return (
    <UpdateProfileContext>
      <UpdateProfileFormElement />
    </UpdateProfileContext>
  )
}
