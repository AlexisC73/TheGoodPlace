import CustomDetails from '@/components/CustomDetails'

const PriceFilter = () => {
  return (
    <CustomDetails name='Prix'>
      <div className='flex justify-center gap-4 py-4'>
        <div className='flex gap-2 items-center'>
          <span>€</span>
          <input
            type='number'
            placeholder='De'
            min='0'
            max='500'
            className='border rounded-md py-1 pl-2'
          />
        </div>
        <div className='flex gap-2 items-center'>
          <span>€</span>
          <input
            type='number'
            placeholder='à'
            min='0'
            max='500'
            className='border rounded-md py-1 pl-2'
          />
        </div>
      </div>
    </CustomDetails>
  )
}

export default PriceFilter
