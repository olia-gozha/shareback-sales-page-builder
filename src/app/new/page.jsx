'use client'

import { useState } from 'react'
import PageHeader from './PageHeader'
import FormField from './FormField'
import TextAreaField from './TextAreaField'
import Button from './Button'

export default function NewPage({ onCreated }) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const [form, setForm] = useState({
    company_name: '',
    company_summary: '',
    company_logo: '',
  })

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleCreate() {
    console.log('[NewPage] Create button clicked', { form })

    if (!form.company_name.trim()) {
      console.warn('[NewPage] Validation failed: company_name is empty')
      setError('Company name is required')
      return
    }

    setSaving(true)
    setError(null)

    try {
      console.log('[NewPage] Sending POST /api/pages')
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      console.log('[NewPage] /api/pages response status', res.status)
      const data = await res.json()
      console.log('[NewPage] /api/pages response body', data)

      if (!res.ok) {
        console.error('[NewPage] /api/pages failed', data)
        throw new Error(data.error || 'Failed to create page')
      }

      // If a logo URL was provided, trigger the upload
      if (form.company_logo && form.company_logo.startsWith('http')) {
        console.log('[NewPage] Sending POST /api/upload-logo')
        const logoRes = await fetch('/api/upload-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            logoUrl: form.company_logo,
            pageId: data.page.id,
          }),
        })

        const logoData = await logoRes.json().catch(() => null)
        console.log('[NewPage] /api/upload-logo response', {
          status: logoRes.status,
          body: logoData,
        })

        if (!logoRes.ok) {
          console.error('[NewPage] /api/upload-logo failed', logoData)
        }
      }

      console.log('[NewPage] Create flow succeeded')
      setResult(data)
      if (onCreated) {
        onCreated(data.page)
      }
    } catch (err) {
      console.error('[NewPage] Create flow error', err)
      setError(err.message)
    } finally {
      console.log('[NewPage] Create flow finished')
      setSaving(false)
    }
  }

  // After successful creation, show the links
  if (result) {
    return (
      <main className="max-w-xl mx-auto px-6 py-20">
        <PageHeader
          title="Page Created!"
          description={`Here are your links for ${result.page.company_name}. The client link can be shared with anyone, while the edit link should be kept secret.`}
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="tracking-[-0.01em] text-base font-normal text-deep-charcoal/66">Client link <span className='text-deep-charcoal/30'>&mdash; share this</span></p>
            <div className="flex gap-2">
              <code className="flex-1 p-4 border bg-ocean/2 border-ocean/24 rounded-lg text-sm break-all">
                {window.location.origin}{result.publicUrl}
              </code>
              <Button
                onClick={() => navigator.clipboard.writeText(
                  `${window.location.origin}${result.publicUrl}`
                )}
                idleLabel={null}
                variant="secondary"
                fullWidth={false}
                showIcon={true}
                iconName='Copy'
                className="px-3! py-2! text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="tracking-[-0.01em] text-base font-normal text-deep-charcoal/66">Edit link <span className='text-deep-charcoal/30'>&mdash; keep secret</span></p>
            <div className="flex gap-2">
              <code className="flex-1 p-4 border bg-ocean/2 border-ocean/24 rounded-lg text-sm break-all">
                {window.location.origin}{result.editUrl}
              </code>
              <Button
                onClick={() => navigator.clipboard.writeText(
                  `${window.location.origin}${result.editUrl}`
                )}
                idleLabel={null}
                variant="secondary"
                fullWidth={false}
                showIcon={true}
                iconName='Copy'
                className="px-3! py-2! text-sm"
              />
            </div>
          </div>

          <div className="flex">
            <Button
              href={result.editUrl}
              idleLabel="Edit page"
              fullWidth={false}
              showIcon={true}
              iconName='ArrowUpRight'
              iconSize={18}
            />
            <Button
              onClick={() => {
                setResult(null)
                setForm({ company_name: '', company_summary: '', company_logo: '' })
              }}
              idleLabel="Create another"
              fullWidth={false}
              variant="ghost"
            />
          </div>
        </div>
      </main>
    )
  }

  // The creation form
  return (
    <main className="max-w-xl mx-auto px-6 py-20">
      <PageHeader title="Create a personalized sales page" />
      
      <div className="flex flex-col gap-6">
        <FormField
          label="Company name"
          type="text"
          value={form.company_name}
          onChange={(e) => updateField('company_name', e.target.value)}
          placeholder="e.g. Acme Corp"
        />

        <div>
          <FormField
            label="Company logo URL"
            type="url"
            value={form.company_logo}
            onChange={(e) => updateField('company_logo', e.target.value)}
            placeholder="Paste a URL to the company logo"
          />
          {form.company_logo && form.company_logo.startsWith('http') && (
            <img
              src={form.company_logo}
              alt="Logo preview"
              className="mt-2 h-12 object-contain"
            />
          )}
        </div>

        <TextAreaField
          label="Company summary"
          value={form.company_summary}
          onChange={(e) => updateField('company_summary', e.target.value)}
          rows={4}
          placeholder="Brief description of the company. A few lines of text."
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button onClick={handleCreate} disabled={saving} isLoading={saving} />
      </div>
    </main>
  )
}