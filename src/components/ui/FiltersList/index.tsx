import { PriceFilter, GendersFilter } from '@/components/Filters'

function FiltersList() {
  return (
    <div className='w-[280px]'>
      <div>
        <p>Filtrer par</p>
      </div>
      <PriceFilter />
      <CustomGenderFilter />
    </div>
  )
}

export default FiltersList

const CustomGenderFilter = () => {
  const fetchGenders = [
    'Fantaisie',
    'Policier',
    'Romance',
    'Science-fiction',
    'Thriller',
  ]

  return <GendersFilter authors={fetchGenders} />
}
