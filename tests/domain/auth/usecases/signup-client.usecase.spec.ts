import { InMemoryUserRepository } from '@/infrastructure/@shared/repositories/in-memory-user'
import { userBuilder } from '@tests/domain/user/userBuilder'
import { AuthFixture, createAuthFixture } from '../AuthFixture'
import { UserFixture, createUserFixture } from '../userFixture'

describe('SignupClientUseCase', () => {
  let authFixture: AuthFixture
  let userFixture: UserFixture
  const userRepository = new InMemoryUserRepository()

  beforeEach(() => {
    authFixture = createAuthFixture({ userRepository })
    userFixture = createUserFixture({ userRepository })
  })

  test('when Alice signup, her account should be created with client role', async () => {
    authFixture.whenUserSignup({
      id: 'Alice',
      name: 'Alice',
      email: 'alice@email.fr',
      password: 'testing-password',
      passwordConfirmation: 'testing-password'
    })

    userFixture.thenUserPasswordShouldBe({
      id: 'Alice',
      password: 'testing-password'
    })

    userFixture.thenUserShouldExist(
      userBuilder()
        .withId('Alice')
        .withName('Alice')
        .withEmail('alice@email.fr')
        .build()
    )
  })
})
