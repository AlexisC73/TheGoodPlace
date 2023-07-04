import { Email } from '@/domain/@shared/valueObject/email'
import { Id } from '@/domain/@shared/valueObject/id'
import { Name } from '@/domain/@shared/valueObject/name'
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

  static fromData (data: ProfileDTO['data']) {
    return new ProfileDTO(
      data.id,
      data.email,
      data.lastname,
      data.firstname,
      data.avatarUrl,
      data.password
    )
  }

  toDomain (): Profile {
    return new Profile(
      Id.create(this.id),
      Email.create(this.email),
      Name.create(this.lastname),
      Name.create(this.firstname),
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
