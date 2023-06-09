'use client'

import { fetchAvatarUrl } from '@/utils/avatar'
import { useSession } from 'next-auth/react'
import { ChangeEvent, FormEventHandler, useRef } from 'react'

export default function ChangeAvatarButton({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: string
}) {
  const { data: session, update } = useSession()
  const hiddenInputFile = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

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
    if (!session) {
      return
    }

    formRef.current?.requestSubmit()
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const sendImage = new FormData(formRef.current!)

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
    <form onSubmit={handleSubmit} ref={formRef}>
      <button
        onClick={handleClick}
        type='button'
        className='flex text-[14px] items-center gap-[10px] px-5 text-primary py-2 border border-[#C6CBD6] font-bold bg-white rounded-lg'
      >
        <div className='text-[20px]'>{icon}</div>
        {text}
      </button>
      <input
        accept='image/*'
        ref={hiddenInputFile}
        type='file'
        id='image'
        name='image'
        className='hidden'
        onChange={handleSubmitNewAvatar}
      />
    </form>
  )
}
