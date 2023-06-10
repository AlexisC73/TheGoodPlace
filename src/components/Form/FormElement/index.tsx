const FormElement = ({
  label,
  name,
  type = 'text',
  currentValue,
}: {
  label: string
  name: string
  type?: string
  currentValue?: string | null
}) => {
  return (
    <div className='flex flex-col gap-y-2 w-full'>
      <label htmlFor={name}>{label}</label>
      <input
        className='bg-white border outline-none w-full h-[44px] rounded px-4'
        type={type}
        name={name}
        id={name}
        placeholder={currentValue ?? ''}
      />
    </div>
  )
}

export default FormElement
