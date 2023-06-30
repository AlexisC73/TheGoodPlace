import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { AuthDTO } from '../dtos/auth'
import { Role } from '@/domain/auth/entities/role'
import { Auth } from '@/domain/auth/entities/auth'

export class InMemoryAuthRepository implements AuthRepository {
  auths: AuthDTO[] = []

  async createAuthClient (id: string): Promise<Auth> {
    const createdAuth = new AuthDTO(
      id,
      JSON.stringify({ id }),
      Role.CLIENT.toString()
    )
    this._save(createdAuth)
    return Promise.resolve(createdAuth.toDomain())
  }

  async signIn (id: string): Promise<Auth> {
    const auth = this.auths.find(a => a.id === id)
    if (!auth) throw new Error("Cannot sign in, auth won't exist")
    return Promise.resolve(auth.toDomain())
  }

  private _save (auth: AuthDTO) {
    const findIndex = this.auths.findIndex(a => a.id === auth.id)
    if (findIndex !== -1) {
      this.auths[findIndex] = auth
      return
    }
    this.auths.push(auth)
  }

  // FOR TESTS

  findById (id: string): AuthDTO | undefined {
    return this.auths.find(a => a.id === id)
  }

  givenUsers (users: { id: string; role: Role }[]) {
    this.auths = users.map(
      u => new AuthDTO(u.id, JSON.stringify({ id: u.id }), u.role.toString())
    )
  }
}
