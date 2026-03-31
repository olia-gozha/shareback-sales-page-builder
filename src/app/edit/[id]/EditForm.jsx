'use client'

import { useState, useRef, useEffect } from 'react'
import Button from '@/components/Button'
import FormField from '@/components/FormField'
import CompanyProfile from './CompanyProfile'
import EditTabs from './EditTabs'
import PreCallForm from './PreCallForm'

export default function EditForm({ page }) {

  const sectionRefs = useRef([])
  const sectionIds = [
    'post-general',
    'post-features',
    'post-next-step',
    'post-team',
    'post-company-world',
    'post-investment',
  ]
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('pre-sale')
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
  // Only run this if we are actually looking at the post-sale tab
  if (activeTab !== 'post-sale') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the element crosses into our defined threshold area, mark it active
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    },
    {
      // The rootMargin is the secret to a good scroll spy. 
      // '-20% 0px -60% 0px' means the fieldset becomes "active" when its top 
      // passes the top 20% of the screen, and loses active status when it goes below the bottom 40%.
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }
  )

  // Tell the observer to watch all our fieldset refs
  sectionRefs.current.forEach((ref) => {
    if (ref) observer.observe(ref)
  })

  // Cleanup function
  return () => observer.disconnect()
}, [activeTab])

  const createdLabel = page.created_at
    ? new Date(page.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '-'

  // Initialize form state from existing page data
  const [form, setForm] = useState({
    company_name: page.company_name || '',
    company_summary: page.company_summary || '',
    company_logo: page.company_logo || '',
    talk_summary: page.talk_summary || '',
    features: Array.isArray(page.features) && page.features.length > 0 ? page.features : [''],
    action_label: page.action_label || '',
    action_link: page.action_link || '',
    next_step_date: page.next_step_date || '',
    team: Array.isArray(page.team) && page.team.length > 0
      ? page.team
      : [{ full_name: '', role: '', ai_focus: '', description: '' }],
    company_world: page.company_world || {
      industry: '',
      key_relationships: '',
      competitors: '',
    },
    investment_people: page.investment_people || '',
    investment_price: page.investment_price || '',
    investment_features: Array.isArray(page.investment_features) && page.investment_features.length > 0
      ? page.investment_features
      : [''],
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
    setForm((prev) => {
      const updated = prev[field].filter((_, i) => i !== index)

      // Keep one empty row visible for features so the user always has an input.
      if (field === 'features' && updated.length === 0) {
        return { ...prev, [field]: [''] }
      }

      return { ...prev, [field]: updated }
    })
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
        const details = data?.details ? `: ${data.details}` : ''
        throw new Error((data?.error || 'Save failed') + details)
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  function getPublicUrl() {
    return `${window.location.origin}/p/${page.slug}`
  }

  function getSecretEditUrl() {
    return `${window.location.origin}/edit/${page.id}?token=${page.edit_token}`
  }

  function handlePreviewPage() {
    window.open(`/p/${page.slug}`, '_blank', 'noopener,noreferrer')
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(getPublicUrl())
      setError(null)
    } catch {
      setError('Failed to copy client link')
    }
  }

  async function handleCopySecretEditLink() {
    try {
      await navigator.clipboard.writeText(getSecretEditUrl())
      setError(null)
    } catch {
      setError('Failed to copy secret edit link')
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-8 h-8">
        <h1 className="text-sm font-normal text-deep-charcoal/48">Edit: {page.company_name}</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_18rem] gap-6 relative min-h-[calc(100dvh-4rem)]'>

        {/* Main Content */}
        <div className='min-w-0 flex flex-col min-h-0 order-2 lg:order-1'>
          
          {/* Tab Nav */}
          <div className='lg:grid lg:grid-cols-[8rem_minmax(0,1fr)]'>
            <div></div>
            <EditTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </div>

          {/* Pre-call */}
          {activeTab === 'pre-sale' && (
            <div className='lg:grid lg:grid-cols-[8rem_minmax(0,1fr)]'>
              <div></div>
              <PreCallForm
                form={form}
                updateField={updateField}
                handleLogoUrl={handleLogoUrl}
                handleSave={handleSave}
                saving={saving}
                saved={saved}
                error={error}
              />
            </div>
          )}

          {/* ---- POST-SALE ---- */}
          {activeTab === 'post-sale' && (
            <div
              className='lg:grid lg:grid-cols-[9rem_minmax(0,1fr)]'
            >

              <nav className="sticky top-4 self-start h-fit left-0 z-30 hidden lg:block py-4">
                {/* Removed text colors from the <ul> so we can apply them dynamically to the <li> items */}
                <ul className="space-y-5 text-sm whitespace-nowrap px-0 mx-0">
                  {sectionIds.map((id, idx) => {
                    // Check if this specific link is the currently active one
                    const isActive = activeSection === id;
                    
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                          className={`
                            cursor-pointer transition-colors block w-full text-left pl-3
                            ${isActive 
                              ? 'text-deep-charcoal ' 
                              : 'text-deep-charcoal/48 hover:text-deep-charcoal/88'
                            }
                          `}
                        >
                          {id.replace('post-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            
              <div className='max-w-100 mx-auto pb-24'>

                {/* General */}
                <fieldset
                  id="post-general"
                  ref={el => (sectionRefs.current[0] = el)}
                  className="py-20 border border-transparent space-y-4 scroll-mt-2"
                >
                  <FormField
                    as="textarea"
                    label="Talk summary"
                    value={form.talk_summary}
                    onChange={(e) => updateField('talk_summary', e.target.value)}
                    rows={10}
                    helper="Recommended size up to 500 characters. This will be shown in the post-talk summary and should include key talking points."
                    placeholder="Summary of the call with the client, key pain points, next steps, and any other relevant info."
                  />
                </fieldset>

                {/* Features */}
                <fieldset
                  id="post-features"
                  ref={el => (sectionRefs.current[1] = el)}
                  className={`py-20 space-y-4 border-t ${activeSection === 'post-features' ? 'border-t-deep-charcoal' : 'border-t-slate/12'} scroll-mt-2`}
                >
                  {/* <label className="text-base font-normal text-deep-charcoal/66">Features</label> */}
                  {form.features.map((feature, i) => (
                    <div key={i} className="flex gap-1 mb-2">
                      <FormField
                        value={feature}
                        onChange={(e) => updateStringItem('features', i, e.target.value)}
                        placeholder={`Feature ${i + 1}`}
                        wrapperClassName="flex-1 gap-0"
                      />
                      <Button
                        onClick={() => removeStringItem('features', i)}
                        idleLabel={null}
                        variant="secondary"
                        fullWidth={false}
                        showIcon={true}
                        iconName='X'
                        className="px-3! py-2! text-sm bg-transparent text-deep-charcoal/66 hover:bg-linear-to-b hover:from-deep-charcoal/2 hover:to-deep-charcoal/2 hover:bg-mist/9"
                      />
                    </div>
                  ))}
                  <Button
                    idleLabel="Add feature"
                    onClick={() => addStringItem('features')}
                    variant="ghost"
                    fullWidth={false}
                    className="px-0! text-sm text-deep-charcoal/66"
                    showIcon={true}
                    iconName="Plus"
                    iconSize={14}
                  />
                </fieldset>

                {/* Action */}
                <fieldset
                  id="post-next-step"
                  ref={el => (sectionRefs.current[2] = el)}
                  className={`py-20 space-y-4 border-t ${activeSection === 'post-next-step' ? 'border-t-deep-charcoal' : 'border-t-slate/12'} scroll-mt-2`}
                >
                    <FormField
                      label="Action label"
                      type="text"
                      value={form.action_label}
                      onChange={(e) => updateField('action_label', e.target.value)}
                      placeholder="e.g. Book a demo"
                      helper="Label for the call-to-action button that will appear in the post-talk summary for the next step."
                    />
                    <FormField
                      label="Action URL"
                      type="url"
                      value={form.action_link}
                      onChange={(e) => updateField('action_link', e.target.value)}
                      placeholder="https://..."
                    />

                    <FormField
                      label="Date"
                      type="date"
                      value={form.next_step_date}
                      onChange={(e) => updateField('next_step_date', e.target.value)}
                    />
                </fieldset>


                {/* Team */}
                <fieldset
                  id="post-team"
                  ref={el => (sectionRefs.current[3] = el)}
                  className={`py-20 space-y-4 border-t ${activeSection === 'post-team' ? 'border-t-deep-charcoal' : 'border-t-slate/12'} scroll-mt-2`}
                >
                  {form.team.map((member, i) => (
                    <div key={i} className="p-3mb-2 space-y-4">
                      <FormField
                        value={member.full_name}
                        onChange={(e) => updateTeamMember(i, 'full_name', e.target.value)}
                        label="Full name"
                      />
                      <FormField
                        value={member.role}
                        onChange={(e) => updateTeamMember(i, 'role', e.target.value)}
                        label="Role"
                      />
                      <FormField
                        value={member.ai_focus}
                        onChange={(e) => updateTeamMember(i, 'ai_focus', e.target.value)}
                        label="AI Focus"
                        wrapperClassName="gap-0"
                        helper="Concise of AI focus, e.g. 'Relationship health & revenue expansion', 'technical deal acceleration'. Up to 5 words recommended."
                      />
                      <FormField
                        as="textarea"
                        value={member.description}
                        onChange={(e) => updateTeamMember(i, 'description', e.target.value)}
                        label="Description"
                        rows={8}
                        helper="Brief description of AI focus and responsibilities in more detail for this specific team member. Up to 300 characters recommended."
                      />
                        <div className="flex justify-center mt-2">
                          <Button
                            idleLabel="Remove member"
                            onClick={() => removeTeamMember(i)}
                            variant="ghost"
                            fullWidth={false}
                            className="px-0! text-sm"
                            showIcon={true}
                            iconName="Trash"
                            iconSize={14}
                          />
                        </div>
                    </div>
                  ))}
                  <div className='flex justify-center pt-2'>
                    <Button
                      idleLabel="Add team member"
                      onClick={addTeamMember}
                      variant="ghost"
                      fullWidth={false}
                      className="px-0! text-sm text-deep-charcoal/66"
                      showIcon={true}
                      iconName="Plus"
                      iconSize={14}
                    />
                  </div>
                </fieldset>

                {/* Company World */}
                <fieldset
                  id="post-company-world"
                  ref={el => (sectionRefs.current[4] = el)}
                  className={`py-20 space-y-4 border-t ${activeSection === 'post-company-world' ? 'border-t-deep-charcoal' : 'border-t-slate/12'} scroll-mt-2`}
                >
                  {/* <label className="text-base font-normal text-deep-charcoal/66 mb-1">Company World</label> */}
                    <FormField
                      as="textarea"
                      label="Industry"
                      value={form.company_world.industry}
                      onChange={(e) => updateCompanyWorld('industry', e.target.value)}
                      rows={8}
                    />
                    <FormField
                      as="textarea"
                      label="Key relationships"
                      value={form.company_world.key_relationships}
                      onChange={(e) => updateCompanyWorld('key_relationships', e.target.value)}
                      rows={8}
                    />
                    <FormField
                      as="textarea"
                      label="Competitors"
                      value={form.company_world.competitors}
                      onChange={(e) => updateCompanyWorld('competitors', e.target.value)}
                      rows={8}
                    />
                </fieldset>

                {/* Investment */}
                <fieldset
                  id="post-investment"
                  ref={el => (sectionRefs.current[5] = el)}
                  className={`py-20 space-y-4 border-t ${activeSection === 'post-investment' ? 'border-t-2 border-t-deep-charcoal' : 'border-t-slate/12'} scroll-mt-2`}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Number of people"
                      type="number"
                      value={form.investment_people}
                      onChange={(e) => updateField('investment_people', e.target.value)}
                    />
                    <FormField
                      label="Price per person/month"
                      type="number"
                      prefix="£"
                      step="0.01"
                      value={form.investment_price}
                      onChange={(e) => updateField('investment_price', e.target.value)}
                    />
                  </div>
                  <div>
                    {/* <label className="block text-sm font-medium mb-1">Investment Features</label> */}
                    {form.investment_features.map((feature, i) => (
                      <div key={i} className="flex gap-1 mb-2">
                        <FormField
                          value={feature}
                          onChange={(e) => updateStringItem('investment_features', i, e.target.value)}
                          placeholder={`Feature ${i + 1}`}
                          wrapperClassName="flex-1 gap-0"
                        />
                        <Button
                          onClick={() => removeStringItem('investment_features', i)}
                          idleLabel={null}
                          variant="secondary"
                          fullWidth={false}
                          showIcon={true}
                          iconName='X'
                          className="px-3! py-2! text-sm bg-transparent text-deep-charcoal/66 hover:bg-linear-to-b hover:from-deep-charcoal/2 hover:to-deep-charcoal/2 hover:bg-mist/9"
                        />
                      </div>
                    ))}
                    <Button
                      idleLabel="Add feature"
                      onClick={() => addStringItem('investment_features')}
                      variant="ghost"
                      fullWidth={false}
                      className="px-0! text-sm text-deep-charcoal/66"
                      showIcon={true}
                      iconName="Plus"
                      iconSize={14}
                    />
                  </div>
                </fieldset>
                
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    isLoading={saving}
                    idleLabel="Save changes"
                    loadingLabel="Saving..."
                    fullWidth={false}
                    className="py-3 px-6"
                  />
                  {saved && <span className="text-green-600 text-sm">Saved!</span>}
                  {error && <span className="text-red-600 text-sm">{error}</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Company Profile */}
        <div className='order-1 w-full lg:order-2 lg:w-78 lg:min-w-78 lg:sticky lg:top-4 lg:self-start lg:h-fit'>
          <CompanyProfile
            page={page}
            createdLabel={createdLabel}
            onPreviewPage={handlePreviewPage}
            onCopyLink={handleCopyLink}
            onCopySecretEditLink={handleCopySecretEditLink}
            className='flex-row lg:flex-col justify-between max-w-full'
          />
        </div>
      </div>
    </div>
  )
}