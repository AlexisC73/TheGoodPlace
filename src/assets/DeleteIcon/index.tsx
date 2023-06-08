import { SVGProps } from 'react'

export function DeleteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
      ></path>
    </svg>
  )
}
