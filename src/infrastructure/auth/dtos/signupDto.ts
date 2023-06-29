export class SignupClientDTO {
  // TODO : rename to SignInPayloadDto
  // TODO : rework workflow of account creation
  constructor(
    private readonly _email: string,
    private readonly _password: string,
    private readonly _name: string,
    private readonly _passwordConfirmation: string
  ) {}

  isValid() {
    return (
      this.email &&
      this.password &&
      this.name &&
      this.passwordConfirmation === this.password
    );
  }

  get data() {
    return {
      email: this.email,
      password: this.password,
      name: this.name,
      passwordConfirmation: this.passwordConfirmation,
    };
  }

  static fromData(data: SignupClientDTO["data"]) {
    // TODO : next auth ?
    return new SignupClientDTO(
      data.email,
      data.password,
      data.name,
      data.passwordConfirmation
    );
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get name() {
    return this._name;
  }

  get passwordConfirmation() {
    return this._passwordConfirmation;
  }
}
