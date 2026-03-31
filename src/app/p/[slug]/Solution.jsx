export default function Solution() {
  return (
    <section className="bg-deep-charcoal w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 fade-in text-white">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="text-slate/88 text-sm mb-6 font-medium">
          Solution
        </div>

        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <h2 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif tracking-tight leading-[0.9] text-white">
            20x yourself
          </h2>
          <div className="text-xl md:text-2xl text-mist/85 font-light max-w-sm leading-snug pb-2">
            <p>Shareback handles the operations.</p>
            <p><span className="text-white font-medium">Quantifind</span> owns the relationship.</p>
          </div>
        </div>

        {/* Data Card */}
        <div className="border border-white/10 bg-transparent p-8 md:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-y-0 gap-y-4">
            {/* Table Headers */}
            <div className="md:col-span-4 text-[0.85rem] text-slate/88 pb-4 md:pb-8">
              What you get back
            </div>
            <div className="md:col-span-8 text-[0.85rem] text-slate/88 pb-4 md:pb-8 md:pl-12 lg:pl-16 md:border-l border-white/10">
              How you get it
            </div>

            {/* Row 1: Time */}
            <div className="md:col-span-4 py-4 md:py-6 flex items-start gap-4 text-white text-sm font-medium">
              <svg className="w-5 h-5 text-mist shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Time
            </div>
            <div className="md:col-span-8 py-4 md:py-6 md:pl-12 lg:pl-16 md:border-l border-white/10 text-mist text-sm font-light">
              Automatic roadshow prep, CRM updates, outreach drafting
            </div>

            {/* Row 2: Intelligence */}
            <div className="md:col-span-4 py-4 md:py-6 flex items-start gap-4 text-white text-sm font-medium">
              <svg className="w-5 h-5 text-mist shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="12" r="2" />
                <path d="M14 8a6 6 0 0 1 0 8" />
                <path d="M18 4a10 10 0 0 1 0 16" />
              </svg>
              Intelligence
            </div>
            <div className="md:col-span-8 py-4 md:py-6 md:pl-12 lg:pl-16 md:border-l border-white/10 text-mist text-sm font-light">
              Living map of relationships, coverage, institutional knowledge
            </div>

            {/* Row 3: Speed */}
            <div className="md:col-span-4 py-4 md:py-6 flex items-start gap-4 text-white text-sm font-medium">
              <svg className="w-5 h-5 text-mist shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Speed
            </div>
            <div className="md:col-span-8 py-4 md:py-6 md:pl-12 lg:pl-16 md:border-l border-white/10 text-mist text-sm font-light">
              Days of email coordination &rarr; minutes
            </div>

            {/* Row 4: Leverage */}
            <div className="md:col-span-4 py-4 md:py-6 flex items-start gap-4 text-white text-sm font-medium">
              <svg className="w-5 h-5 text-mist shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m17 11-5-5-5 5" />
                <path d="m17 18-5-5-5 5" />
              </svg>
              Leverage
            </div>
            <div className="md:col-span-8 py-4 md:py-6 md:pl-12 lg:pl-16 md:border-l border-white/10 text-mist text-sm font-light">
              Every relationship across your team, mapped, ranked, and ready to action
            </div>

            {/* Row 5: Focus */}
            <div className="md:col-span-4 pt-4 md:pt-6 pb-2 md:pb-0 flex items-start gap-4 text-white text-sm font-medium">
              <svg className="w-5 h-5 text-mist shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              Focus
            </div>
            <div className="md:col-span-8 pt-4 md:pt-6 pb-2 md:pb-0 md:pl-12 lg:pl-16 md:border-l border-white/10 text-mist text-sm font-light">
              One question across email, CRM, calendar, and news. One answer.
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-16 md:mt-24 max-w-3xl">
          <p className="text-xl md:text-2xl text-mist/85 font-light leading-relaxed">
            CRM management, research, outreach, conference prep, <br className="hidden md:block" />
            internal coordination, follow-ups, daily briefs <span className="italic">done for you.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
