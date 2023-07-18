'use client'

import { DeleteIcon } from '@/assets/DeleteIcon'
import { useState } from 'react'

export default function CartPage () {
  return (
    <section
      id='cart'
      className='flex justify-between max-w-[1400px] mx-auto mt-20 relative'
    >
      <div className='w-[800px] px-[40px]'>
        <h1 className='text-section-title font-bold text-dark mb-8'>Panier</h1>
        <div className='flex w-full flex-col'>
          <div className='grid grid-cols-cart text-alt text-light uppercase font-medium w-full'>
            <div className='text-left'>
              <CustomCheckbox />
            </div>
            <p>Livres</p>
            <p className='text-center'>Quantité</p>
            <p className='text-right'>Prix</p>
          </div>
          <ul>
            <CartItem
              price={19.99}
              seller='Jean'
              title='Le livre de la jungle'
            />
          </ul>
        </div>
      </div>
    </section>
  )
}

type CartItemProps = {
  title: string
  seller: string
  price: number
  cover?: string
}

const CartItem = ({
  title,
  seller,
  price,
  cover = 'https://picsum.photos/200/300?item=1'
}: CartItemProps) => {
  return (
    <>
      <TableSeparator />
      <li className='grid grid-cols-cart w-full items-center py-6'>
        <div className='text-left'>
          <CustomCheckbox />
        </div>
        <div className='flex gap-x-4'>
          <div className='w-[80px] h-[80px] flex justify-center bg-blue-100 rounded-lg'>
            <img alt='test' src={cover} className='object-cover h-full' />
          </div>
          <div className='mt-1 flex-1'>
            <p className='text-dark text-default-desktop font-medium'>
              {title}
            </p>
            <p className='text-alt text-light font-medium'>
              Vendu par {seller}
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-y-1'>
          <CustomItemQuantity />
          <button className='flex items-center justify-center text-alt text-light gap-1'>
            <DeleteIcon /> Supprimer
          </button>
        </div>
        <p className='text-right text-dark text-default-desktop font-medium'>
          {price} €
        </p>
      </li>
    </>
  )
}

const CustomItemQuantity = () => {
  const [quantity, setQuantity] = useState(1)
  return (
    <div className='flex items-center justify-around w-[80px] border-light border rounded-lg py-1 px-2'>
      <button onClick={() => setQuantity(prev => prev - 1)}>-</button>
      <p className='font-medium'>{quantity}</p>
      <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
    </div>
  )
}

const TableSeparator = () => {
  return <div className='h-px w-full bg-light my-2'></div>
}

const CustomCheckbox = () => {
  return <div className='w-[20px] h-[20px] rounded border border-light'></div>
}
