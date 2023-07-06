import { ProfileDTO } from '@/infrastructure/@shared/dtos/profileDTO'
import { profileBuilder } from '../profileBuilder'
import { ProfileFixture, createProfileFixture } from '../profileFixture'
import { UpdateAvatarPayload } from '@/domain/profile/entities/payload/updateAvatarPayload'
import { Id } from '@/domain/@shared/valueObject/id'

describe('Update Avatar Use Case', () => {
  let profileFixture: ProfileFixture

  beforeEach(() => {
    profileFixture = createProfileFixture()
  })

  test('when Alice update her avatar, then profile should be updated', async () => {
    const alice = profileBuilder().withId('alice-id').build()
    profileFixture.givenProfilesExistInRemote([
      ProfileDTO.fromDomain(alice, 'alice-password')
    ])

    await profileFixture.whenUserUpdateProfileAvatar({
      payload: new UpdateAvatarPayload(Id.create('alice-id'), new FormData())
    })

    profileFixture.thenProfileShouldBe(
      profileBuilder()
        .withAvatarUrl(
          'https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-760x400.webp'
        )
        .withId('alice-id')
        .build()
    )
  })
})
