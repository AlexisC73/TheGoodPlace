import FormElement from '../FormElement'

export default function SignupForm() {
  return (
    <form className='flex flex-col'>
      <div className='flex flex-col gap-[20px]'>
        <FormElement label="Nom d'utilisateur" name='username' />
        <FormElement label='Addresse email' name='email' type='email' />
        <FormElement label='Mot de passe' name='password' type='password' />
        <FormElement
          label='Vérification du mot de passe'
          name='password-verif'
          type='password'
        />
      </div>
      <span className='underline text-[#606060] text-[14px] mt-2'>
        Mot de passe oublié ?
      </span>
      <button
        className='bg-primary h-[40px] self-center px-20 rounded mt-6 text-white'
        type='submit'
      >
        M&apos;inscrire
      </button>
    </form>
  )
}
