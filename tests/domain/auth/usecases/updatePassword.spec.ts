import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { authDTOBuilder } from '../authDTOBuilder'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { Id } from '@/domain/auth/valueObjects/id'
import { Password } from '@/domain/auth/valueObjects/password'

describe('Update Password Use Case', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test('Alice can update her personal password', async () => {
    const existingAccount = authDTOBuilder()
      .withId('alice-id')
      .withPassword('old password')

    authFixture.givenAuthAccounts([existingAccount.build()])

    await authFixture.whenUserUpdatePassword({
      payload: new UpdatePasswordPayload(
        new Id({ value: 'alice-id' }),
        new Password({ value: 'old password' }),
        new Password({ value: 'new password' }),
        new Password({ value: 'new password' })
      )
    })

    authFixture.thenAccountShouldBe(
      existingAccount.withPassword('new password').build()
    )
  })
})
