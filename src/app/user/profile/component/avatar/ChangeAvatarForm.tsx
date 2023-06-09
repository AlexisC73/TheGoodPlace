'use client'

import { DeleteIcon } from '@/assets/DeleteIcon'
import { UploadIcon } from '@/assets/UploadIcon'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import FormButton from './FormButton/FormButton'
import { ChangeEvent, FormEventHandler, useRef } from 'react'
import { fetchAvatarUrl } from '@/utils/avatar'

const ChangeAvatarForm = () => {
  const { data: session, status, update } = useSession()
  const hiddenInputFile = useRef<HTMLInputElement>(null)

  const avatarUrl = session
    ? session.user
      ? session.user.avatarUrl
        ? session.user.avatarUrl
        : null
      : null
    : null

  if (status === 'loading') return null

  const handleClick = () => {
    hiddenInputFile.current?.click()
  }

  const handleSubmitNewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files) {
      return
    }
    if (!e.target.files[0]) {
      return
    }

    const sendImage = new FormData()
    sendImage.append('image', e.target.files[0], e.target.files[0].name)

    fetch('http://localhost:5500/user/avatar', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: sendImage,
    }).then(async (res) => {
      if (res.ok) {
        update({
          avatarUrl: await fetchAvatarUrl(),
        })
      }
    })
  }

  return (
    <div className='flex flex-col items-center gap-y-8 sm:h-[250px] bg-[#F6F7F9] p-10 rounded-2xl'>
      <div className='w-[88px] h-[88px] rounded-full overflow-hidden flex items-center justify-center'>
        <Image
          height={88}
          width={88}
          src={
            avatarUrl ??
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
          action={() => {
            console.log('delete')
          }}
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

export default ChangeAvatarForm
