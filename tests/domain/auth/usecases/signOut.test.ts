import { authBuilder } from '../authBuilder'
import { AuthFixture, createAuthFixture } from '../authFixture'

describe('SignOut', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('when alice signut, her auth should be deleted from cache', () => {
    authFixture.givenAuthIsCached(authBuilder().withId('alice').build())

    authFixture.whenAuthSignOut()

    authFixture.thenAuthCacheShouldBeEmpty()
  })
})
