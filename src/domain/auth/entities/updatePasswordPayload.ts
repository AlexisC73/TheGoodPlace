class UpdateUserPasswordPayload {
  constructor(
    public readonly previousPassword: string,
    public readonly newPassword: string,
    public readonly newPasswordConfirmation: string
  ) {}

  isValid() {
    return this.newPassword === this.newPasswordConfirmation;
  }

  passwordMatch() {
    return this.previousPassword === this.newPassword;
  }

  previousPasswordIsValid() {
    return this.previousPassword.length > 6;
  }
  newPasswordIsValid() {
    return this.newPassword.length > 6;
  }
  newPasswordConfirmationIsValid() {
    return this.newPasswordConfirmation.length > 6;
  }
}
