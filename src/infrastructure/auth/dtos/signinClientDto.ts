export class SigninClientDto {
    constructor(private readonly _email: string, private readonly _password: string) {}

    get data() {
        return {
            email: this.email,
            password: this.password
        }
    }

    static fromData(data: SigninClientDto["data"]) {
        return new SigninClientDto(data.email, data.password)
    }

    isValid() {
        return this.email && this.password
    }

    get email() {
        return this._email
    }

    get password() {
        return this._password
    }
}