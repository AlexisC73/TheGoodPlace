import { ReactNode } from 'react'

export default function Button({
  children,
  className,
  role = 'button',
}: {
  children: ReactNode
  className?: string
  role?: 'button' | 'submit' | 'reset'
}) {
  return (
    <button
      type={role}
      className={
        'px-4 py-2 text-[14px] text-white bg-primary rounded-md ' + className
      }
    >
      {children}
    </button>
  )
}
