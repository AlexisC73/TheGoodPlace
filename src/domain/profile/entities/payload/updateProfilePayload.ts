import { Email } from '@/domain/@shared/valueObject/email'
import { Id } from '@/domain/@shared/valueObject/id'
import { Name } from '@/domain/@shared/valueObject/name'
import { Password } from '@/domain/@shared/valueObject/password'

type UpdateData = {
  email?: Email
  lastname?: Name
  firstname?: Name
}
export class UpdateProfilePayload {
  constructor (
    public readonly _userId: Id,
    public readonly _password: Password,
    public readonly _updateData: UpdateData
  ) {}

  isValid (): boolean {
    return (
      this._userId.isValid() &&
      this._password.isValid() &&
      this.isUpdateDataValid()
    )
  }

  isUpdateDataValid (): boolean {
    return (
      (this._updateData.email?.isValid() ?? false) ||
      (this._updateData.lastname?.isValid() ?? false) ||
      (this._updateData.firstname?.isValid() ?? false)
    )
  }

  get userId () {
    return this._userId.value
  }

  get password () {
    return this._password.value
  }

  get updateData () {
    return {
      email: this._updateData.email?.isValid()
        ? this._updateData.email?.value
        : undefined,
      firstname: this._updateData.firstname?.isValid()
        ? this._updateData.firstname?.value
        : undefined,
      lastname: this._updateData.lastname?.isValid()
        ? this._updateData.lastname?.value
        : undefined
    }
  }

  get data () {
    return {
      userId: this.userId,
      password: this.password,
      updateData: this.updateData
    }
  }
}
