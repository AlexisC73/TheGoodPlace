import { Auth } from '@/domain/auth/entities/auth'
import { Role } from '@/domain/auth/entities/role'

export const authBuilder = ({
  id = 'test id',
  role = Role.CLIENT,
  email = 'test email'
}: Partial<Auth> = {}) => {
  const access_token = JSON.stringify({ id })
  const props = { id, access_token, role, email }
  return {
    withId: (id: string) => authBuilder({ ...props, id }),
    withRole: (role: Role) => authBuilder({ ...props, role }),
    withEmail: (email: string) => authBuilder({ ...props, email }),
    build: () => new Auth(id, access_token, role, email)
  }
}
