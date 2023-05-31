import StarIcon from '@/assets/StarIcon'

const Rating = ({ rate }: { rate: number }) => {
  return (
    <div className='flex items-center gap-1 text-white bg-[#DFB009] w-[60px] h-[25px] justify-center rounded-full'>
      <span className='text-[1.1rem]'>
        <StarIcon />
      </span>
      <span className='mt-[2px] text-[15px]'>{rate}</span>
    </div>
  )
}

export default Rating
