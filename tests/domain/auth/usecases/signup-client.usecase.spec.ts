import { Role } from '@/domain/auth/entities/role'
import { authBuilder } from '../authBuilder'
import { Auth } from '@/domain/auth/entities/auth'
import { SignUpClientPayload } from '@/domain/auth/entities/signUpClientPayload'
import { SignupClientUseCase } from '@/domain/auth/usecases/signup-client'
import { SignUpClientParams } from '@/domain/auth/usecases/signup-client'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'

describe('SignupClientUseCase', () => {
  let fixture: Fixture
  beforeEach(() => {
    fixture = createFixture()
  })

  test('when Alice signup, a auth should be returned with her information', async () => {
    fixture.givenAuthAccounts([])

    await fixture.whenUserSignUpWithCredentials({
      payload: new SignUpClientPayload(
        'alice-id',
        'alice@test.fr',
        'password',
        'password'
      )
    })

    fixture.thenreturnedAuthShouldBe(
      authBuilder()
        .withRole(Role.CLIENT)
        .withEmail('alice@test.fr')
        .withId('alice-id')
        .build()
    )
  })
})

const createFixture = () => {
  let auths: Auth[] = []
  let currentAuth: Auth

  const authRepository = new InMemoryAuthRepository()
  const signUpClientUseCase = new SignupClientUseCase(authRepository)

  return {
    givenAuthAccounts (givenAuth: Auth[]) {
      auths = givenAuth
    },
    async whenUserSignUpWithCredentials (credentials: SignUpClientParams) {
      currentAuth = await signUpClientUseCase.handle(credentials)
    },
    thenreturnedAuthShouldBe (expectedAuth: Auth) {
      expect(currentAuth).toEqual(expectedAuth)
    }
  }
}

type Fixture = ReturnType<typeof createFixture>
