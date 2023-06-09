import { Id } from '@/domain/@shared/valueObject/id'

export class UpdateAvatarPayload {
  constructor (
    public readonly _userId: Id,
    public readonly formData: FormData
  ) {}

  isValid (): boolean {
    return this._userId.isValid() && this.formData.has('avatar')
  }

  get userId (): string {
    return this._userId.value
  }

  get avatar (): File {
    return this.formData.get('avatar') as File
  }
}
