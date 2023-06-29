import { Role } from '@/domain/auth/entities/role'
import { authBuilder } from '../authBuilder'
import { SignUpClientPayload } from '@/domain/auth/entities/payload/signUpClientPayload'
import { AuthFixture, createAuthFixture } from '../authFixture'

describe('SignupClientUseCase', () => {
  let authFixture: AuthFixture
  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('when Alice signup, a auth should be returned with her information', async () => {
    authFixture.givenAuthAccounts([])

    await authFixture.whenUserSignUpWithCredentials({
      payload: new SignUpClientPayload(
        'alice-id',
        'alice@test.fr',
        'password',
        'password'
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
