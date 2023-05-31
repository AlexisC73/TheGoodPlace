'use client'

import { useState } from 'react'
import CustomDetails from '../../CustomDetails'
import CustomCheckbox from '../../CustomCheckbox'

function GenderFilter({ authors }: { authors: string[] }) {
  const [gendersFilter, setGendersFilter] = useState<
    { name: string; selected: boolean }[]
  >([...authors].map((author) => ({ name: author, selected: false })))

  const handleToggleGender = (name: string) => {
    setGendersFilter((prev) =>
      prev.map((gender) => {
        if (gender.name === name) {
          return { ...gender, selected: !gender.selected }
        }
        return gender
      })
    )
  }

  const selectedGender = gendersFilter.reduce((acc: string[], gender) => {
    if (gender.selected) {
      return [...acc, gender.name]
    }
    return acc
  }, [])

  return (
    <CustomDetails name='Gender'>
      <div className='flex flex-col px-5 pt-3 border-t'>
        {gendersFilter.map((gender) => (
          <div key={gender.name} className='flex items-center mb-4 gap-x-2'>
            <CustomCheckbox
              name={gender.name}
              checked={gender.selected}
              onChange={(e) => {
                e.preventDefault()
                handleToggleGender(gender.name)
              }}
            />
            <label htmlFor={gender.name}>{gender.name}</label>
          </div>
        ))}
      </div>
    </CustomDetails>
  )
}

export default GenderFilter
