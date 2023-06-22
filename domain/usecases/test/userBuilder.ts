import { Role, User } from '../../entities/user'

export const userBuilder = ({
  id = '1',
  name = 'any_name',
  email = 'any_email',
  password = 'any_password',
  avatarUrl = 'default-avatar.png',
  role = Role.CLIENT,
  createdAt = new Date('2023-01-07 22:00:00'),
}: {
  id?: string
  name?: string
  email?: string
  password?: string
  avatarUrl?: string
  role?: Role
  createdAt?: Date
} = {}) => {
  const props = { id, name, email, password, avatarUrl, role, createdAt }
  return {
    withId: (id: string) => userBuilder({ ...props, id }),
    withName: (name: string) => userBuilder({ ...props, name }),
    withEmail: (email: string) => userBuilder({ ...props, email }),
    withPassword: (password: string) => userBuilder({ ...props, password }),
    withAvatarUrl: (avatarUrl: string) => userBuilder({ ...props, avatarUrl }),
    withRole: (role: Role) => userBuilder({ ...props, role }),
    withCreatedAt: (createdAt: Date) => userBuilder({ ...props, createdAt }),
    build: () =>
      new User(id, name, email, password, avatarUrl, role, createdAt),
  }
}
