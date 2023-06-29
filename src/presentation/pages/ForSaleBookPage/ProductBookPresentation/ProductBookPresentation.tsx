'use client'

import { BookModel } from '../../../../application/catalog/models/bookModel'
import Rating from '@/components/Rating'
import { useState } from 'react'

type ProductBookPresentationProps = {
  productBookInfo: BookModel['data']
}

const ProductBookPresentation = ({
  productBookInfo
}: ProductBookPresentationProps) => {
  const [readMore, setReadMore] = useState(false)
  const toggleReadMore = () => setReadMore(prev => !prev)

  const { cover, title, author, publicationYear, rate, price, description } =
    productBookInfo

  return (
    <div className='xl:flex gap-8 max-xl:justify-center'>
      <div className='flex xl:aspect-square sm:max-xl:w-[500px] mx-auto flex-1 xl:h-[500px] px-10'>
        <img
          className='object-cover mx-auto h-[500px] xl:w-auto'
          src={cover}
          alt='product'
        />
      </div>

      <div className='flex flex-col gap-1 mt-4 p-4 xl:w-[600px]'>
        <div className='sm:order-1'>
          <h1 className='text-[24px] font-bold'>{title}</h1>
          <div className='text-[15px] flex gap-1 items-center text-[#5A5A5A]'>
            <span>{author}</span>
            <div className='dot-separator h-[6px] w-[6px] rounded-full bg-[#8E8E8E]'></div>
            <span>{publicationYear}</span>
          </div>
        </div>
        <div className='py-4 sm:order-2'>
          <Rating rate={rate} />
        </div>
        <div className='flex justify-between sm:order-4'>
          <span>Prix:</span>
          <p className='text-[20px] font-bold'>{price}€</p>
        </div>

        <div className='flex gap-5 mt-2 sm:order-5'>
          <input
            className='border-2 w-14 h-16 rounded-md text-center'
            value={1}
            onChange={e => console.log(e.target.value)}
            type='number'
          />
          <button className='h-16 w-full bg-primary text-white rounded-md'>
            Ajouter au panier
          </button>
        </div>
        <div className='py-12 sm:order-3 xl:flex-1'>
          <p className='text-justify'>
            {readMore ? description : description.slice(0, 200) + '...'}
          </p>
          <button onClick={toggleReadMore} className='underline text-primary'>
            En voir {readMore ? 'moins' : 'plus'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductBookPresentation
