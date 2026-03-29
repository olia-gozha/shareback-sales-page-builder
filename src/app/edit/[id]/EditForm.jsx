'use client'

import { useState } from 'react'

export default function EditForm({ page }) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('pre-sale')

  // Initialize form state from existing page data
  const [form, setForm] = useState({
    company_name: page.company_name || '',
    company_summary: page.company_summary || '',
    company_logo: page.company_logo || '',
    talk_summary: page.talk_summary || '',
    features: page.features || [],
    action_label: page.action_label || '',
    action_link: page.action_link || '',
    next_step_date: page.next_step_date || '',
    team: page.team || [],
    company_world: page.company_world || {
      industry: '',
      key_relationships: '',
      competitors: '',
    },
    investment_people: page.investment_people || '',
    investment_price: page.investment_price || '',
    investment_features: page.investment_features || [],
  })

  // Generic handler for simple text/number fields
  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // --- Array of strings helpers (features, investment_features) ---
  function addStringItem(field) {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  function updateStringItem(field, index, value) {
    setForm((prev) => {
      const updated = [...prev[field]]
      updated[index] = value
      return { ...prev, [field]: updated }
    })
  }

  function removeStringItem(field, index) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  // --- Team helpers ---
  function addTeamMember() {
    setForm((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        { full_name: '', role: '', ai_focus: '', description: '' },
      ],
    }))
  }

  function updateTeamMember(index, field, value) {
    setForm((prev) => {
      const updated = [...prev.team]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, team: updated }
    })
  }

  function removeTeamMember(index) {
    setForm((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }))
  }

  // --- Company World helpers ---
  function updateCompanyWorld(field, value) {
    setForm((prev) => ({
      ...prev,
      company_world: { ...prev.company_world, [field]: value },
    }))
  }

  // --- Logo upload ---
  async function handleLogoUrl(url) {
    updateField('company_logo', url)

    try {
      const res = await fetch('/api/upload-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logoUrl: url, pageId: page.id }),
      })
      const data = await res.json()
      if (data.logoUrl) {
        updateField('company_logo', data.logoUrl)
      }
    } catch (err) {
      console.error('Logo upload failed, using original URL:', err)
    }
  }

  // --- Save ---
  async function handleSave() {
    setSaving(true)
    setSaved(false)
    setError(null)

    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: page.edit_token,
          ...form,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Save failed')
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Edit: {page.company_name}</h1>
        <a
          href={`/p/${page.slug}`}
          target="_blank"
          className="text-sm text-blue-600 hover:underline"
        >
          View live page →
        </a>
      </div>

      <div className="flex gap-2 mb-6 border-b">
        <button
          type="button"
          onClick={() => setActiveTab('pre-sale')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'pre-sale'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Pre-sale info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('post-sale')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'post-sale'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Post-sale info
        </button>
      </div>

      {/* ---- PRE-SALE ---- */}
      {activeTab === 'pre-sale' && (
        <fieldset className="mb-8 p-4 border rounded-lg space-y-4">
          <legend className="text-sm font-semibold px-2">Pre-Sale Info</legend>

          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={form.company_name}
              onChange={(e) => updateField('company_name', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company Logo URL</label>
            <input
              type="url"
              value={form.company_logo}
              onChange={(e) => updateField('company_logo', e.target.value)}
              onBlur={(e) => {
                if (e.target.value && e.target.value.startsWith('http')) {
                  handleLogoUrl(e.target.value)
                }
              }}
              placeholder="Paste a logo URL — we'll save a permanent copy"
              className="w-full p-2 border rounded"
            />
            {form.company_logo && (
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
              placeholder="Rich text editor will go here — plain text for now"
            />
          </div>
        </fieldset>
      )}

      {/* ---- POST-SALE ---- */}
      {activeTab === 'post-sale' && (
        <fieldset className="mb-8 p-4 border rounded-lg space-y-4">
          <legend className="text-sm font-semibold px-2">Post-Sale Info</legend>

        <div>
          <label className="block text-sm font-medium mb-1">Talk Summary</label>
          <textarea
            value={form.talk_summary}
            onChange={(e) => updateField('talk_summary', e.target.value)}
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Rich text editor will go here — plain text for now"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium mb-1">Features</label>
          {form.features.map((feature, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateStringItem('features', i, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder={`Feature ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeStringItem('features', i)}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addStringItem('features')}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add feature
          </button>
        </div>

        {/* Action */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Action Label</label>
            <input
              type="text"
              value={form.action_label}
              onChange={(e) => updateField('action_label', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g. Book a demo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Action Link</label>
            <input
              type="url"
              value={form.action_link}
              onChange={(e) => updateField('action_link', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Next Step Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Next Step Date</label>
          <input
            type="date"
            value={form.next_step_date}
            onChange={(e) => updateField('next_step_date', e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Team */}
        <div>
          <label className="block text-sm font-medium mb-1">Team</label>
          {form.team.map((member, i) => (
            <div key={i} className="p-3 border rounded mb-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Member {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeTeamMember(i)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                value={member.full_name}
                onChange={(e) => updateTeamMember(i, 'full_name', e.target.value)}
                placeholder="Full name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={member.role}
                onChange={(e) => updateTeamMember(i, 'role', e.target.value)}
                placeholder="Role"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={member.ai_focus}
                onChange={(e) => updateTeamMember(i, 'ai_focus', e.target.value)}
                placeholder="AI Focus"
                className="w-full p-2 border rounded"
              />
              <textarea
                value={member.description}
                onChange={(e) => updateTeamMember(i, 'description', e.target.value)}
                placeholder="Description"
                rows={2}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTeamMember}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add team member
          </button>
        </div>

        {/* Company World */}
        <div>
          <label className="block text-sm font-medium mb-1">Company World</label>
          <div className="space-y-2">
            <textarea
              value={form.company_world.industry}
              onChange={(e) => updateCompanyWorld('industry', e.target.value)}
              placeholder="Industry"
              rows={2}
              className="w-full p-2 border rounded"
            />
            <textarea
              value={form.company_world.key_relationships}
              onChange={(e) => updateCompanyWorld('key_relationships', e.target.value)}
              placeholder="Key Relationships"
              rows={2}
              className="w-full p-2 border rounded"
            />
            <textarea
              value={form.company_world.competitors}
              onChange={(e) => updateCompanyWorld('competitors', e.target.value)}
              placeholder="Competitors"
              rows={2}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Investment */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Number of People</label>
            <input
              type="number"
              value={form.investment_people}
              onChange={(e) => updateField('investment_people', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price per Person/Month</label>
            <input
              type="number"
              step="0.01"
              value={form.investment_price}
              onChange={(e) => updateField('investment_price', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Investment Features */}
        <div>
          <label className="block text-sm font-medium mb-1">Investment Features</label>
          {form.investment_features.map((feature, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) =>
                  updateStringItem('investment_features', i, e.target.value)
                }
                className="flex-1 p-2 border rounded"
                placeholder={`Feature ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeStringItem('investment_features', i)}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addStringItem('investment_features')}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add feature
          </button>
        </div>
        </fieldset>
      )}

      {/* ---- SAVE ---- */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && <span className="text-green-600 text-sm">Saved!</span>}
        {error && <span className="text-red-600 text-sm">{error}</span>}
      </div>

      {/* ---- LINKS ---- */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
        <p>
          <span className="font-medium">Client link:</span>{' '}
          <code className="bg-gray-200 px-1 rounded">/p/{page.slug}</code>
        </p>
        <p>
          <span className="font-medium">Edit link (keep secret):</span>{' '}
          <code className="bg-gray-200 px-1 rounded">
            /edit/{page.id}?token={page.edit_token}
          </code>
        </p>
      </div>
    </main>
  )
}