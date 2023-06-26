import { Role } from "./role";


export class UserConnection {
  constructor(
    public _id: string,
    public _name: string,
    public _email: string,
    public _access_token: string,
    public _role: Role,
    public _avatarUrl: string
  ) {}

  get data() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      access_token: this._access_token,
      role: this._role,
      avatarUrl: this._avatarUrl,
    }
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get access_token() {
    return this._access_token
  }

  get role() {
    return this._role
  }

  get avatarUrl() {
    return this._avatarUrl
  }
}
