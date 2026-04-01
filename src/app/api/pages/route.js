import { getSupabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { randomBytes } from 'node:crypto'

const SLUG_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'
const SLUG_LENGTH = 10
const MAX_SLUG_RETRIES = 5

function generateGibberishSlug() {
  const bytes = randomBytes(SLUG_LENGTH)
  let slug = ''

  for (const byte of bytes) {
    slug += SLUG_ALPHABET[byte % SLUG_ALPHABET.length]
  }

  return slug
}

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    const { data, error } = await supabaseAdmin
      .from('pages')
      .select('id, slug, company_name, status, edit_token')
      .order('company_name', { ascending: true })

    if (error) throw error

    const pages = (data || []).map((page) => ({
      ...page,
      editUrl: `/edit/${page.id}?token=${page.edit_token}`,
      publicUrl: `/p/${page.slug}`,
    }))

    return NextResponse.json({ pages })
  } catch (err) {
    console.error('List pages error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const body = await request.json()

    let data = null
    let lastError = null

    for (let attempt = 0; attempt < MAX_SLUG_RETRIES; attempt += 1) {
      const slug = generateGibberishSlug()

      const { data: insertedPage, error } = await supabaseAdmin
        .from('pages')
        .insert({
          slug,
          company_name: body.company_name,
          company_summary: body.company_summary || null,
          company_logo: body.company_logo || null,
        })
        .select()
        .single()

      if (!error) {
        data = insertedPage
        break
      }

      // Retry with a new random slug if we hit a slug uniqueness collision.
      if (error.code === '23505') {
        lastError = error
        continue
      }

      throw error
    }

    if (!data) {
      console.error('Create page error: failed to generate unique slug', lastError)
      return NextResponse.json(
        { error: 'Failed to generate a unique page URL. Please try again.' },
        { status: 500 }
      )
    }

    // Return the page data including edit_token and slug
    // so the salesperson gets both their edit link and the client link
    return NextResponse.json({
      page: data,
      editUrl: `/edit/${data.id}?token=${data.edit_token}`,
      publicUrl: `/p/${data.slug}`,
    })
  } catch (err) {
    console.error('Create page error:', err)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}