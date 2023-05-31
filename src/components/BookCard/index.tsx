import AddCartIcon from '@/assets/AddCart'
import Link from 'next/link'
import Rating from '../Rating'

type BookCardInfo = {
  id: number
  title: string
  author: string
  publishedDate: Date
  price: number
  rate: number
  imageUrl: string
}

type BookCardProps = {
  bookInfo: BookCardInfo
}

const BookCard = ({ bookInfo }: BookCardProps) => {
  const { id, title, author, publishedDate, price, rate, imageUrl } = bookInfo
  return (
    <div className='rounded-[5px] overflow-hidden sm:w-[239px] h-48 sm:h-auto border flex sm:block w-full border-[#E9EDF3] relative'>
      <Link
        href={`/product/${id}`}
        className='sm:h-[183px] w-2/3 sm:w-auto flex overflow-hidden'
      >
        <img src={imageUrl} alt='book cover' className='object-cover' />
      </Link>
      <div className='py-5 px-3 sm:p-2 flex flex-col gap-4 w-full justify-between sm:justify-normal'>
        <div>
          <Link
            href={`/product/${id}`}
            className='text-[1.1rem] sm:text-[15px] hover:text-red-300 hover:underline'
          >
            {title}
          </Link>
          <div className='sm:text-[12px] flex items-center gap-2 text-[#5A5A5A]'>
            <p>{author}</p>
            <div className='dot-separator h-1 w-1 rounded-full bg-[#8E8E8E]'></div>
            <p>{publishedDate.getFullYear()}</p>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='sm:absolute top-2 right-2'>
            <Rating rate={rate} />
          </div>
          <Link href={`/product/${id}`} className='font-bold text-[20px]'>
            {price.toFixed(2)}€
          </Link>
          <AddCartIcon className='hidden sm:block text-[30px] cursor-pointer text-primary' />
        </div>
      </div>
    </div>
  )
}

export default BookCard
