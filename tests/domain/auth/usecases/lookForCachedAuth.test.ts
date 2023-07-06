import { Role } from '@/domain/auth/entities/role'
import { authBuilder } from '../authBuilder'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { profileDTOBuilder } from '@tests/domain/profile/profileDTOBuilder'

describe('lookForCachedAuthUseCase', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('when alice has a cached auth, she should get signedIn', async () => {
    authFixture.givenUserExists([
      {
        profile: profileDTOBuilder().withId('alice').build(),
        role: Role.CLIENT
      }
    ])

    authFixture.givenAuthIsAuthenticated({
      id: 'alice',
      role: Role.CLIENT
    })

    authFixture.whenGetCachedAuthIsCalled()

    authFixture.thenAuthenticatedUserShouldBe(
      authBuilder().withId('alice').build()
    )
  })

  test("when alice don't have cached auth, should not be signedIn", async () => {
    authFixture.givenUserExists([
      {
        profile: profileDTOBuilder().withId('alice').build(),
        role: Role.CLIENT
      }
    ])

    authFixture.givenNoAuthIsCached()

    authFixture.whenGetCachedAuthIsCalled()

    authFixture.thenAuthenticatedShouldBeUndefined()
  })
})
