'use client'
import CheckIcon from '@/assets/CheckIcon'

const CustomCheckbox = ({
  checked,
  name,
  onChange,
}: {
  checked?: boolean
  name: string
  onChange: (e: any) => void
}) => {
  const customClass = `flex items-center h-4 w-4 rounded border border-primary ${
    checked && 'bg-blue-100'
  }`
  return (
    <div className={customClass} onClick={onChange}>
      <input
        tabIndex={0}
        id={name}
        type='checkbox'
        className='hidden'
        onChange={onChange}
      />
      <CheckIcon
        className={`text-[20px] text-primary ${!checked && 'hidden'}`}
      />
    </div>
  )
}

export default CustomCheckbox
