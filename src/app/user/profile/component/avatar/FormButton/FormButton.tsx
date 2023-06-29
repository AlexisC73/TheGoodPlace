import React from 'react'

function FormButton ({
  action,
  style = 'default',
  icon,
  children,
  className,
  type
}: {
  action: () => void
  style?: 'default' | 'danger'
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}) {
  const customClassName =
    style === 'default' ? 'text-primary' : 'text-[#D13E3E]'
  return (
    <button
      onClick={action}
      type={type}
      className={
        className +
        ' flex text-[14px] items-center gap-[10px] px-5 py-2 border border-[#C6CBD6] font-bold bg-white rounded-lg ' +
        customClassName
      }
    >
      <div className='text-[20px]'>{icon}</div>
      {children}
    </button>
  )
}

export default FormButton
