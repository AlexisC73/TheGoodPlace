'use client'

import CartLogo from '@/assets/CartLogo'
import React from 'react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import LogoutIcon from '@/assets/LogoutIcon/LogoutIcon'

function UserInfo() {
  const { data: session } = useSession()
  if (!session) return null
  const handleLogout = () => {
    signOut()
  }
  return (
    <div className='flex items-center gap-8 min-w-[124px] justify-end max-xl:pr-3'>
      <CartLogo className='text-[22px] text-primary' />
      <LogoutIcon
        onClick={handleLogout}
        className='text-primary text-[22px] cursor-pointer'
      />
      <div className='separator h-7 w-[2px] hidden sm:block bg-[#E9EDF3]'></div>
      <AvatarImage src={session.user.avatarUrl} />
    </div>
  )
}

export default UserInfo

const AvatarImage = ({ src }: { src: string | null | undefined }) => {
  const imageLink = src
    ? src.length <= 0
      ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      : src
    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

  return (
    <Link
      href={'/user/profile'}
      className='cursor-pointer w-[42px] h-[42px] rounded-full overflow-hidden flex items-center justify-center'
    >
      <Image
        height={42}
        width={42}
        src={imageLink}
        alt='avatar'
        className='object-cover h-full w-full'
      />
    </Link>
  )
}
