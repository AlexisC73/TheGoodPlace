export class SigninClientDto {
    constructor(public email: string, public password: string) {}

    static fromData(data: {email: string, password: string}) {
        return new SigninClientDto(data.email, data.password)
    }

    isValid() {
        return this.email && this.password
    }
}