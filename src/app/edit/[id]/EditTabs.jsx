export default function EditTabs({ 
    activeTab, 
    onTabChange,
    className = '',
 }) {
  return (
    <div className={`flex justify-center gap-8 pt-4 pb-4 lg:pb-12 max-w-100 mx-auto border-b border-transparent ${className.trim()} ${
          activeTab === 'pre-sale'
            ? '[border-image:linear-gradient(to_right,color-mix(in_srgb,var(--color-deep-charcoal)_50%,transparent)_50%,color-mix(in_srgb,var(--color-slate)_12%,transparent)_50%)_1]'
            : '[border-image:linear-gradient(to_right,color-mix(in_srgb,var(--color-slate)_12%,transparent)_50%,color-mix(in_srgb,var(--color-deep-charcoal)_50%,transparent)_50%)_1]'
        }`}>
      <button
        type="button"
        onClick={() => onTabChange('pre-sale')}
        className={`text-left  px-0 py-2 text-xl md:text-2xl lg:text-[32px] font-light leading-[125%] transition-colors ${
          activeTab === 'pre-sale'
            ? 'text-deep-charcoal'
            : 'cursor-pointer text-deep-charcoal/40 hover:text-deep-charcoal/88'
        }`}
      >
        Pre-sale info
      </button>
      <button
        type="button"
        onClick={() => onTabChange('post-sale')}
        className={`text-left px-0 py-2 text-xl md:text-2xl lg:text-[32px] font-light leading-[125%] transition-colors ${
          activeTab === 'post-sale'
            ? 'text-deep-charcoal'
            : 'cursor-pointer text-deep-charcoal/40 hover:text-deep-charcoal/88'
        }`}
      >
        Post-sale info
      </button>
    </div>
  )
}