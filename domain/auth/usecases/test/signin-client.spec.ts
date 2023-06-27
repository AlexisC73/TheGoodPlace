import { InMemoryUserRepository } from '../../../../infrastructure/@shared/repositories/in-memory-user'
import { userBuilder } from '../../../user/usecases/test/userBuilder'
import { Auth } from '../../entities/auth'
import { Role } from '../../entities/role'
import { AuthFixture, createAuthFixture } from './AuthFixture'
import { UserFixture, createUserFixture } from './userFixture'

describe('SigninUser', () => {
  let authFixture: AuthFixture
  let userFixture: UserFixture

  const userRepository = new InMemoryUserRepository()

  beforeEach(() => {
    authFixture = createAuthFixture({ userRepository })
    userFixture = createUserFixture({ userRepository })
  })

  test('should return user informations if signin success', async () => {
    userFixture.givenUsersExist([
      {
        data: userBuilder().withId('1').withEmail('mail@test.fr').build(),
        password: 'user password'
      }
    ])

    await authFixture.whenAUserSigninWith({
      email: 'mail@test.fr',
      password: 'user password'
    })

    authFixture.thenConnectedUserShouldBe(
      Auth.fromData({
        id: '1',
        access_token: JSON.stringify({ id: '1' }),
        avatarUrl: 'default/avatar.png',
        role: Role.CLIENT
      })
    )
  })
})
