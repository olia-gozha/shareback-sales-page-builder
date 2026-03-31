export default function FormField({
  label,
  helper,
  as = 'input',
  type = 'text',
  value,
  onChange,
  placeholder,
  rows = 4,
  prefix,
  className = '',
  wrapperClassName = '',
  ...rest
}) {
  const isTextArea = as === 'textarea'

  return (
    <label className={`flex flex-col gap-3 ${wrapperClassName}`.trim()}>
      {label ? <span className="text-base font-normal text-deep-charcoal/66">{label}</span> : null}
      {helper ? <span className="text-sm font-normal text-deep-charcoal/48">{helper}</span> : null}
      {isTextArea ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full py-4 px-5 border bg-ocean/2 border-ocean/24 rounded-lg text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-3 focus:ring-ocean/12 focus-visible:ring-3 focus-visible:ring-ring-ocean/12 ${className}`.trim()}
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <div className="relative">
          {prefix ? (
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-deep-charcoal/66">
              {prefix}
            </span>
          ) : null}
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full py-4 px-5 border bg-ocean/2 border-ocean/24 rounded-lg text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-3 focus:ring-ocean/12 focus-visible:ring-3 focus-visible:ring-ring-ocean/12 ${prefix ? 'pl-9' : ''} ${className}`.trim()}
            placeholder={placeholder}
            {...rest}
          />
        </div>
      )}
    </label>
  )
}