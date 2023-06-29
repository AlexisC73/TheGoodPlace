import { ValueObject } from '@/domain/@shared/valueObject/valueObject'

export type PasswordProps = {
  value: string
}

export class Password implements ValueObject<PasswordProps> {
  public readonly props: PasswordProps

  constructor (props: PasswordProps) {
    this.props = props
  }

  get value (): string {
    return this.props.value
  }

  equals (vo?: Password): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (!vo.props) {
      return false
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}
