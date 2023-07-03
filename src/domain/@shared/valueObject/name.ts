import { ValueObject } from '@/domain/@shared/valueObject/valueObject'

export type NameProps = {
  value: string
}

export class Name implements ValueObject<NameProps> {
  public readonly props: NameProps

  constructor (props: NameProps) {
    this.props = props
  }

  get value (): string {
    return this.props.value
  }

  isValid (): boolean {
    const regex = /^[A-Z][A-Za-z\é\è\ê\-]+$/gi
    return regex.test(this.props.value)
  }

  static create (name: string): Name {
    return new Name({ value: name })
  }

  equals (vo?: Name): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (!vo.props) {
      return false
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}
