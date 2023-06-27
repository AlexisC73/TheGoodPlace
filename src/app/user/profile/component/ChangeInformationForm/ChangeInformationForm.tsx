import Button from '@/components/Button/Button'
import React, { PropsWithChildren } from 'react'

function ChangeInformationForm ({
  children,
  submitLabel,
  icon,
  sectionTitle,
  onSubmit,
  canSubmit = true
}: PropsWithChildren & {
  submitLabel: string
  icon?: React.ReactNode
  sectionTitle: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
  canSubmit?: boolean
}) {
  return (
    <div className='flex flex-col gap-y-6'>
      <h2 className='font-bold'>{sectionTitle}</h2>
      <form onSubmit={onSubmit} className='flex flex-col gap-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-6 text-[14px]'>
          {children}
        </div>
        <Button disabled={canSubmit} className='sm:self-start' type='submit'>
          <div className='flex items-center h-10 sm:h-8 justify-center gap-x-2'>
            {icon && <span className='text-[25px]'>{icon}</span>}
            {submitLabel}
          </div>
        </Button>
      </form>
    </div>
  )
}

export default ChangeInformationForm
