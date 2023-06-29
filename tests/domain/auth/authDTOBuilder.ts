import { Role } from '@/domain/auth/entities/role'
import { AuthDTO } from '@/infrastructure/auth/dtos/auth'

export const authDTOBuilder = ({
  id = 'test id',
  role = Role.CLIENT,
  email = 'test@email.fr',
  password = 'password'
}: Partial<AuthDTO> = {}) => {
  const access_token = JSON.stringify({ id })
  const props = { id, role, email, password, access_token }
  return {
    withId: (id: string) => authDTOBuilder({ ...props, id }),
    withRole: (role: Role) => authDTOBuilder({ ...props, role }),
    withEmail: (email: string) => authDTOBuilder({ ...props, email }),
    withPassword: (password: string) => authDTOBuilder({ ...props, password }),
    build: () => new AuthDTO(id, access_token, role, email, password)
  }
}
