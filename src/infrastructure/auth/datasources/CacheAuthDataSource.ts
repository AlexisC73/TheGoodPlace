import { Auth } from '@/domain/auth/entities/auth'
import { Role } from '@/domain/auth/entities/role'

export interface LocalAuthDataSource {
  saveAuthInCache(auth: Auth): void
  getCachedAuth(): Auth | undefined
}

export class CacheAuthDataSource implements LocalAuthDataSource {
  saveAuthInCache (auth: Auth): void {
    this.saveAuth(auth)
  }

  getCachedAuth (): Auth | undefined {
    return this.getAuth()
  }

  saveAuth (auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth.data))
  }

  getAuth (): Auth | undefined {
    const authJSON = localStorage.getItem('auth')
    return authJSON ? Auth.fromData(JSON.parse(authJSON)) : undefined
  }

  // FOR TESTS

  cacheAuth (authInfo: { id: string; role: Role }) {
    this.saveAuth(
      Auth.fromData({
        id: authInfo.id,
        role: authInfo.role,
        access_token: JSON.stringify({ id: authInfo.id })
      })
    )
  }

  removeCachedAuth () {
    localStorage.removeItem('auth')
  }
}
