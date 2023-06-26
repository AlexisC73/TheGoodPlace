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
    // Arrange
    userConnectionFixture.givenUserExist([
      {
        email: 'alice@doe.fr',
        password: 'test-pass',
        name: 'Alice',
      },
    ])
    // Act
    await userConnectionFixture.whenUserSignin({
      email: 'alice@doe.fr',
      password: 'test-pass',
    })
    // Assert
    userConnectionFixture.thenExpectedUserConnected({
      email: 'alice@doe.fr',
    })
  })
})
