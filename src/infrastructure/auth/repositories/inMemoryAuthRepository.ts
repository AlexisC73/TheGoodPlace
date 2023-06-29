import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { AuthRepository } from '@/domain/auth/repositories/auth'
import { AuthDTO } from '../dtos/auth'
import { Role } from '@/domain/auth/entities/role'
import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'

export class InMemoryAuthRepository implements AuthRepository {
  auths: AuthDTO[] = [
    new AuthDTO(
      '1',
      JSON.stringify({ id: '1' }),
      Role.CLIENT.toString(),
      'test@test.fr',
      'test'
    )
  ]

  signupClient (payload: SignUpClientPayload): Promise<Auth> {
    if (this.auths.find(auth => auth.email === payload.email)) {
      throw new Error('Email already exists')
    }

    const auth = new AuthDTO(
      payload.id,
      JSON.stringify({ id: payload.id }),
      Role.CLIENT.toString(),
      payload.email,
      payload.password
    )

    this.save(auth)
    return Promise.resolve(auth.toDomain())
  }

  async signIn (payload: SignInPayload): Promise<Auth> {
    const foundUser = this.findUserByEmail(payload.email)

    if (!foundUser) {
      throw new Error('User not found')
    }

    if (foundUser.password !== payload.password) {
      throw new Error('Wrong password')
    }

    return foundUser.toDomain()
  }

  private save (auth: AuthDTO) {
    const foundIndex = this.auths.findIndex(auth => auth.id === auth.id)
    if (foundIndex !== -1) {
      this.auths[foundIndex] = auth
    } else {
      this.auths.push(auth)
    }
  }

  private findUserByEmail (email: string): AuthDTO | undefined {
    return this.auths.find(auth => auth.email === email)
  }

  private findUserById (id: string): AuthDTO | undefined {
    return this.auths.find(auth => auth.id === id)
  }

  // For tests

  setAuths (auths: AuthDTO[]) {
    this.auths = auths
  }
}
