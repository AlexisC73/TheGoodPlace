import SearchIcon from '@/assets/SearchIcon'
import SelectCategory from './SelectCategory'

function SearchBar() {
  return (
    <div className='flex border-[#E9EDF3] border-2 rounded-full items-center gap-[10px] sm:gap-[30px] pl-3 xl:pl-6 xl:w-[700px] max-xl:w-full max-sm:h-12 max-xl:h-16 max-xl:border-r-transparent max-xl:border-l-transparent max-xl:rounded-none'>
      <SelectCategory type='book' />
      <div className='separator h-8 bg-[#E9EDF3] w-[2px]'></div>
      <form className='flex w-full'>
        <input
          type='text'
          role='search'
          aria-roledescription='search'
          placeholder='Tapez votre recherche.'
          className='outline-none flex-1'
        />
        <button className='bg-primary hidden xl:block text-white px-[1rem] py-[13px] rounded-full scale-[1.03]'>
          Rechercher
        </button>
        <button className='text-primary text-[26px] max-sm:hidden xl:hidden pr-4'>
          <SearchIcon />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
