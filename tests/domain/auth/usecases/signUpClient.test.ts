import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { Email } from '@/domain/@shared/valueObject/email'
import { Id } from '@/domain/@shared/valueObject/id'
import { Password } from '@/domain/@shared/valueObject/password'
import { profileDTOBuilder } from '@tests/domain/profile/profileDTOBuilder'
import { authBuilder } from '../authBuilder'
import { Role } from '@/domain/auth/entities/role'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { PayloadError } from '@/domain/auth/error/errors'

describe('When new user signUp', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })
  test('when alice signUp, her account should be created', async () => {
    authFixture.givenUserExists([])

    await authFixture.whenUserSignUp({
      payload: new SignUpClientPayload(
        Id.create('alice-id'),
        Email.create('alice@email.fr'),
        Password.create('testing-password'),
        Password.create('testing-password')
      )
    })

    authFixture.thenProfileShouldExist(
      profileDTOBuilder()
        .withId('alice-id')
        .withEmail('alice@email.fr')
        .withLastname('')
        .withFirstname('')
        .withAvatarUrl('default-avatar.png')
        .withPassword('testing-password')
        .build()
    )

    authFixture.thenAuthenticatedUserShouldBe(
      authBuilder().withId('alice-id').withRole(Role.CLIENT).build()
    )
    authFixture.thenAuthenticatedUserShouldBeCached(
      authBuilder().withId('alice-id').withRole(Role.CLIENT).build()
    )
  })

  test('when alice signUp with wrong confirmation password, her account should not be created', async () => {
    authFixture.givenUserExists([])

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
