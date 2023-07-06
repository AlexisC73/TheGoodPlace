'use client'

import FormButton from '@/components/Form/FormButton/FormButton'
import { AuthProviderContext } from '@/application/auth/contexts/AuthProvider'
import { UpdateAvatarProviderContext } from '@/application/profile/contexts/updateAvatar'
import { DeleteIcon } from '@/assets/DeleteIcon'
import { UploadIcon } from '@/assets/UploadIcon'
import { Id } from '@/domain/@shared/valueObject/id'
import { UpdateAvatarPayload } from '@/domain/profile/entities/payload/updateAvatarPayload'
import Image from 'next/image'
import { ChangeEvent, useContext, useRef } from 'react'
import { ProfileProviderContext } from '@/application/auth/contexts/ProfileProvider'

const UpdateAvatarForm = () => {
  const hiddenInputFile = useRef<HTMLInputElement>(null)
  const { auth } = useContext(AuthProviderContext)
  const { profile } = useContext(ProfileProviderContext)
  const { updateAvatar } = useContext(UpdateAvatarProviderContext)

  const handleClick = () => {
    hiddenInputFile.current?.click()
  }

  const handleSubmitNewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files || !auth) {
      return
    }
    if (!e.target.files[0]) {
      return
    }

    const sendImage = new FormData()
    sendImage.append('avatar', e.target.files[0], e.target.files[0].name)

    const payload = new UpdateAvatarPayload(Id.create(auth.id), sendImage)
    updateAvatar(payload)
  }

  const handleDeleteAvatar = () => {
    console.log('delete avatar')
  }

  return (
    <div className='flex flex-col items-center gap-y-8 sm:h-[250px] bg-[#F6F7F9] p-10 rounded-2xl'>
      <div className='w-[88px] h-[88px] rounded-full overflow-hidden flex items-center justify-center'>
        <Image
          height={88}
          width={88}
          src={
            profile?.avatarUrl ??
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
          className='object-cover h-full w-full'
          alt='avatar'
        />
      </div>

      <div className='flex gap-x-10 flex-col sm:flex-row gap-y-3'>
        <FormButton
          className='order-2 sm:order-1'
          style={'danger'}
          icon={<DeleteIcon />}
          action={handleDeleteAvatar}
        >
          Supprimer l&apos;avatar
        </FormButton>
        <div className='order-1'>
          <FormButton action={handleClick} type='button' icon={<UploadIcon />}>
            Modifier l&apos;avatar
          </FormButton>
          <input
            accept='image/*'
            ref={hiddenInputFile}
            type='file'
            id='image'
            name='image'
            className='hidden'
            onChange={handleSubmitNewAvatar}
          />
        </div>
      </div>
    </div>
  )
}

export default UpdateAvatarForm
