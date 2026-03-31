export default function Problem() {
  return (
    <section className="mt-32 md:mt-40 max-w-5xl w-full text-left fade-in">
      {/* Header Area */}
      <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif tracking-tight leading-[1.05] text-deep-charcoal mb-6">
        40% of selling time lost to admin.
      </h2>
      <p className="text-xl md:text-2xl text-deep-charcoal/88 font-light mb-16 leading-relaxed max-w-3xl">
        Expensive producers doing low-leverage, operational tasks <br className="hidden md:block" />
        instead of high-impact selling
      </p>

      {/* Data Card */}
      <div className="border border-slate/20 bg-ghost p-8 md:p-12 lg:p-16 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-y-0 gap-y-4">
          {/* Table Headers */}
          <div className="md:col-span-4 text-[0.85rem] text-slate/88 pb-4 md:pb-8">
            What it costs
          </div>
          <div className="md:col-span-8 text-[0.85rem] text-slate/88 pb-4 md:pb-8 md:pl-12 lg:pl-16 md:border-l border-slate/20">
            Why it is happening
          </div>

          {/* Row 1: Time */}
          <div className="md:col-span-4 py-4 md:py-6 flex items-start gap-4 text-deep-charcoal text-sm font-medium">
            <svg className="w-5 h-5 text-slate shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Time
          </div>
          <div className="md:col-span-8 py-4 md:py-6 md:pl-12 lg:pl-16 md:border-l border-slate/20 text-deep-charcoal/88 text-sm">
            Admin, reporting, and manual research consume hours
          </div>

          {/* Row 2: Intelligence */}
          <div className="md:col-span-4 py-4 md:py-6 flex items-start gap-4 text-deep-charcoal text-sm font-medium">
            <svg className="w-5 h-5 text-slate shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="12" r="2" />
              <path d="M14 8a6 6 0 0 1 0 8" />
              <path d="M18 4a10 10 0 0 1 0 16" />
            </svg>
            Intelligence
          </div>
          <div className="md:col-span-8 py-4 md:py-6 md:pl-12 lg:pl-16 md:border-l border-slate/20 text-deep-charcoal/88 text-sm">
            Relationship, deal data is trapped in spreadsheets and siloed systems
          </div>

          {/* Row 3: Speed */}
          <div className="md:col-span-4 py-4 md:py-6 flex items-start gap-4 text-deep-charcoal text-sm font-medium">
            <svg className="w-5 h-5 text-slate shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Speed
          </div>
          <div className="md:col-span-8 py-4 md:py-6 md:pl-12 lg:pl-16 md:border-l border-slate/20 text-deep-charcoal/88 text-sm">
            Lag between identifying and actioning opportunities
          </div>

          {/* Row 4: Leverage */}
          <div className="md:col-span-4 py-4 md:py-6 flex items-start gap-4 text-deep-charcoal text-sm font-medium">
            <svg className="w-5 h-5 text-slate shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m17 11-5-5-5 5" />
              <path d="m17 18-5-5-5 5" />
            </svg>
            Leverage
          </div>
          <div className="md:col-span-8 py-4 md:py-6 md:pl-12 lg:pl-16 md:border-l border-slate/20 text-deep-charcoal/88 text-sm">
            Weak tooling ensures no one&apos;s effort compounds across the team
          </div>

          {/* Row 5: Focus */}
          <div className="md:col-span-4 pt-4 md:pt-6 pb-2 md:pb-0 flex items-start gap-4 text-deep-charcoal text-sm font-medium">
            <svg className="w-5 h-5 text-slate shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            Focus
          </div>
          <div className="md:col-span-8 pt-4 md:pt-6 pb-2 md:pb-0 md:pl-12 lg:pl-16 md:border-l border-slate/20 text-deep-charcoal/88 text-sm">
            Mental bandwidth consumed by searching, coordinating, and proving activity
          </div>
        </div>
      </div>
    </section>
  )
}
