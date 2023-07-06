import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { AuthDTO } from '../dtos/auth'
import { Role } from '@/domain/auth/entities/role'
import { InMemoryRemoteProfileDataSource } from '@/infrastructure/profile/datasources/InMemoryRemoteDataSource'
import { Auth } from '@/domain/auth/entities/auth'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'

export interface RemoteDataSource {
  signUp(payload: SignUpClientPayload): Promise<Auth>
  createProfileForAuth(payload: SignUpClientPayload): Promise<ProfileDTO>
  signInAccount(payload: SignInPayload): Promise<Auth>
}

export class InMemoryRemoteAuthDataSource implements RemoteDataSource {
  remoteProfileDataSource = new InMemoryRemoteProfileDataSource()

  async signUp (payload: SignUpClientPayload): Promise<Auth> {
    const auths = this.getAuths()
    const isExist = auths.some(p => p.id === payload.id)
    if (isExist) {
      throw new Error('Something went wrong, please try again.')
    }
    const isEmailExis = await this.remoteProfileDataSource.isEmailExist(
      payload.email
    )
    if (isEmailExis) {
      throw new Error('Email already exist')
    }
    const newAuth = AuthDTO.fromData({
      id: payload.id,
      access_token: JSON.stringify({ id: payload.id }),
      role: Role.CLIENT
    })
    this.saveAuth(newAuth)
    await this.createProfileForAuth(payload)

    return newAuth.toDomain()
  }

  async signInAccount (payload: SignInPayload): Promise<Auth> {
    const profileDto =
      await this.remoteProfileDataSource.signInProfileWithEmail(payload)
    if (!profileDto) {
      throw new Error("Profile doesn't exist")
    }
    const auth = Auth.fromData({
      id: profileDto.id,
      access_token: JSON.stringify({ id: profileDto.id }),
      role: Role.CLIENT
    })
    return auth
  }

  getAuths (): AuthDTO[] {
    const authsJSON = localStorage.getItem('fake_auths')
    const authsData: AuthDTO['data'][] = authsJSON ? JSON.parse(authsJSON) : []
    return authsData.map(p =>
      AuthDTO.fromData({
        id: p.id,
        access_token: p.access_token,
        role: Role[p.role as keyof typeof Role]
      })
    )
  }

  async createProfileForAuth (payload: SignUpClientPayload) {
    return await this.remoteProfileDataSource.createProfile(payload)
  }

  saveAuths (authsToSave: AuthDTO[]) {
    const authsData = authsToSave.map(p => p.data)
    localStorage.setItem('fake_auths', JSON.stringify(authsData))
  }

  saveAuth (auth: AuthDTO) {
    const auths = this.getAuths()
    const authIndex = auths.findIndex(p => p.id === auth.id)
    if (authIndex === -1) {
      auths.push(auth)
    } else {
      auths[authIndex] = auth
    }
    this.saveAuths(auths)
  }

  // FOR TESTS
  givenAuths (auths: { id: string; role: Role }[]) {
    const authsToSave = auths.map(p =>
      AuthDTO.fromData({
        id: p.id,
        access_token: JSON.stringify({ id: p.id }),
        role: p.role
      })
    )
    this.saveAuths(authsToSave)
  }
}
