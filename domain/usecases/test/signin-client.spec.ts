import { ConnectInfoDTO } from '../../../infrastructure/dtos/connectInfoDto'
import { Role } from '../../entities/user'
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
    const existingUser = {
      connectionInformation: 'john@doe.fr-test-pass',
      connectInfoDto: new ConnectInfoDTO(
        '1',
        'john',
        'john@doe.fr',
        'test-token',
        Role.CLIENT.toString(),
        'default-avatar.png'
      ),
    }
    // Arrange
    userConnectionFixture.givenUserExist([existingUser])
    // Act
    await userConnectionFixture.whenUserSignin({
      email: 'john@doe.fr',
      password: 'test-pass',
    })
    // Assert
    userConnectionFixture.thenReturnedUserConnectionShouldBe(
      new ConnectInfoDTO(
        '1',
        'john',
        'john@doe.fr',
        'test-token',
        Role.CLIENT.toString(),
        'default-avatar.png'
      )
    )
  })
})
