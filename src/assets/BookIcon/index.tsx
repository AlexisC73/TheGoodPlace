import React from 'react'

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='1em'
      height='1.23em'
      viewBox='0 0 17 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M1.5 7C1.5 4.5255 1.5 3.28738 2.26913 2.51913C3.03738 1.75 4.2755 1.75 6.75 1.75H10.25C12.7245 1.75 13.9626 1.75 14.7309 2.51913C15.5 3.28738 15.5 4.5255 15.5 7V14C15.5 16.4745 15.5 17.7126 14.7309 18.4809C13.9626 19.25 12.7245 19.25 10.25 19.25H6.75C4.2755 19.25 3.03738 19.25 2.26913 18.4809C1.5 17.7126 1.5 16.4745 1.5 14V7Z'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path
        d='M15.4108 14H4.91075C4.097 14 3.69012 14 3.35587 14.0892C2.91077 14.2086 2.50493 14.443 2.17916 14.769C1.85338 15.0949 1.61914 15.5008 1.5 15.946'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path
        d='M5 6.125H12M5 9.1875H9.375'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default BookIcon
