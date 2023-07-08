import { UpdateAvatarPayload } from '../entities/payload/updateAvatarPayload'
import { UpdateProfilePayload } from '../entities/payload/updateProfilePayload'
import { Profile } from '../entities/profile'

export abstract class ProfileRepository {
  abstract update: (payload: UpdateProfilePayload) => Promise<void>
  abstract updateAvatar: (payload: UpdateAvatarPayload) => Promise<string>
  abstract getProfile: (id: string) => Promise<Profile>
}
