import { profileDTOBuilder } from '@tests/domain/profile/profileDTOBuilder'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { Role } from '@/domain/auth/entities/role'
import { profileBuilder } from '@tests/domain/profile/profileBuilder'

describe('Get Profile', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('when Alice try to get profile, should return her profile', async () => {
    const aliceProfile = profileDTOBuilder().withId('alice-id')
    authFixture.givenUserExists([
      {
        profile: aliceProfile.build(),
        role: Role.CLIENT
      }
    ])

    authFixture.givenAuthIsAuthenticated({ id: 'alice-id', role: Role.CLIENT })

    await authFixture.whenAuthGetProfile()

    authFixture.thenProfileShouldBe(aliceProfile.build().toDomain())
  })

  test('when Alice try to get profile with error in id, should throw error', async () => {
    const aliceProfile = profileDTOBuilder().withId('alice-id')
    authFixture.givenUserExists([
      {
        profile: aliceProfile.withId('alice-id').build(),
        role: Role.CLIENT
      }
    ])
    authFixture.givenAuthIsAuthenticated({
      id: 'alice-id-error',
      role: Role.CLIENT
    })

    await authFixture.whenAuthGetProfile()

    authFixture.thenErrorShouldBeThrown()
  })

  test('when Alice try to get profile but already got an other profile in cache, should replace the cached profile', async () => {
    const aliceProfile = profileDTOBuilder().withId('alice-id')
    authFixture.givenUserExists([
      {
        profile: aliceProfile.withId('alice-id').build(),
        role: Role.CLIENT
      }
    ])
    authFixture.givenAuthIsAuthenticated({ id: 'alice-id', role: Role.CLIENT })
    authFixture.givenProfileIsCached(profileBuilder().withId('bob-id').build())

    await authFixture.whenAuthGetProfile()

    authFixture.thenProfileShouldBe(aliceProfile.build().toDomain())
  })
})
