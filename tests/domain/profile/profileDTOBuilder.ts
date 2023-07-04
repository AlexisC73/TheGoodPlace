import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'

export const profileDTOBuilder = ({
  id = 'test-id',
  avatarUrl = 'default-avatar.png',
  email = 'test@email.fr',
  firstname = '',
  lastname = '',
  password = 'password'
}: Partial<ProfileDTO['data']> = {}) => {
  const props = { id, avatarUrl, email, firstname, lastname, password }
  return {
    withId: (id: string) => profileDTOBuilder({ ...props, id }),
    withAvatarUrl: (avatarUrl: string) =>
      profileDTOBuilder({ ...props, avatarUrl }),
    withEmail: (email: string) => profileDTOBuilder({ ...props, email }),
    withFirstname: (firstname: string) =>
      profileDTOBuilder({ ...props, firstname }),
    withLastname: (lastname: string) =>
      profileDTOBuilder({ ...props, lastname }),
    withPassword: (password: string) =>
      profileDTOBuilder({ ...props, password }),
    build: () =>
      new ProfileDTO(
        props.id,
        props.email,
        props.lastname,
        props.firstname,
        props.avatarUrl,
        props.password
      )
  }
}
