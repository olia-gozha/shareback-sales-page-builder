function formatDate(dateString) {
  if (!dateString) return null

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function NextAction({ actionLabel, actionLink, nextStepDate }) {
  const displayDate = formatDate(nextStepDate)

  if (!actionLabel && !actionLink && !displayDate) {
    return null
  }

  return (
    <section className="space-y-6">
      <h2 className="text-sm text-slate-400 uppercase tracking-wider">Next Action</h2>

      {actionLabel && actionLink ? (
        <a
          href={actionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
        >
          {actionLabel}
        </a>
      ) : null}

      {displayDate ? (
        <p className="text-base text-slate-600">
          Next step date: <span className="text-slate-900">{displayDate}</span>
        </p>
      ) : null}
    </section>
  )
}
