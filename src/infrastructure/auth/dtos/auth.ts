import { Id } from '@/domain/@shared/valueObject/id'
import { Auth } from '@/domain/auth/entities/auth'
import { Role } from '@/domain/auth/entities/role'

export class AuthDTO {
  constructor (
    public readonly id: string,
    public readonly access_token: string,
    public readonly role: string
  ) {}

  get data () {
    return {
      id: this.id,
      access_token: this.access_token,
      role: this.role
    }
  }

  toDomain (): Auth {
    return new Auth(
      Id.create(this.id),
      this.access_token,
      Role[this.role as keyof typeof Role]
    )
  }

  copyWith (auth: Partial<AuthDTO['data']>) {
    return new AuthDTO(
      auth.id ?? this.id,
      auth.access_token ?? this.access_token,
      auth.role ?? this.role
    )
  }
}
