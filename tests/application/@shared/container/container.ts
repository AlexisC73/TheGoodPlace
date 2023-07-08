import 'reflect-metadata'
import { Container } from 'inversify'
import { AuthRepository } from '@/domain/auth/repositories/authRepository'
import { InMemoryAuthRepository } from '@/infrastructure/auth/repositories/inMemoryAuthRepository'
import { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import { ProfileRepositoryImpl } from '@/infrastructure/profile/repositories/profileRepository'
import { UpdateAvatarUseCase } from '@/domain/profile/usecases/updateAvatar'
import { UpdateProfileUseCase } from '@/domain/profile/usecases/updateProfile'
import { GetCachedAuthUseCase } from '@/domain/auth/usecases/getCachedAuth'
import { GetProfileUseCase } from '@/domain/auth/usecases/getProfile'
import { SignInUseCase } from '@/domain/auth/usecases/signIn'
import { SignOutUseCase } from '@/domain/auth/usecases/signOutUseCase'
import { SignupClientUseCase } from '@/domain/auth/usecases/signupClient'
import { UpdatePasswordUseCase } from '@/domain/auth/usecases/updatePassword'
import { BookRepository } from '@/domain/catalog/repositories/book'
import { BookRepositoryImpl } from '@/infrastructure/catalog/repositories/BookRepositoryImpl'
import { GetForSaleBooksUseCase } from '@/domain/catalog/usecases/get-for-sale-books'
import { GetForSaleBookUseCase } from '@/domain/catalog/usecases/get-for-sale-book'

export const createTestAppContainer = () => {
  const appContainer = new Container()
  appContainer
    .bind<ProfileRepository>(ProfileRepository)
    .to(ProfileRepositoryImpl)
    .inSingletonScope()
  appContainer
    .bind<AuthRepository>(AuthRepository)
    .to(InMemoryAuthRepository)
    .inSingletonScope()
  appContainer
    .bind<BookRepository>(BookRepository)
    .to(BookRepositoryImpl)
    .inSingletonScope()
  appContainer
    .bind<UpdateAvatarUseCase>(UpdateAvatarUseCase)
    .toSelf()
    .inSingletonScope()
  appContainer
    .bind<UpdateProfileUseCase>(UpdateProfileUseCase)
    .toSelf()
    .inSingletonScope()
  appContainer
    .bind<GetCachedAuthUseCase>(GetCachedAuthUseCase)
    .toSelf()
    .inSingletonScope()
  appContainer
    .bind<GetProfileUseCase>(GetProfileUseCase)
    .toSelf()
    .inSingletonScope()
  appContainer.bind<SignInUseCase>(SignInUseCase).toSelf().inSingletonScope()
  appContainer.bind<SignOutUseCase>(SignOutUseCase).toSelf().inSingletonScope()
  appContainer
    .bind<SignupClientUseCase>(SignupClientUseCase)
    .toSelf()
    .inSingletonScope()
  appContainer
    .bind<UpdatePasswordUseCase>(UpdatePasswordUseCase)
    .toSelf()
    .inSingletonScope()
  appContainer
    .bind<GetForSaleBooksUseCase>(GetForSaleBooksUseCase)
    .toSelf()
    .inSingletonScope()
  appContainer
    .bind<GetForSaleBookUseCase>(GetForSaleBookUseCase)
    .toSelf()
    .inSingletonScope()
  return appContainer
}
