import { Auth } from '@/domain/auth/entities/auth'
import { Role } from '@/domain/auth/entities/role'

export class AuthDTO {
  constructor (
    public readonly id: string,
    public readonly access_token: string,
    public readonly role: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  toDomain (): Auth {
    return new Auth(
      this.id,
      this.access_token,
      Role[this.role as keyof typeof Role],
      this.email
    )
  }
}
