import { UserFixture, createUserFixture } from './userFixture'

describe('SignupClientUseCase', () => {
  let userFixture: UserFixture

  beforeEach(() => {
    userFixture = createUserFixture()
  })

  test('when Alice signup, her account should be created with client role', async () => {
    await userFixture.whenUserSignup({
      name: 'Alice',
      email: 'alice@doe.fr',
      password: 'test-pass',
    })

    userFixture.thenUserAccountShouldExist({
      email: 'alice@doe.fr',
      password: 'test-pass',
      name: 'Alice',
    })
  })
})
