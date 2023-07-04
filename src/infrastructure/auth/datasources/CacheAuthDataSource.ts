import { Auth } from '@/domain/auth/entities/auth'

export interface LocalAuthDataSource {
  saveAuthInCache(auth: Auth): void
}

export class CacheAuthDataSource implements LocalAuthDataSource {
  saveAuthInCache (auth: Auth): void {
    this.saveAuth(auth)
  }

  saveAuth (auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth.data))
  }
}
