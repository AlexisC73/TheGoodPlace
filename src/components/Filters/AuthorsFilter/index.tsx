'use client'

import { useState } from 'react'
import CustomDetails from '../../CustomDetails'
import CustomCheckbox from '../../CustomCheckbox'

function AuthorsFilter({ authors }: { authors: string[] }) {
  const [authorsFilter, setAuthorsFilter] = useState<
    { name: string; selected: boolean }[]
  >([...authors].map((author) => ({ name: author, selected: false })))

  const handleToggleAuthor = (name: string) => {
    setAuthorsFilter((prev) =>
      prev.map((author) => {
        if (author.name === name) {
          return { ...author, selected: !author.selected }
        }
        return author
      })
    )
  }

  const selectedAuthors = authorsFilter.reduce((acc: string[], author) => {
    if (author.selected) {
      return [...acc, author.name]
    }
    return acc
  }, [])

  return (
    <CustomDetails name='Auteur'>
      <div className='flex flex-col px-5 pt-3 border-t'>
        {authorsFilter.map((author) => (
          <div key={author.name} className='flex items-center mb-4 gap-x-2'>
            <CustomCheckbox
              name={author.name}
              checked={author.selected}
              onChange={(e) => {
                e.preventDefault()
                handleToggleAuthor(author.name)
              }}
            />
            <label htmlFor={author.name}>{author.name}</label>
          </div>
        ))}
      </div>
    </CustomDetails>
  )
}

export default AuthorsFilter
