import BookIcon from '@/assets/BookIcon'
import React from 'react'

function SelectCategory({ type }: { type: 'book' }) {
  const content = type === 'book' ? { name: 'Livre', icon: <BookIcon /> } : {}

  return (
    <div className='flex items-center text-[#5A5A5A] gap-2'>
      {content.icon}
      <span>{content.name}</span>
    </div>
  )
}

export default SelectCategory
