import { Role } from './user'

export class UserConnection {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public access_token: string,
    public role: Role,
    public avatarUrl: string
  ) {}
}
