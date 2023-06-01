import Logo from '@/assets/Logo'
import Link from 'next/link'
import React from 'react'

function Brand() {
  return (
    <Link href={'/'} className='flex items-center gap-3'>
      <div className='h-[42px] w-[42px] rounded-full flex items-center justify-center bg-primary'>
        <Logo className='text-white text-[24px]' />
      </div>
      <p className='font-bold text-[20px]'>TheBookPlace</p>
    </Link>
  )
}

export default Brand
