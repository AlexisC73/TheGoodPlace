import { ValueObject } from '@/domain/@shared/valueObject/valueObject'

export type IdProps = {
  value: string
}

export class Id implements ValueObject<IdProps> {
  public readonly props: IdProps

  constructor (props: IdProps) {
    this.props = props
  }

  get value (): string {
    return this.props.value
  }

  equals (vo?: Id): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (!vo.props) {
      return false
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}
