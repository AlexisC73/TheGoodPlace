import { InMemoryUserRepository } from '../../../../infrastructure/@shared/repositories/in-memory-user'
import { User } from '../../../user/entities/user'
import { userBuilder } from '../../../user/usecases/test/userBuilder'
import { Auth } from '../../entities/auth'
import { Role } from '../../entities/role'
import { SigninClientUseCase } from '../signin-client.usecase'

describe('SigninUser', () => {
  test('should return user informations if signin success', async () => {
    givenUsersExist([
      {
        data: userBuilder().withId('1').withEmail('mail@test.fr').build(),
        password: 'user password'
      }
    ])

    await whenAUserSigninWith({
      email: 'mail@test.fr',
      password: 'user password'
    })

    thenConnectedUserShouldBe(
      Auth.fromData({
        id: '1',
        access_token: JSON.stringify({ id: '1' }),
        avatarUrl: 'default/avatar.png',
        role: Role.CLIENT
      })
    )
  })
})

let authUser: Auth

const userRepository = new InMemoryUserRepository()
const signinClientUseCase = new SigninClientUseCase(userRepository)

function givenUsersExist (users: { data: User; password: string }[]) {
  userRepository.setUsers(users)
}

async function whenAUserSigninWith (command: {
  email: string
  password: string
}) {
  authUser = await signinClientUseCase.handle(command)
}

function thenConnectedUserShouldBe (expectedAuth: Auth) {
  expect(authUser).toEqual(expectedAuth)
}
