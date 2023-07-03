import type { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { SignupClientUseCase } from '@/domain/auth/usecases/signupClient'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/application/auth/container/types'
import { SignInUseCase } from '@/domain/auth/usecases/signIn'
import { UpdatePasswordUseCase } from '@/domain/auth/usecases/updatePassword'

@injectable()
export class AuthService {
  constructor (
    @inject(TYPES.AuthRepository)
    private readonly authRepository: AuthRepository
  ) {}

  public GetSignUpUseCase (): SignupClientUseCase {
    return new SignupClientUseCase(this.authRepository)
  }

  public GetSignInUseCase (): SignInUseCase {
    return new SignInUseCase(this.authRepository)
  }

  public GetUpdatePasswordUseCase (): UpdatePasswordUseCase {
    return new UpdatePasswordUseCase(this.authRepository)
  }
}
