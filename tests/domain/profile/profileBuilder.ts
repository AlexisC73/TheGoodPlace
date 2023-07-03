import { Profile } from '@/domain/profile/entities/profile'

export const profileBuilder = ({
  id = 'testing-id',
  firstname = 'John',
  lastname = 'Doe',
  email = 'john@doe.fr',
  avatarUrl = 'https://avatar.com/john-doe'
}: Partial<Profile['data']> = {}) => {
  const props = { id, firstname, lastname, email, avatarUrl }
  return {
    withId: (id: string) => profileBuilder({ ...props, id }),
    withFirstname: (firstname: string) =>
      profileBuilder({ ...props, firstname }),
    withLastname: (lastname: string) => profileBuilder({ ...props, lastname }),
    withEmail: (email: string) => profileBuilder({ ...props, email }),
    withAvatarUrl: (avatarUrl: string) =>
      profileBuilder({ ...props, avatarUrl }),
    build: () =>
      new Profile(
        props.id,
        props.email,
        props.lastname,
        props.firstname,
        props.avatarUrl
      )
  }
}
