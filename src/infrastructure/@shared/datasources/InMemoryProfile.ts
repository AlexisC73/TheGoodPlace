import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { ProfileDTO } from '../dtos/profileDTO'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'

export type LocalProfileDataSource = {
  createProfile(payload: SignUpClientPayload): void
  verifyAccount(payload: SignInPayload): string
  updatePassword(payload: UpdatePasswordPayload): void
}

export class InMemoryProfileDataSource implements LocalProfileDataSource {
  profiles: ProfileDTO[] = []

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
    const foundProfile = this.profiles.find(p => p.email === payload.email)
    if (!foundProfile) {
      throw new Error('Account not found')
    }
    if (foundProfile.password !== payload.password) {
      throw new Error('Password not match')
    }
    return foundProfile.id
  }

  updatePassword (payload: UpdatePasswordPayload): void {
    const foundProfile = this.profiles.find(p => p.id === payload.userId)
    if (!foundProfile) {
      throw new Error('Account not found')
    }
    if (foundProfile.password !== payload.oldPassword) {
      throw new Error('Old password not match')
    }
    const newProfile = foundProfile.copyWith({ password: payload.newPassword })
    this._save(newProfile)
  }

  private _save (profile: ProfileDTO): void {
    const findIndex = this.profiles.findIndex(p => p.id === profile.id)
    if (findIndex !== -1) {
      this.profiles[findIndex] = profile
      return
    }
    this.profiles.push(profile)
  }

  // FOR TESTS

  findById (id: string) {
    return this.profiles.find(p => p.id === id)
  }

  givenProfiles (profiles: ProfileDTO[]) {
    this.profiles = profiles
  }
}
