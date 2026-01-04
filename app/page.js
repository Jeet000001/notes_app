import NotesClient from '@/components/NotesClient'
import dbConnect from '@/lib/db'

const page = async() => {
  await dbConnect()
  return (
    <div className='mx-auto p-4'>
      <h1 className='text-3xl font-black mb-6'>Notes App</h1>
      <NotesClient />
    </div>
  )
}

export default page