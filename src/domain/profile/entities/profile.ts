export class Profile {
  constructor (
    public readonly id: string,
    public readonly email: string,
    public readonly lastname: string,
    public readonly firstname: string,
    public readonly avatarUrl: string
  ) {}
}
