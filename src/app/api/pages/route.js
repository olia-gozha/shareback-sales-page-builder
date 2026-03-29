import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
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
    const body = await request.json()

    // Generate a URL-friendly slug from the company name
    // "Acme Corp" → "acme-corp"
    const slug = body.company_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const { data, error } = await supabaseAdmin
      .from('pages')
      .insert({
        slug,
        company_name: body.company_name,
        company_summary: body.company_summary || null,
        company_logo: body.company_logo || null,
      })
      .select()
      .single()

    if (error) {
      // If slug already exists, Supabase throws a unique constraint error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A page for this company already exists' },
          { status: 409 }
        )
      }
      throw error
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