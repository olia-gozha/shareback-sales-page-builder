export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="tracking-[-0.01em] text-base font-normal text-deep-charcoal/66">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full py-4 px-5 border bg-ocean/2 border-ocean/24 rounded-lg text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-3 focus:ring-ocean/12 focus-visible:ring-3 focus-visible:ring-ring-ocean/12"
        placeholder={placeholder}
      />
    </label>
  )
}