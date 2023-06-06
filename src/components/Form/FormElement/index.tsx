const FormElement = ({
  label,
  name,
  type = 'text',
}: {
  label: string
  name: string
  type?: string
}) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={name}>{label}</label>
      <input
        className='bg-white border outline-none w-full h-[40px] rounded px-4'
        type={type}
        name={name}
        id={name}
      />
    </div>
  )
}

export default FormElement
