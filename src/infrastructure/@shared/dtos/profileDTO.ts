import { Profile } from '@/domain/profile/entities/profile'

export class ProfileDTO {
  constructor (
    public readonly id: string,
    public readonly email: string,
    public readonly lastname: string,
    public readonly firstname: string,
    public readonly avatarUrl: string,
    public readonly password: string
  ) {}

  get data () {
    return {
      id: this.id,
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      avatarUrl: this.avatarUrl,
      password: this.password
    }
  }

  toDomain (): Profile {
    return new Profile(
      this.id,
      this.email,
      this.lastname,
      this.firstname,
      this.avatarUrl
    )
  }

  static fromDomain (profile: Profile, password: string) {
    return new ProfileDTO(
      profile.id,
      profile.email,
      profile.lastname,
      profile.firstname,
      profile.avatarUrl,
      password
    )
  }

  copyWith (data: Partial<ProfileDTO>) {
    return new ProfileDTO(
      data.id ?? this.id,
      data.email ?? this.email,
      data.lastname ?? this.lastname,
      data.firstname ?? this.firstname,
      data.avatarUrl ?? this.avatarUrl,
      data.password ?? this.password
    )
  }
}
