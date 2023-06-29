export class SignUpClientPayload {
  constructor (
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly passwordConfirmation: string
  ) {}
}
