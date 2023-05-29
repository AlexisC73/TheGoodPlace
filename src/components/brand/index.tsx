import Logo from '@/assets/Logo'
import React from 'react'

function Brand() {
  return (
    <div className='flex items-center gap-3'>
      <div className='h-[42px] w-[42px] rounded-full flex items-center justify-center bg-primary'>
        <Logo className='text-white text-[24px]' />
      </div>
      <p className='font-bold text-[20px]'>TheBookPlace</p>
    </div>
  )
}

export default Brand
