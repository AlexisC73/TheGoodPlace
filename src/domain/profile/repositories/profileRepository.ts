import { UpdateProfilePayload } from '../entities/payload/updateProfilePayload'

export interface ProfileRepository {
  update: (payload: UpdateProfilePayload) => Promise<void>
}
