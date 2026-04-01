import { getSupabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EditForm from './EditForm'

async function getPage(id) {
  const supabaseAdmin = getSupabaseAdmin()
  const { data, error } = await supabaseAdmin
    .from('pages')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data
}

export default async function EditPage({ params, searchParams }) {
  const { id } = await params
  const { token } = await searchParams

  const page = await getPage(id)

  if (!page) notFound()
  if (page.edit_token !== token) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-500">Invalid edit link.</p>
      </main>
    )
  }

  return (
    <div className='px-9 py-4'>
      <EditForm page={page} />
    </div>
  )
}