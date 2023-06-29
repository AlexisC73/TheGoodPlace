import { ValueObject } from '@/domain/@shared/valueObject/valueObject'

export type EmailProps = {
  value: string
}

export class Email implements ValueObject<EmailProps> {
  public readonly props: EmailProps

  constructor (props: EmailProps) {
    this.props = props
  }

  get value (): string {
    return this.props.value
  }

  equals (vo?: Email): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (!vo.props) {
      return false
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}
