import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { Profile } from '@/domain/profile/entities/profile'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'

export interface LocalProfileDataSource {
  updateProfile(payload: UpdateProfilePayload): void
  saveProfileInCache(profile: Profile): void
}

export class CacheProfileDataSource implements LocalProfileDataSource {
  updateProfile (payload: UpdateProfilePayload): void {
    const profile = this.getProfile(payload.userId)
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

  getProfile (id: string): Profile | undefined {
    const profileJSON = localStorage.getItem('profile')
    if (!profileJSON) {
      return
    }
    const profileData: Profile['data'] = JSON.parse(profileJSON)
    return Profile.fromData(profileData)
  }

  saveProfile (profileToSave: Profile) {
    const profileData = profileToSave.data
    localStorage.setItem('profiles', JSON.stringify(profileData))
  }
}
