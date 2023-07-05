import type { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { SignupClientUseCase } from '@/domain/auth/usecases/signupClient'
import { inject, injectable } from 'inversify'
import { SignInUseCase } from '@/domain/auth/usecases/signIn'
import { UpdatePasswordUseCase } from '@/domain/auth/usecases/updatePassword'
import { TYPES } from '@/application/@shared/container/types'
import { LookForCachedAuthUseCase } from '@/domain/auth/usecases/lookForCachedAuth'

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

  public GetLookForCachedAuthUseCase (): LookForCachedAuthUseCase {
    return new LookForCachedAuthUseCase(this.authRepository)
  }
}
