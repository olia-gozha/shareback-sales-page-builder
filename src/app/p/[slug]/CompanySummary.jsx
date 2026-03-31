export default function CompanySummary({ summary }) {
  return (
    <div
      className="pointer-events-none absolute left-0 bottom-full mb-3 z-30 w-[22rem] max-w-[80vw] rounded-2xl border border-slate/20 bg-white/95 backdrop-blur-sm shadow-[0_10px_35px_rgba(6,21,21,0.14)] p-4 text-sm text-deep-charcoal/88 opacity-0 -translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0"
      role="tooltip"
      aria-live="polite"
    >
      <p className="text-xs text-slate/70 mb-2 font-medium">Company summary</p>
      {summary ? (
        <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
      ) : (
        <p className="leading-relaxed">No company summary yet.</p>
      )}
    </div>
  )
}
