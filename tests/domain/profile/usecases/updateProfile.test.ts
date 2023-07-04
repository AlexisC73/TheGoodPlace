import { profileBuilder } from '../profileBuilder'
import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { Id } from '@/domain/@shared/valueObject/id'
import { Email } from '@/domain/@shared/valueObject/email'
import { Password } from '@/domain/@shared/valueObject/password'
import { ProfileFixture, createProfileFixture } from '../profileFixture'
import { Name } from '@/domain/@shared/valueObject/name'

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

    profilesFixture.givenProfilesExistInRemote([
      ProfileDTO.fromDomain(aliceProfile.build(), 'alice-password')
    ])

    profilesFixture.whenUserUpdateHisProfile({
      payload: new UpdateProfilePayload(
        Id.create('alice-id'),
        Password.create('alice-password'),
        {
          email: Email.create('alice@updated.fr'),
          lastname: Name.create('Doe-updated'),
          firstname: Name.create('Alice-updated')
        }
      )
    })

    profilesFixture.thenProfileShouldBe(
      aliceProfile
        .withLastname('Doe-updated')
        .withFirstname('Alice-updated')
        .withEmail('alice@updated.fr')
        .build()
    )
  })

  test('when Alice update only a part of her profile, then it should be updated', () => {
    const aliceProfile = profileBuilder()
      .withFirstname('Alice')
      .withLastname('Doe')
      .withEmail('alice@doe.fr')
      .withId('alice-id')

    profilesFixture.givenProfilesExistInRemote([
      ProfileDTO.fromDomain(aliceProfile.build(), 'alice-password')
    ])

    profilesFixture.whenUserUpdateHisProfile({
      payload: new UpdateProfilePayload(
        Id.create('alice-id'),
        Password.create('alice-password'),
        {
          email: Email.create('alice@updated.fr')
        }
      )
    })

    profilesFixture.thenProfileShouldBe(
      aliceProfile.withEmail('alice@updated.fr').build()
    )
  })
})
