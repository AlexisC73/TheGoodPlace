import { UserConnection } from '../../entities/connection'
import { Role, User } from '../../entities/user'
import {
  UserConnectionFixture,
  createUserConnectionFixture,
} from './UserConnectionFixture'

describe('SigninUser', () => {
  let userConnectionFixture: UserConnectionFixture

  beforeEach(() => {
    userConnectionFixture = createUserConnectionFixture()
  })
  test('should return user informations if signin success', async () => {
    const existingUser = new User(
      '1',
      'john doe',
      'john@doe.fr',
      'test-pass',
      'default-avatar.png',
      Role.CLIENT
    )
    // Arrange
    userConnectionFixture.givenUserExist([existingUser])
    // Act
    await userConnectionFixture.whenUserSignin({
      email: 'john@doe.fr',
      password: 'test-pass',
    })
    // Assert
    userConnectionFixture.thenReturnedUserConnectionShouldBe(
      new UserConnection(
        '1',
        'john doe',
        'john@doe.fr',
        JSON.stringify(existingUser.data),
        Role.CLIENT,
        'default-avatar.png'
      )
    )
  })
})
