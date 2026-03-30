import * as LucideIcons from 'lucide-react'

export default function Button({
  onClick,
  href,
  disabled,
  isLoading,
  idleLabel = 'Create page',
  loadingLabel = 'Creating...',
  className = '',
  fullWidth = true,
  variant = 'primary',
  showIcon = false,
  iconName = 'ArrowRight',
  iconSize = 16,
}) {
  const IconComponent = LucideIcons[iconName] || LucideIcons.ArrowRight

  const variantClassName = variant === 'secondary'
    ? 'bg-ocean/8 text-deep-charcoal'
    : variant === 'ghost'
      ? 'bg-transparent text-deep-charcoal/48'
      : 'bg-deep-charcoal text-white'

  const baseClassName = `${fullWidth ? 'w-full' : ''} shrink-0 cursor-pointer inline-flex items-center justify-center gap-1 pl-4.5 pr-5 py-4 rounded-lg font-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate ${variantClassName} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={baseClassName}>
        {showIcon ? <IconComponent size={iconSize} aria-hidden="true" /> : null}
        {idleLabel && <span className='whitespace-nowrap'>{isLoading ? loadingLabel : idleLabel}</span>}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={baseClassName}
    >
      {showIcon ? <IconComponent size={iconSize} aria-hidden="true" /> : null}
      {idleLabel && <span className='whitespace-nowrap'>{isLoading ? loadingLabel : idleLabel}</span>}
    </button>
  )
}