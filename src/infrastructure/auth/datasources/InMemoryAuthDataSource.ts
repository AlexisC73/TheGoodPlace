import { Auth } from '@/domain/auth/entities/auth'
import { AuthDTO } from '../dtos/auth'
import { Role } from '@/domain/auth/entities/role'
import { injectable } from 'inversify'
import 'reflect-metadata'

export interface LocalAuthDataSource {
  createAuthClient(id: string): Promise<Auth>
  signIn(id: string): Promise<Auth>
}

@injectable()
export class InMemoryAuthDataSource implements LocalAuthDataSource {
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

  givenUsers (users: { id: string; role: Role }[]) {
    this.auths = users.map(
      u => new AuthDTO(u.id, JSON.stringify({ id: u.id }), u.role.toString())
    )
  }

  findById (id: string): AuthDTO | undefined {
    return this.auths.find(a => a.id === id)
  }
}
