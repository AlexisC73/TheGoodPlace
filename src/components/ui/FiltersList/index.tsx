import { PriceFilter, AuthorsFilter } from '@/components/Filters'

function FiltersList() {
  return (
    <div className='w-[280px]'>
      <div>
        <p>Filtrer par</p>
      </div>
      <PriceFilter />
      <CustomAuthorFilter />
    </div>
  )
}

export default FiltersList

const CustomAuthorFilter = () => {
  const fetchAuthors = ['J.K Rowling', 'Tolkien', 'Victor Hugo', 'Stephen King']

  return <AuthorsFilter authors={fetchAuthors} />
}
