import { profileBuilder } from '../profileBuilder'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { Id } from '@/domain/@shared/valueObject/id'
import { Email } from '@/domain/@shared/valueObject/email'
import { Password } from '@/domain/@shared/valueObject/password'
import { ProfileFixture, createProfileFixture } from '../profileFixture'

describe('UpdateProfile', () => {
  let profilesFixture: ProfileFixture

  beforeEach(() => {
    profilesFixture = createProfileFixture()
  })

  test('when Alice update her profile, then it should be updated', () => {
    const aliceProfile = profileBuilder()
      .withFirstname('Alice')
      .withLastname('Doe')
      .withEmail('alice@doe.fr')
      .withId('alice-id')

    profilesFixture.givenProfilesExist([
      ProfileDTO.fromDomain(aliceProfile.build(), 'alice-password')
    ])

    profilesFixture.whenUserUpdateHisProfile({
      payload: new UpdateProfilePayload(
        Id.create('alice-id'),
        Email.create('alice@updated.fr'),
        'Doe (updated)',
        'Alice (updated)',
        Password.create('alice-password')
      )
    })

    profilesFixture.thenProfileShouldBe(
      aliceProfile
        .withLastname('Doe (updated)')
        .withFirstname('Alice (updated)')
        .withEmail('alice@updated.fr')
        .build()
    )
  })
})
