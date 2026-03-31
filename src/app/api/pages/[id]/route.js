import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

function nullIfEmptyString(value) {
  return value === '' ? null : value
}

function normalizeUpdateFields(fields) {
  const normalized = { ...fields }

  if (typeof normalized.company_name === 'string') {
    normalized.company_name = normalized.company_name.trim()
  }

  // Common scalar text fields: store empty string as NULL
  for (const key of [
    'company_summary',
    'company_logo',
    'talk_summary',
    'action_label',
    'action_link',
  ]) {
    if (key in normalized) {
      normalized[key] = nullIfEmptyString(normalized[key])
    }
  }

  // Dates: empty string -> NULL (avoids Postgres invalid input syntax for type date)
  if ('next_step_date' in normalized) {
    normalized.next_step_date = nullIfEmptyString(normalized.next_step_date)
  }

  // Numbers: empty string -> NULL, otherwise coerce to number
  for (const key of ['investment_people', 'investment_price']) {
    if (!(key in normalized)) continue

    const value = normalized[key]
    if (value === '' || value === null || typeof value === 'undefined') {
      normalized[key] = null
      continue
    }

    const numberValue = typeof value === 'number' ? value : Number(value)
    if (!Number.isFinite(numberValue)) {
      const err = new Error(`Invalid number for ${key}`)
      err.statusCode = 400
      throw err
    }
    normalized[key] = numberValue
  }

  // Arrays of strings: trim + drop empties
  for (const key of ['features', 'investment_features']) {
    if (!Array.isArray(normalized[key])) continue
    normalized[key] = normalized[key]
      .map((item) => (typeof item === 'string' ? item.trim() : item))
      .filter((item) => (typeof item === 'string' ? item.length > 0 : Boolean(item)))
  }

  // Team: drop fully empty rows (common when UI keeps a placeholder item)
  if (Array.isArray(normalized.team)) {
    normalized.team = normalized.team
      .map((member) => {
        if (!member || typeof member !== 'object') return member
        return {
          ...member,
          full_name: typeof member.full_name === 'string' ? member.full_name.trim() : member.full_name,
          role: typeof member.role === 'string' ? member.role.trim() : member.role,
          ai_focus: typeof member.ai_focus === 'string' ? member.ai_focus.trim() : member.ai_focus,
          description: typeof member.description === 'string' ? member.description.trim() : member.description,
        }
      })
      .filter((member) => {
        if (!member || typeof member !== 'object') return Boolean(member)
        return Boolean(
          member.full_name ||
            member.role ||
            member.ai_focus ||
            member.description
        )
      })
  }

  return normalized
}

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

    const normalizedFields = normalizeUpdateFields(fields)
    if (
      'company_name' in normalizedFields &&
      (!normalizedFields.company_name || !String(normalizedFields.company_name).trim())
    ) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }

    // Update only the fields that were sent
    const { data, error } = await supabaseAdmin
      .from('pages')
      .update(normalizedFields)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ page: data })
  } catch (err) {
    console.error('Update page error:', err)

    const status = err?.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500
    const showDetails = process.env.NODE_ENV !== 'production'

    return NextResponse.json(
      {
        error: status === 400 ? err.message : 'Failed to update page',
        ...(showDetails
          ? {
              details: err?.details || err?.message,
              hint: err?.hint,
              code: err?.code,
            }
          : null),
      },
      { status }
    )
  }
}