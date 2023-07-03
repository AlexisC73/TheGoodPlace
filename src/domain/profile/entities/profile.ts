export class Profile {
  constructor (
    public readonly id: string,
    public readonly email: string,
    public readonly lastname: string,
    public readonly firstname: string,
    public readonly avatarUrl: string
  ) {}

  get data () {
    return {
      id: this.id,
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      avatarUrl: this.avatarUrl
    }
  }
}
