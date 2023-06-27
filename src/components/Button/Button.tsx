import { ReactNode } from 'react'

export default function Button ({
  children,
  className,
  type = 'button',
  disabled = false
}: {
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={
        'px-4 py-2 text-[14px] text-white bg-primary rounded-md disabled:opacity-40' +
        className
      }
    >
      {children}
    </button>
  )
}
