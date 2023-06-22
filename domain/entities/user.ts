export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public avatarUrl: string,
    public role: Role
  ) {}

  get data() {
    return {
      name: this.name,
      email: this.email,
    }
  }

  isValid(): boolean {
    return (
      this.email.length > 0 &&
      this.password.length > 0 &&
      this.name.length > 0 &&
      this.avatarUrl.length > 0
    )
  }
}

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  CLIENT = 'CLIENT',
  SELLER = 'SELLER',
}
