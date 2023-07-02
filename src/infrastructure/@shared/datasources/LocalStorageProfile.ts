import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { ProfileDTO } from '../dtos/profileDTO'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { injectable } from 'inversify'

export interface LocalProfileDataSource {
  createProfile(payload: SignUpClientPayload): void
  verifyAccount(payload: SignInPayload): string
  updatePassword(payload: UpdatePasswordPayload): void
}

@injectable()
export class LocalStorageProfile implements LocalProfileDataSource {
  createProfile (payload: SignUpClientPayload): void {
    const profile = new ProfileDTO(
      payload.id,
      payload.email,
      '',
      '',
      'default-avatar.png',
      payload.password
    )
    this._save(profile)
  }

  verifyAccount (payload: SignInPayload): string {
    const profiles = this._getProfiles()
    const foundProfile = profiles.find(p => p.email === payload.email)
    if (!foundProfile) {
      throw new Error('Account not found')
    }
    if (foundProfile.password !== payload.password) {
      throw new Error('Password not match')
    }
    return foundProfile.id
  }

  updatePassword (payload: UpdatePasswordPayload): void {
    const profiles = this._getProfiles()
    const foundProfile = profiles.find(p => p.id === payload.userId)
    if (!foundProfile) {
      throw new Error('Account not found')
    }
    if (foundProfile.password !== payload.oldPassword) {
      throw new Error('Old password not match')
    }
    const newProfile = foundProfile.copyWith({ password: payload.newPassword })
    this._save(newProfile)
  }

  private _saveProfiles (profiles: ProfileDTO[]) {
    localStorage.setItem('profiles', JSON.stringify(profiles.map(p => p.data)))
  }

  private _getProfiles (): ProfileDTO[] {
    const profiles = localStorage.getItem('profiles')
    if (!profiles) {
      return []
    }
    const profilesData = JSON.parse(profiles) as ProfileDTO['data'][]
    return profilesData.map(
      p =>
        new ProfileDTO(
          p.id,
          p.email,
          p.lastname,
          p.firstname,
          p.avatarUrl,
          p.password
        )
    )
  }

  private _save (profile: ProfileDTO): void {
    const profiles = this._getProfiles()
    const findIndex = profiles.findIndex(p => p.id === profile.id)
    console.log(findIndex)
    if (findIndex !== -1) {
      profiles[findIndex] = profile
    } else {
      profiles.push(profile)
    }
    this._saveProfiles(profiles)
  }

  // FOR TESTS

  findById (id: string) {
    const profiles = this._getProfiles()
    return profiles.find(p => p.id === id)
  }

  givenProfiles (profiles: ProfileDTO[]) {
    this._saveProfiles(profiles)
  }
}
