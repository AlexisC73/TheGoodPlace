import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { ProfileRepository } from '@/domain/@shared/repositories/profileRepository'
import { ProfileDTO } from '../dtos/profileDTO'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'

export class InMemoryProfileRepository implements ProfileRepository {
  profiles: ProfileDTO[] = []

  async createProfile (payload: SignUpClientPayload): Promise<void> {
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

  async signIn (payload: SignInPayload): Promise<string> {
    const profile = this._getProfileWithEmail(payload.email)
    if (!profile) throw new Error("Cannot sign in, email won't exist")
    if (profile.password !== payload.password)
      throw new Error("Cannot sign in, password won't match")
    return profile.id
  }

  async updatePassword (payload: UpdatePasswordPayload): Promise<void> {
    const findProfile = this.findById(payload.userId)
    if (!findProfile)
      throw new Error('Cannot update password, profile not found')
    if (findProfile.password !== payload.oldPassword)
      throw new Error('Cannot update password, old password not match')
    const newProfile = findProfile.copyWith({ password: payload.newPassword })
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

  private _getProfileWithEmail (email: string): ProfileDTO | undefined {
    return this.profiles.find(p => p.email === email)
  }

  // FOR TESTS
  findById (id: string): ProfileDTO | undefined {
    return this.profiles.find(p => p.id === id)
  }

  givenUsers (users: ProfileDTO[]) {
    this.profiles = users
  }
}
