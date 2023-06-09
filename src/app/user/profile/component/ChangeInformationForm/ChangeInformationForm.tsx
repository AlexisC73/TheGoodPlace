import Button from '@/components/Button/Button'
import React, { PropsWithChildren } from 'react'

function ChangeInformationForm({
  children,
  submitLabel,
  icon,
  sectionTitle,
}: PropsWithChildren & {
  submitLabel: string
  icon?: React.ReactNode
  sectionTitle: string
}) {
  return (
    <div className='flex flex-col gap-y-6'>
      <h2 className='font-bold'>{sectionTitle}</h2>
      <form className='flex flex-col gap-y-6'>
        <div className='grid grid-cols-2 gap-x-20 gap-y-6 text-[14px]'>
          {children}
        </div>
        <Button className='self-start'>
          <div className='flex items-center gap-x-2'>
            {icon && <span className='text-[25px]'>{icon}</span>}
            {submitLabel}
          </div>
        </Button>
      </form>
    </div>
  )
}

export default ChangeInformationForm
