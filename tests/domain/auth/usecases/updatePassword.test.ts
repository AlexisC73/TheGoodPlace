import { profileDTOBuilder } from '@tests/domain/profile/profileDTOBuilder'
import { AuthFixture, createAuthFixture } from '../authFixture'
import { UpdatePasswordPayload } from '@/domain/auth/entities/payload/updatePassword'
import { Id } from '@/domain/auth/valueObjects/id'
import { Password } from '@/domain/auth/valueObjects/password'
import { Role } from '@/domain/auth/entities/role'

describe('When user update his password', () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test.only('when alice update her password, her profile should be updated', async () => {
    const aliceDtoBuilder = profileDTOBuilder()
      .withId('alice-id')
      .withEmail('alice@test.fr')
      .withPassword('alice-password')

    authFixture.givenUserExists([
      { profile: aliceDtoBuilder.build(), role: Role.CLIENT }
    ])

    await authFixture.whenUserUpdateHisPassword({
      payload: new UpdatePasswordPayload(
        Id.create('alice-id'),
        Password.create('alice-password'),
        Password.create('alice-password (updated)'),
        Password.create('alice-password (updated)')
      )
    })

    authFixture.thenProfileShouldExist(
      aliceDtoBuilder.withPassword('alice-password (updated)').build()
    )
  })
})
