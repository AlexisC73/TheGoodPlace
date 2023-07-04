import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { Profile } from '@/domain/profile/entities/profile'

export interface LocalProfileDataSource {
  updateProfile(payload: UpdateProfilePayload): void
  saveProfileInCache(profile: Profile): void
}

export class CacheProfileDataSource implements LocalProfileDataSource {
  updateProfile (payload: UpdateProfilePayload): void {
    const profile = this.getProfile()
    if (!profile) {
      return
    }
    const newProfile = profile.copyWith({
      email: payload.updateData.email,
      lastname: payload.updateData.lastname,
      firstname: payload.updateData.firstname
    })
    this.saveProfile(newProfile)
    return
  }

  saveProfileInCache (profile: Profile): void {
    this.saveProfile(profile)
  }

  getProfile (): Profile | undefined {
    const profileJSON = localStorage.getItem('profile')
    if (!profileJSON) {
      return
    }
    const profileData: Profile['data'] = JSON.parse(profileJSON)
    return Profile.fromData(profileData)
  }

  saveProfile (profileToSave: Profile) {
    localStorage.setItem('profile', JSON.stringify(profileToSave.data))
  }
}
