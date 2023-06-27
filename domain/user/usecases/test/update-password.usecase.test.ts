import { InMemoryUserRepository } from '../../../../infrastructure/@shared/repositories/in-memory-user'
import {
  UserFixture,
  createUserFixture
} from '../../../auth/usecases/test/userFixture'
import { userBuilder } from './userBuilder'

describe('Update Password Use Case', () => {
  let userFixture: UserFixture

  const userRepository = new InMemoryUserRepository()

  beforeEach(() => {
    userFixture = createUserFixture({ userRepository })
  })

  test('Alice can change her password, and he should be updated', () => {
    userFixture.givenUsersExist([
      {
        data: userBuilder().withId('Alice').build(),
        password: 'old password'
      }
    ])

    userFixture.whenUserUpdateHisPassword({
      id: 'Alice',
      oldPassword: 'old password',
      newPassword: 'new password',
      newPasswordConfirmation: 'new password'
    })

    userFixture.thenUserPasswordShouldBe({
      id: 'Alice',
      password: 'new password'
    })
  })
})
