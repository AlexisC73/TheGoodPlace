import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '@/domain/auth/entities/signUpClientPayload'
import { AuthRepository } from '@/domain/auth/repositories/auth'
import { AuthDTO } from '../dtos/auth'
import { Role } from '@/domain/auth/entities/role'

export class InMemoryAuthRepository implements AuthRepository {
  auths: AuthDTO[] = []

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

    this._save(auth)
    return Promise.resolve(auth.toDomain())
  }

  _save (auth: AuthDTO) {
    const foundIndex = this.auths.findIndex(auth => auth.id === auth.id)
    if (foundIndex !== -1) {
      this.auths[foundIndex] = auth
    } else {
      this.auths.push(auth)
    }
  }
}
