'use client'

import { useState } from 'react'

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
        <h1 className="text-2xl font-bold mb-2">Page Created!</h1>
        <p className="text-gray-500 mb-8">
          Here are your links for {result.page.company_name}:
        </p>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm font-medium mb-1">Client Link (share this)</p>
            <div className="flex gap-2">
              <code className="flex-1 p-2 bg-gray-100 rounded text-sm break-all">
                {window.location.origin}{result.publicUrl}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(
                  `${window.location.origin}${result.publicUrl}`
                )}
                className="px-3 py-2 bg-black text-white text-sm rounded hover:bg-gray-800"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-sm font-medium mb-1">Edit Link (keep secret)</p>
            <div className="flex gap-2">
              <code className="flex-1 p-2 bg-gray-100 rounded text-sm break-all">
                {window.location.origin}{result.editUrl}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(
                  `${window.location.origin}${result.editUrl}`
                )}
                className="px-3 py-2 bg-black text-white text-sm rounded hover:bg-gray-800"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <a
              href={result.editUrl}
              className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
            >
              Go to Edit Page →
            </a>
            <button
              onClick={() => {
                setResult(null)
                setForm({ company_name: '', company_summary: '', company_logo: '' })
              }}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              Create Another
            </button>
          </div>
        </div>
      </main>
    )
  }

  // The creation form
  return (
    <main className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-bold mb-2">Create Sales Page</h1>
      <p className="text-gray-500 mb-8">
        Fill in the basics. You can add more details from the edit page later.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.company_name}
            onChange={(e) => updateField('company_name', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. Acme Corp"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Logo URL</label>
          <input
            type="url"
            value={form.company_logo}
            onChange={(e) => updateField('company_logo', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Paste a URL to the company logo (optional)"
          />
          {form.company_logo && form.company_logo.startsWith('http') && (
            <img
              src={form.company_logo}
              alt="Logo preview"
              className="mt-2 h-12 object-contain"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Summary</label>
          <textarea
            value={form.company_summary}
            onChange={(e) => updateField('company_summary', e.target.value)}
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Brief description of the company (optional)"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleCreate}
          disabled={saving}
          className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'Creating...' : 'Create Page'}
        </button>
      </div>
    </main>
  )
}