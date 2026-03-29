import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { logoUrl, pageId } = await request.json()

    // Download the image from the provided URL
    const imageResponse = await fetch(logoUrl)

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: 'Could not download image from that URL' },
        { status: 400 }
      )
    }

    const contentType = imageResponse.headers.get('content-type') || 'image/png'
    const extension = contentType.includes('svg') ? 'svg'
      : contentType.includes('png') ? 'png'
      : contentType.includes('webp') ? 'webp'
      : 'jpg'

    const imageBuffer = await imageResponse.arrayBuffer()
    const fileName = `${pageId}.${extension}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('logos')
      .upload(fileName, imageBuffer, {
        contentType,
        upsert: true, // overwrite if the salesperson changes the logo later
      })

    if (uploadError) throw uploadError

    // Get the public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('logos')
      .getPublicUrl(fileName)

    // Save the permanent URL to the page record
    const { error: updateError } = await supabaseAdmin
      .from('pages')
      .update({ company_logo: urlData.publicUrl })
      .eq('id', pageId)

    if (updateError) throw updateError

    return NextResponse.json({ logoUrl: urlData.publicUrl })
  } catch (err) {
    console.error('Logo upload error:', err)
    return NextResponse.json(
      { error: 'Failed to upload logo' },
      { status: 500 }
    )
  }
}