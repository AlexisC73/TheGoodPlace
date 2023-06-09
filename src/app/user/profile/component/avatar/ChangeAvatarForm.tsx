'use client'
import { DeleteIcon } from '@/assets/DeleteIcon'
import { UploadIcon } from '@/assets/UploadIcon'
import ChangeAvatarButton from '@/components/ChangeAvatarButton/ChangeAvatarButton'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const ChangeAvatarForm = () => {
  const { data: session, status } = useSession()
  const avatarUrl = session
    ? session.user
      ? session.user.avatarUrl
        ? session.user.avatarUrl
        : null
      : null
    : null

  if (status === 'loading') return null

  return (
    <div className='flex flex-col items-center gap-14 bg-gray-100 p-10 rounded-2xl'>
      <div className='w-20 h-20 rounded-full overflow-hidden flex items-center justify-center'>
        <Image
          height={80}
          width={80}
          src={
            avatarUrl ??
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
          className='object-cover h-full w-full'
          alt='avatar'
        />
      </div>

      <div className='flex gap-10'>
        <ChangeAvatarButton icon={<UploadIcon />} text="Modifier l'avatar" />
        <DeleteAvatarButton />
      </div>
    </div>
  )
}

export default ChangeAvatarForm

const DeleteAvatarButton = () => {
  const handleClick = () => {}
  return (
    <button
      onClick={handleClick}
      className='flex text-[14px] items-center gap-[10px] px-5 text-[#D13E3E] py-2 border border-[#C6CBD6] font-bold bg-white rounded-lg'
    >
      <div className='text-[20px]'>
        <DeleteIcon />
      </div>
      Supprimer l&apos;avatar
    </button>
  )
}
