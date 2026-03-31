import Button from '@/components/Button'
import FormField from '@/components/FormField'

export default function PreCallForm({
  form,
  updateField,
  handleLogoUrl,
  handleSave,
  saving,
  saved,
  error,
}) {
  return (
    <div className="max-w-100 w-full mx-auto">
      <fieldset className="py-20 border border-transparent space-y-4">
        <FormField
          label="Company name"
          type="text"
          value={form.company_name}
          onChange={(e) => updateField('company_name', e.target.value)}
        />

        <div>
          <FormField
            label="Company logo URL"
            type="url"
            value={form.company_logo}
            onChange={(e) => updateField('company_logo', e.target.value)}
            onBlur={(e) => {
              if (e.target.value && e.target.value.startsWith('http')) {
                handleLogoUrl(e.target.value)
              }
            }}
            placeholder="Paste a logo URL — we'll save a permanent copy"
          />
          {form.company_logo && (
            <img
              src={form.company_logo}
              alt="Logo preview"
              className="mt-2 h-12 object-contain aspect-square rounded-full"
            />
          )}
        </div>

        <FormField
          as="textarea"
          label="Company summary"
          value={form.company_summary}
          onChange={(e) => updateField('company_summary', e.target.value)}
          rows={10}
          helper="Recommended size up to 500 characters. This will be shown in the pitch section to help the client understand the value proposition."
          placeholder="Rich text editor will go here — plain text for now"
        />
      </fieldset>

      <div className="flex items-center gap-4 pb-20">
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
  )
}