import Link from 'next/link'
import React from 'react'

function BreadcrumbLink({ link, label }: { link: string; label: string }) {
  return (
    <li>
      <Link href={link} className='block transition hover:text-primary'>
        {label}
      </Link>
    </li>
  )
}

export default BreadcrumbLink
