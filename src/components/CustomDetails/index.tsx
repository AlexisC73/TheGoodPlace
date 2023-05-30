import ArrowDownIcon from '@/assets/ArrowDownIcon'
import React, { PropsWithChildren } from 'react'

const CustomDetails = ({
  children,
  name,
}: PropsWithChildren & { name: string }) => {
  return (
    <details className='border flex flex-col overflow-hidden rounded-lg'>
      <summary className='flex items-center flex-1 justify-between h-[44px] px-5 cursor-pointer'>
        <span>{name}</span>
        <span>
          <ArrowDownIcon className='text-[7px]' />
        </span>
      </summary>
      {children}
    </details>
  )
}

export default CustomDetails
