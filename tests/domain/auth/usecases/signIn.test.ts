import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { Email } from '@/domain/auth/valueObjects/email'
import { authBuilder } from '../authBuilder'
import { Role } from '@/domain/auth/entities/role'
import { AuthFixture, createAuthFixture } from '../authFixture'

describe('When user signIn', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('when alice signIn with credentials, her account should be returned', async () => {
    authFixture.givenUserExists([
      {
        id: 'alice-id',
        email: 'alice@email.fr',
        password: 'alice-password',
        role: Role.CLIENT
      }
    ])

    await authFixture.whenUserSignIn({
      payload: new SignInPayload(
        Email.create('alice@email.fr'),
        'alice-password'
      )
    })

    authFixture.thenAuthenticatedUserShouldBe(
      authBuilder().withId('alice-id').withRole(Role.CLIENT).build()
    )
  })
})
