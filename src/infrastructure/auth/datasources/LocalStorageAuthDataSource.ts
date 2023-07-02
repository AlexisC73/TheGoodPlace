import { Auth } from '@/domain/auth/entities/auth'
import { AuthDTO } from '../dtos/auth'
import { Role } from '@/domain/auth/entities/role'
import { injectable } from 'inversify'

export interface LocalAuthDataSource {
  createAuthClient(id: string): Promise<Auth>
  signIn(id: string): Promise<Auth>
}

@injectable()
export class LocalStorageAuth implements LocalAuthDataSource {
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
    const auths = this._getAuths()
    const auth = auths.find(a => a.id === id)
    if (!auth) throw new Error("Cannot sign in, auth won't exist")
    return Promise.resolve(auth.toDomain())
  }

  private _save (auth: AuthDTO) {
    const auths = this._getAuths()
    const findIndex = auths.findIndex(a => a.id === auth.id)
    if (findIndex !== -1) {
      auths[findIndex] = auth
    } else {
      auths.push(auth)
    }
    this._saveAuths(auths)
  }

  private _saveAuths (auths: AuthDTO[]) {
    localStorage.setItem('auths', JSON.stringify(auths.map(a => a.data)))
  }

  private _getAuths (): AuthDTO[] {
    const localAuths = localStorage.getItem('auths')
    if (!localAuths) return []
    const authData = JSON.parse(localAuths) as AuthDTO['data'][]
    return authData.map(a => new AuthDTO(a.id, a.access_token, a.role))
  }

  // FOR TESTS

  givenUsers (users: { id: string; role: Role }[]) {
    this._saveAuths(
      users.map(
        u => new AuthDTO(u.id, JSON.stringify({ id: u.id }), u.role.toString())
      )
    )
  }

  findById (id: string): AuthDTO | undefined {
    const auths = this._getAuths()
    return auths.find(a => a.id === id)
  }
}
