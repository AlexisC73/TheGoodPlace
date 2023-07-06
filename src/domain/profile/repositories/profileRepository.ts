import { UpdateAvatarPayload } from '../entities/payload/updateAvatarPayload'
import { UpdateProfilePayload } from '../entities/payload/updateProfilePayload'
import { Profile } from '../entities/profile'

export interface ProfileRepository {
  update: (payload: UpdateProfilePayload) => Promise<void>
  updateAvatar: (payload: UpdateAvatarPayload) => Promise<string>
  getProfile: (id: string) => Promise<Profile>
}
