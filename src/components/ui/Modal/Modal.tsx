import { CrossIcon } from '@/assets/Cross'

interface ModalProps {
  closeModal: () => void
  children?: React.ReactNode
}

export default function Modal ({ children, closeModal }: ModalProps) {
  return (
    <div className='bg-white relative z-10 p-8 rounded w-[500px]'>
      <button
        className='close-btn absolute text-[24px] right-4 text-[#B6B6B6] top-4'
        onClick={closeModal}
      >
        <CrossIcon />
      </button>
      <header className='pb-4 text-center text-[20px] text-black font-bold'>
        <h1>Me connecter</h1>
      </header>
      <div>{children}</div>
    </div>
  )
}
