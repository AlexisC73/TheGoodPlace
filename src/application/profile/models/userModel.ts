export class UserModel {
  constructor (
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly avatarUrl: string,
    public readonly email: string
  ) {}

  get data () {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      avatarUrl: this.avatarUrl
    }
  }
}
