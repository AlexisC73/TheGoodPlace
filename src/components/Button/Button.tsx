import { ReactNode } from 'react'

export default function Button({
  children,
  className,
  type = 'button',
}: {
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}) {
  return (
    <button
      type={type}
      className={
        'px-4 py-2 text-[14px] text-white bg-primary rounded-md ' + className
      }
    >
      {children}
    </button>
  )
}
