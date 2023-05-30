import Brand from '@/components/brand'
import SearchBar from './SearchBar'
import CartLogo from '@/assets/CartLogo'
import Image from 'next/image'

function Header() {
  return (
    <header className='flex gap-y-4 items-center justify-between xl:px-6 py-3 max-xl:grid max-xl:grid-cols-header xl:border-b-2'>
      <div className='max-xl:pl-3'>
        <Brand />
      </div>

      <div className='max-xl:order-1 col-span-2'>
        <SearchBar />
      </div>
      <div className='flex items-center gap-8 min-w-[124px] justify-end max-xl:pr-3'>
        <CartLogo className='text-[22px] text-primary' />
        <div className='separator h-7 w-[2px] hidden sm:block bg-[#E9EDF3]'></div>
        <AvatarImage />
      </div>
    </header>
  )
}

export default Header

const AvatarImage = () => {
  return (
    <div>
      <Image
        height={42}
        width={42}
        src='https://sm.ign.com/ign_fr/cover/a/avatar-gen/avatar-generations_bssq.jpg'
        alt='avatar'
        className='rounded-full'
      />
    </div>
  )
}
