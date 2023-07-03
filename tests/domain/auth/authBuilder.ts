import { Id } from '@/domain/@shared/valueObject/id'
import { Auth } from '@/domain/auth/entities/auth'
import { Role } from '@/domain/auth/entities/role'

export const authBuilder = ({
  id = 'test-id',
  role = Role.CLIENT
}: Partial<Auth['data']> = {}) => {
  const props = { role, id }
  return {
    withId: (id: string) => authBuilder({ ...props, id }),
    withRole: (role: Role) => authBuilder({ ...props, role }),
    build: () =>
      new Auth(
        Id.create(props.id),
        JSON.stringify({ id: props.id }),
        props.role
      )
  }
}
