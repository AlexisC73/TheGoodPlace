import Link from 'next/link'
import React from 'react'
import BreadcrumbSeparator from './BreadcrumbSeparator/BreadcrumbSeparator'
import BreadcrumbLink from './BreadcrumbLink/BreadcrumbLink'
import HomeIcon from '@/assets/Home'

function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { name: string; href: string }[]
}) {
  return (
    <nav aria-label='Breadcrumb' className='pl-4 xl:pl-0'>
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
            <div className='flex items-center' key={breadcrumb.href}>
              <BreadcrumbSeparator />
              <BreadcrumbLink label={breadcrumb.name} link={breadcrumb.href} />
            </div>
          ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
