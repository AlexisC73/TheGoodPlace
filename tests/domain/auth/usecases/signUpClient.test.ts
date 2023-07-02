import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { Email } from '@/domain/auth/valueObjects/email'
import { Id } from '@/domain/auth/valueObjects/id'
import { Password } from '@/domain/auth/valueObjects/password'
import { profileDTOBuilder } from '@tests/domain/profile/profileDTOBuilder'
import { authBuilder } from '../authBuilder'
import { Role } from '@/domain/auth/entities/role'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { PayloadError } from '@/domain/auth/error/errors'

describe('When new user signUp', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
    localStorage.clear()
  })
  test('when alice signUp, her account should be created', async () => {
    await authFixture.whenUserSignUp({
      payload: new SignUpClientPayload(
        Id.create('alice-id'),
        Email.create('alice@email.fr'),
        Password.create('alice-password'),
        Password.create('alice-password')
      )
    })

    authFixture.thenProfileShouldExist(
      profileDTOBuilder()
        .withId('alice-id')
        .withEmail('alice@email.fr')
        .withLastname('')
        .withFirstname('')
        .withAvatarUrl('default-avatar.png')
        .withPassword('alice-password')
        .build()
    )

    authFixture.thenAuthenticatedUserShouldBe(
      authBuilder().withId('alice-id').withRole(Role.CLIENT).build()
    )
  })

  test('when alice signUp with wrong confirmation password, her account should not be created', async () => {
    await authFixture.whenUserSignUp({
      payload: new SignUpClientPayload(
        Id.create('alice-id'),
        Email.create('alice@email.fr'),
        Password.create('alice-password'),
        Password.create('alice-password 2')
      )
    })

    authFixture.thenErrorShouldBe(PayloadError)
    authFixture.thenProfileShouldNotExist('alice-id')
    authFixture.thenUserShouldNotBeAuthenticated()
  })
})
