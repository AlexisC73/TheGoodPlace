import AddCartIcon from '@/assets/AddCart'
import Link from 'next/link'
import { BookModel } from '../../../../application/catalog/models/bookModel'
import Rating from '@/components/Rating'

type BookCardProps = {
  bookInfo: BookModel
}

const BookCard = ({ bookInfo }: BookCardProps) => {
  const { id, title, author, publicationYear, price, rate, cover } = bookInfo
  return (
    <div className='rounded-[5px] overflow-hidden h-48 sm:h-full sm:w-[239px] border flex sm:flex-col w-full border-[#E9EDF3] relative'>
      <Link
        href={`/product/${id}`}
        className='sm:h-[183px] w-[150px] sm:w-auto flex overflow-hidden items-center sm:justify-center sm:bg-blue-100'
      >
        <img
          src={cover}
          alt='book cover'
          className='object-cover w-full sm:w-auto h-full'
        />
      </Link>
      <div className='py-5 px-3 sm:p-2 flex flex-col gap-4 w-full flex-1 justify-between sm:justify-normal'>
        <div className='flex-1'>
          <Link
            href={`/product/${id}`}
            className='text-[1.1rem] sm:text-[15px] hover:text-red-300 hover:underline'
          >
            {title}
          </Link>
          <div className='sm:text-[12px] flex items-center gap-2 text-[#5A5A5A]'>
            <p>{author}</p>
            <div className='dot-separator h-1 w-1 rounded-full bg-[#8E8E8E]'></div>
            <p>{publicationYear}</p>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='sm:absolute top-2 right-2'>
            <Rating rate={rate} />
          </div>
          <Link href={`/product/${id}`} className='font-bold text-[20px]'>
            {price}€
          </Link>
          <AddCartIcon className='hidden sm:block text-[30px] cursor-pointer text-primary' />
        </div>
      </div>
    </div>
  )
}

export default BookCard
