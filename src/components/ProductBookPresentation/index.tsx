'use client'

import Rating from '../Rating'
import { useState } from 'react'

type ProductBookPresentationProps = {
  productBookInfo: ProductBookInfo
}

type ProductBookInfo = {
  id: string
  imageUrl: string
  title: string
  author: string
  publicationDate: Date
  rate: number
  price: number
  description: string
}

const ProductBookPresentation = ({
  productBookInfo,
}: ProductBookPresentationProps) => {
  const [readMore, setReadMore] = useState(false)
  const toggleReadMore = () => setReadMore((prev) => !prev)

  const {
    id,
    imageUrl,
    title,
    author,
    publicationDate,
    rate,
    price,
    description,
  } = productBookInfo

  return (
    <div className='xl:flex gap-8 max-xl:justify-center'>
      <div className='w-auto flex aspect-square max-xl:w-[500px] mx-auto'>
        <img className='object-cover' src={imageUrl} alt='product' />
      </div>

      <div className='flex flex-col gap-1 mt-4 p-4 xl:max-w-[700px]'>
        <div className='sm:order-1'>
          <h1 className='text-[24px] font-bold'>{title}</h1>
          <div className='text-[15px] flex gap-1 items-center text-[#5A5A5A]'>
            <span>{author}</span>
            <div className='dot-separator h-[6px] w-[6px] rounded-full bg-[#8E8E8E]'></div>
            <span>{publicationDate.getFullYear()}</span>
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
