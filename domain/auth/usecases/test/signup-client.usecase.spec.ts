import { InMemoryUserRepository } from '../../../../infrastructure/@shared/repositories/in-memory-user'
import { User } from '../../../user/entities/user'
import { userBuilder } from '../../../user/usecases/test/userBuilder'
import { SignupClientUseCase } from '../signup-client.usecase'

describe('SignupClientUseCase', () => {
  test('when Alice signup, her account should be created with client role', async () => {
    whenUserSignup({
      id: 'Alice',
      name: 'Alice',
      email: 'alice@email.fr',
      password: 'testing-password',
      passwordConfirmation: 'testing-password'
    })

    thenUserPasswordShouldBe({
      id: 'Alice',
      password: 'testing-password'
    })

    thenUserShouldExist(
      userBuilder()
        .withId('Alice')
        .withName('Alice')
        .withEmail('alice@email.fr')
        .build()
    )
  })
})

let user = userBuilder()
  .withId('Alice')
  .withName('Alice')
  .withEmail('alice@email.fr')
  .build()

let password = 'testing-password'

const userRepository = new InMemoryUserRepository()
const singupClientUseCase = new SignupClientUseCase(userRepository)

async function whenUserSignup (command: {
  id: string
  name: string
  email: string
  password: string
  passwordConfirmation: string
}) {
  await singupClientUseCase.handle({
    id: command.id,
    email: command.email,
    password: command.password,
    name: command.name,
    passwordConfirmation: command.passwordConfirmation
  })
}

function thenUserPasswordShouldBe (expectedUser: {
  id: string
  password: string
}) {
  const { password } = userRepository.getUserById(expectedUser.id)
  expect(password).toEqual(expectedUser.password)
}

function thenUserShouldExist (expectedUser: User) {
  const { user } = userRepository.getUserById(expectedUser.id)
  expect(user).toEqual(expectedUser)
}
