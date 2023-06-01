import Link from 'next/link'
import React from 'react'
import BreadcrumbSeparator from './BreadcrumbSeparator'
import BreadcrumbLink from './BreadcrumbLink'
import HomeIcon from '@/assets/Home'

function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { name: string; href: string }[]
}) {
  return (
    <nav aria-label='Breadcrumb'>
      <ol
        role='list'
        className='flex items-center gap-1 text-base sm:text-sm text-gray-600'
      >
        <li>
          <Link href='/' className='block transition hover:text-primary'>
            <span className='sr-only'> Home </span>

            <HomeIcon className='text-xl' />
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
