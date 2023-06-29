import { SignInPayload } from '@/domain/auth/entities/payload/signInPayload'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { authDTOBuilder } from '../authDTOBuilder'
import { Role } from '@/domain/auth/entities/role'

describe('SigninUser', () => {
  let authFixture: AuthFixture
  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('should return user informations if signin success', async () => {
    const existingUser = authDTOBuilder()
      .withId('alice-id')
      .withEmail('alice@test.fr')
      .withPassword('password')
      .withRole(Role.CLIENT)
      .build()

    authFixture.givenAuthAccounts([existingUser])

    await authFixture.whenUserSignInWithCredentials({
      payload: new SignInPayload('alice@test.fr', 'password')
    })

    authFixture.thenAuthenticatedUserShouldBe(existingUser.toDomain())
  })
})
