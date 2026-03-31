export default function CompanySummary({ summary }) {
  return (
    <div
      className="pointer-events-none absolute left-0 bottom-full z-30 w-96 max-w-[80vw] rounded-2xl  bg-white/95 backdrop-blur-sm shadow-[0px_2px_4px_color-mix(in_oklab,var(--color-ocean)_1%,transparent),0_10px_35px_color-mix(in_srgb,var(--color-ocean)_16%,transparent)] p-6 opacity-0 -translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 text-base"
      role="tooltip"
      aria-live="polite"
    >
      <p className="text-deep-charcoal/60 mb-2">Company overview</p>
      {summary ? (
        <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
      ) : (
        <p className="text-deep-charcoal">No company overview yet.</p>
      )}
    </div>
  )
}
