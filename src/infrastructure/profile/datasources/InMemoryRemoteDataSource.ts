import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'

export interface RemoteProfileDataSource {
  updateProfile(payload: UpdateProfilePayload): Promise<void>
  createProfile(payload: SignUpClientPayload): Promise<ProfileDTO>
  updatePassword(payload: UpdatePasswordPayload): Promise<void>
  signInProfileWithEmail(payload: SignInPayload): Promise<ProfileDTO>
}

export class InMemoryRemoteProfileDataSource
  implements RemoteProfileDataSource
{
  updateProfile (payload: UpdateProfilePayload): Promise<void> {
    const profile = this._getProfile(payload.userId)
    if (!profile) {
      throw new Error("Profile doesn't exist")
    }
    const newProfile = profile.copyWith({
      email: payload.updateData.email,
      lastname: payload.updateData.lastname,
      firstname: payload.updateData.firstname
    })
    this._saveProfile(newProfile)
    return Promise.resolve()
  }

  signInProfileWithEmail (payload: SignInPayload) {
    const profiles = this._getProfiles()
    const profile = profiles.find(p => p.email === payload.email)
    if (!profile) {
      throw new Error("Profile doesn't exist")
    }
    if (profile.password !== payload.password) {
      throw new Error('Wrong password')
    }
    return Promise.resolve(profile)
  }

  createProfile (payload: SignUpClientPayload): Promise<ProfileDTO> {
    const profiles = this._getProfiles()
    const profile = profiles.find(p => p.id === payload.id)
    if (!!profile) {
      throw new Error('Profile already exists')
    }
    const newProfile = ProfileDTO.fromData({
      id: payload.id,
      avatarUrl: 'default-avatar.png',
      email: payload.email,
      firstname: '',
      lastname: '',
      password: payload.password
    })
    this._saveProfile(newProfile)
    return Promise.resolve(newProfile)
  }

  updatePassword (payload: UpdatePasswordPayload): Promise<void> {
    const profile = this._getProfile(payload.userId)
    if (!profile) {
      throw new Error("Profile doesn't exist")
    }
    const newProfile = profile.copyWith({ password: payload.newPassword })
    this._saveProfile(newProfile)
    return Promise.resolve()
  }

  _getProfiles (): ProfileDTO[] {
    const profilesJSON = localStorage.getItem('fake_profiles')
    const profilesData: ProfileDTO['data'][] = profilesJSON
      ? JSON.parse(profilesJSON)
      : []
    return profilesData.map(p => ProfileDTO.fromData(p))
  }

  _getProfile (id: string): ProfileDTO | undefined {
    const profiles = this._getProfiles()
    return profiles.find(p => p.id === id)
  }

  _saveProfile (profileToSave: ProfileDTO) {
    const profiles = this._getProfiles()
    const profileIndex = profiles.findIndex(p => p.id === profileToSave.id)
    if (profileIndex === -1) {
      profiles.push(profileToSave)
    } else {
      profiles[profileIndex] = profileToSave
    }
    const profilesData = profiles.map(p => p.data)
    localStorage.setItem('fake_profiles', JSON.stringify(profilesData))
  }

  _setProfiles (profiles: ProfileDTO[]) {
    const profilesData = profiles.map(p => p.data)
    localStorage.setItem('fake_profiles', JSON.stringify(profilesData))
  }

  // FOR TESTS
  givenProfiles (profiles: ProfileDTO[]) {
    this._setProfiles(profiles)
  }

  findById (id: string): ProfileDTO | undefined {
    return this._getProfile(id)
  }
}
