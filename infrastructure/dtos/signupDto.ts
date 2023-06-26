export class SignupClientDTO {
    constructor(public email: string, public password: string, public name: string, public passwordConfirmation: string) {}

    isValid() {
        return this.email && this.password && this.name && this.passwordConfirmation === this.password
    }

    static fromData(data: {email: string, password: string, name: string, passwordConfirmation: string}) {
        return new SignupClientDTO(data.email, data.password, data.name, data.passwordConfirmation)
    }
}