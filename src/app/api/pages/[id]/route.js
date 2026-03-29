import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Missing edit token' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('pages')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    if (data.edit_token !== token) {
      return NextResponse.json(
        { error: 'Invalid edit token' },
        { status: 403 }
      )
    }

    return NextResponse.json({ page: data })
  } catch (err) {
    console.error('Fetch page by id error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { token, ...fields } = body

    // Verify the edit token — this is our "auth"
    const { data: page } = await supabaseAdmin
      .from('pages')
      .select('edit_token')
      .eq('id', id)
      .single()

    if (!page || page.edit_token !== token) {
      return NextResponse.json(
        { error: 'Invalid edit token' },
        { status: 403 }
      )
    }

    // Update only the fields that were sent
    const { data, error } = await supabaseAdmin
      .from('pages')
      .update(fields)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ page: data })
  } catch (err) {
    console.error('Update page error:', err)
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}