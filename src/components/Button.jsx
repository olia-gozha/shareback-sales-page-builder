import { useEffect, useRef, useState } from 'react'
import * as LucideIcons from 'lucide-react'

export default function Button({
  onClick,
  href,
  disabled,
  isLoading,
  actionType,
  idleLabel = 'Create page',
  loadingLabel = 'Creating...',
  successLabel,
  errorLabel = 'Failed',
  statusDuration = 2000,
  className = '',
  fullWidth = true,
  variant = 'primary',
  showIcon = false,
  iconName = 'ArrowRight',
  iconSize = 16,
}) {
  const [status, setStatus] = useState('idle')
  const statusResetRef = useRef(null)

  useEffect(() => {
    return () => {
      if (statusResetRef.current) {
        clearTimeout(statusResetRef.current)
      }
    }
  }, [])

  function getDefaultSuccessLabel() {
    if (actionType === 'copy') return 'Copied!'
    if (actionType === 'send') return 'Sent!'
    if (actionType === 'save') return 'Saved!'
    return idleLabel
  }

  function queueStatusReset() {
    if (statusResetRef.current) {
      clearTimeout(statusResetRef.current)
    }

    statusResetRef.current = setTimeout(() => {
      setStatus('idle')
      statusResetRef.current = null
    }, statusDuration)
  }

  async function handleClick(event) {
    if (!onClick || isLoading || status === 'loading') {
      return
    }

    try {
      const maybePromise = onClick(event)

      if (!maybePromise || typeof maybePromise.then !== 'function') {
        return
      }

      setStatus('loading')
      await maybePromise
      setStatus('success')
      queueStatusReset()
    } catch {
      setStatus('error')
      queueStatusReset()
    }
  }

  const activeStatus = isLoading ? 'loading' : status
  const finalSuccessLabel = successLabel || getDefaultSuccessLabel()
  const finalLabel = activeStatus === 'loading'
    ? loadingLabel
    : activeStatus === 'success'
      ? finalSuccessLabel
      : activeStatus === 'error'
        ? errorLabel
        : idleLabel

  const IconComponent = LucideIcons[iconName] || LucideIcons.ArrowRight

  const variantClassName = variant === 'secondary'
    ? 'bg-ocean/8 text-deep-charcoal hover:-translate-y-[1px] hover:opacity-95'
    : variant === 'ghost'
      ? 'bg-transparent text-deep-charcoal/48 hover:text-deep-charcoal'
      : 'bg-deep-charcoal text-white hover:-translate-y-[1px] hover:opacity-95'

  const baseClassName = `${fullWidth ? 'w-full' : ''} shrink-0 cursor-pointer inline-flex items-center justify-center gap-1 pl-4.5 pr-5 py-4 rounded-lg font-normal transition-[color,background-color,transform, opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate ${variantClassName} ${className}`.trim()
  const isDisabled = Boolean(disabled || activeStatus === 'loading')

  if (href) {
    return (
      <a href={href} className={baseClassName}>
        {showIcon ? <IconComponent size={iconSize} aria-hidden="true" /> : null}
        {finalLabel && <span className='whitespace-nowrap'>{finalLabel}</span>}
      </a>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={baseClassName}
    >
      {activeStatus === 'loading' ? (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
      ) : showIcon ? (
        <IconComponent size={iconSize} aria-hidden="true" />
      ) : null}
      {finalLabel && <span className='whitespace-nowrap'>{finalLabel}</span>}
    </button>
  )
}