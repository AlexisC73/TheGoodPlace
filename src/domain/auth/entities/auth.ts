import { Role } from "./role";

export class Auth {
  constructor(
    public _id: string,
    public _access_token: string,
    public _role: Role // public _avatarUrl: string
  ) {}

  get data() {
    return {
      id: this._id,
      access_token: this._access_token,
      role: this._role,
      // avatarUrl: this._avatarUrl
    };
  }

  static fromData(data: Auth["data"]) {
    return new Auth(
      data.id,
      data.access_token,
      data.role
      //data.avatarUrl
    );
  }

  get id() {
    return this._id;
  }

  get access_token() {
    return this._access_token;
  }

  get role() {
    return this._role;
  }

  // get avatarUrl() {
  //   return this._avatarUrl;
  // }
}
