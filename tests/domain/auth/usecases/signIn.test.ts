import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { Email } from '@/domain/@shared/valueObject/email'
import { authBuilder } from '../authBuilder'
import { Role } from '@/domain/auth/entities/role'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { profileDTOBuilder } from '@tests/domain/profile/profileDTOBuilder'
import { Password } from '@/domain/@shared/valueObject/password'
import { Profile } from '@/domain/profile/entities/profile'

describe('When user signIn', () => {
  let authFixture: AuthFixture

  beforeEach(async () => {
    authFixture = createAuthFixture()
  })

  test('when alice signIn with credentials, her account should be returned', async () => {
    authFixture.givenUserExists([
      {
        profile: profileDTOBuilder()
          .withId('alice-id')
          .withEmail('alice@email.fr')
          .withPassword('alice-password')
          .withLastname('Doe')
          .withFirstname('Alice')
          .build(),
        role: Role.CLIENT
      }
    ])

    await authFixture.whenUserSignIn({
      payload: new SignInPayload(
        Email.create('alice@email.fr'),
        Password.create('alice-password')
      )
    })

    authFixture.thenAuthenticatedUserShouldBe(
      authBuilder().withId('alice-id').withRole(Role.CLIENT).build()
    )
    authFixture.thenAuthenticatedUserShouldBeCached(
      authBuilder().withId('alice-id').withRole(Role.CLIENT).build()
    )
    authFixture.thenAuthenticatedProfilShouldBe(
      Profile.fromData({
        id: 'alice-id',
        avatarUrl: 'default-avatar.png',
        email: 'alice@email.fr',
        firstname: 'Alice',
        lastname: 'Doe'
      })
    )
    authFixture.thenCachedProfileShouldBe(
      Profile.fromData({
        id: 'alice-id',
        avatarUrl: 'default-avatar.png',
        email: 'alice@email.fr',
        firstname: 'Alice',
        lastname: 'Doe'
      })
    )
  })
})
