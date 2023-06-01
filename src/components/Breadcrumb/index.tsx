import Link from 'next/link'
import React from 'react'
import BreadcrumbSeparator from './BreadcrumbSeparator'
import BreadcrumbLink from './BreadcrumbLink'

function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { name: string; href: string }[]
}) {
  return (
    <nav aria-label='Breadcrumb'>
      <ol role='list' className='flex items-center gap-1 text-sm text-gray-600'>
        <li>
          <Link href='/' className='block transition hover:text-primary'>
            <span className='sr-only'> Home </span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </Link>
        </li>

        {!!breadcrumbs &&
          breadcrumbs.map((breadcrumb) => (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbLink
                key={breadcrumb.href}
                label={breadcrumb.name}
                link={breadcrumb.href}
              />
            </>
          ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
