import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import ClientPage from './ClientPage'

// This runs on the server at request time
async function getPage(slug) {
  // Ensure this route is rendered at request time (avoids build-time prerendering)
  // so edits in Supabase are reflected immediately.
  await connection()

  const { data, error } = await supabaseAdmin
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  // Strip the edit token — never expose it publicly
  const { edit_token, ...publicData } = data
  return publicData
}

function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return {
      title: 'Page not found',
      description: 'Pitch page not found',
    }
  }

  const title = page.company_name
    ? `Shareback pitch for ${page.company_name}`
    : 'Shareback Pitch'
  const description = stripHtml(page.company_summary).slice(0, 160) || 'Bring AI to your business with Shareback.';
  const image = '/sb-og-image.png'
  const canonicalPath = `/p/${page.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.company_name || 'Shareback Pitch',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return <ClientPage page={page} />
}