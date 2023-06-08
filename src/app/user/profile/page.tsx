import ChangeAvatarForm from './component/avatar/ChangeAvatarForm'

export default async function Profile() {
  return (
    <main>
      <section className='max-w-[750px] mx-auto'>
        <h1>Réglage du profile</h1>
        <ChangeAvatarForm />
      </section>
    </main>
  )
}
