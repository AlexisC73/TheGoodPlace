import { Role } from '@/domain/auth/entities/role'
import { authBuilder } from '../authBuilder'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { Email } from '@/domain/auth/valueObjects/email'
import { Password } from '@/domain/auth/valueObjects/password'
import { Id } from '@/domain/auth/valueObjects/id'

describe('SignupClientUseCase', () => {
  let authFixture: AuthFixture
  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('when Alice signup, a auth should be returned with her information', async () => {
    authFixture.givenAuthAccounts([])

    await authFixture.whenUserSignUpWithCredentials({
      payload: new SignUpClientPayload(
        new Id({ value: 'alice-id' }),
        new Email({ value: 'alice@test.fr' }),
        new Password({ value: 'password' }),
        new Password({ value: 'password' })
      )
    })

    authFixture.thenAuthenticatedUserShouldBe(
      authBuilder()
        .withRole(Role.CLIENT)
        .withEmail('alice@test.fr')
        .withId('alice-id')
        .build()
    )
  })
})
