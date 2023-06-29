import { User } from '@/domain/user/entities/user'

export const userBuilder = ({
  id = 'test id',
  name = 'test name',
  email = 'test@email.fr',
  avatarUrl = 'default/avatar.png'
}: Partial<User> = {}) => {
  const props: User['data'] = { id, name, email, avatarUrl }

  return {
    withId: (id: string) => userBuilder({ ...props, id }),
    withName: (name: string) => userBuilder({ ...props, name }),
    withEmail: (email: string) => userBuilder({ ...props, email }),
    withAvatarUrl: (avatarUrl: string) => userBuilder({ ...props, avatarUrl }),
    build: () => User.fromData(props)
  }
}
