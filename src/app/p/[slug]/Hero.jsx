'use client'

import NextAction from './NextAction'
import PersonPill from './PersonPill'
import CompanySummary from './CompanySummary'

export default function Hero({
  page,
  activeTab,
  onTabChange,
  title,
}) {
  const displayDate = page.created_at
    ? new Date(page.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Mar 31, 2026'

  const isPreCall = activeTab === 'pre-call'
  const isPostCall = activeTab === 'post-call'

  return (
    <section className="space-y-10">
      <header className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
            {page.company_logo ? (
              <img
                src={page.company_logo}
                alt={`${page.company_name} logo`}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19 12h-4M9 12H5M12 19v-4M12 9V5"></path>
              </svg>
            )}
          </div>

          <div>
            <h2 className="text-sm font-medium">Built for {page.company_name || 'your firm'}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{displayDate}</p>
          </div>
        </div>
      </header>

      <div
        className={`flex justify-center gap-8 pt-4 pb-4 max-w-100 mx-auto border-b border-transparent ${
          activeTab === 'pre-call'
            ? '[border-image:linear-gradient(to_right,color-mix(in_srgb,var(--color-deep-charcoal)_50%,transparent)_50%,color-mix(in_srgb,var(--color-slate)_12%,transparent)_50%)_1]'
            : '[border-image:linear-gradient(to_right,color-mix(in_srgb,var(--color-slate)_12%,transparent)_50%,color-mix(in_srgb,var(--color-deep-charcoal)_50%,transparent)_50%)_1]'
        }`}
      >
        <button
          type="button"
          onClick={() => onTabChange?.('pre-call')}
          className={`text-left px-0 py-2 text-xl md:text-2xl lg:text-[32px] font-light leading-[125%] transition-colors ${
            activeTab === 'pre-call'
              ? 'text-deep-charcoal'
              : 'cursor-pointer text-deep-charcoal/40 hover:text-deep-charcoal/88'
          }`}
        >
          Pitch
        </button>
        <button
          type="button"
          onClick={() => onTabChange?.('post-call')}
          className={`text-left px-0 py-2 text-xl md:text-2xl lg:text-[32px] font-light leading-[125%] transition-colors ${
            activeTab === 'post-call'
              ? 'text-deep-charcoal'
              : 'cursor-pointer text-deep-charcoal/40 hover:text-deep-charcoal/88'
          }`}
        >
          Post-talk summary
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.1] max-w-4xl mx-auto text-slate-900">
          {activeTab === 'pre-call' ? (
            <>
              Let&apos;s bring deeply custom AI to <span className="italic">your</span> firm
            </>
          ) : (
            <>
              After <span className="italic">the</span> call
            </>
          )}
        </h1>

        {isPreCall ? <PersonPill /> : null}
      </div>

      <div className="max-w-4xl mx-auto text-left space-y-10">
        {isPreCall ? (
          <section>
            <h3 className="text-sm text-slate-400 mb-8">Executive summary</h3>
            <div className="space-y-10 text-3xl md:text-[2.5rem] font-light leading-snug tracking-tight text-slate-800">
              <div>
                We spent 18 months as consultants working with relationship businesses like{' '}
                <span className="relative inline-block group">
                  <span className="border-b-2 border-dotted border-slate-400 pb-1 cursor-help">
                    {page.company_name || 'your firm'}
                  </span>
                  <CompanySummary summary={page.company_summary} />
                </span>
                .
              </div>
              <p>
                We kept seeing the same pattern: <br className="hidden md:block" />
                <span className="font-serif italic text-4xl md:text-[2.75rem]">
                  the AI wasn&apos;t the expensive part. Configuration was.
                </span>
              </p>
              <p>
                So we built an engine that configures itself for every company and each person inside.
                Half the cost of typical AI deployment. In five days.
              </p>
            </div>
          </section>
        ) : null}

        {isPostCall ? (
          <section className="space-y-10">
            {page.talk_summary ? (
              <div>
                <h3 className="text-sm text-slate-400 mb-4 uppercase tracking-wider">Talk summary</h3>
                <div
                  className="prose prose-lg text-slate-700 font-light leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: page.talk_summary }}
                />
              </div>
            ) : null}

            {Array.isArray(page.features) && page.features.length > 0 ? (
              <div>
                <h3 className="text-sm text-slate-400 mb-4 uppercase tracking-wider">Features</h3>
                <ul className="list-disc pl-5 space-y-2 text-lg font-light text-slate-700">
                  {page.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>

      <div className="max-w-4xl mx-auto">
        {isPreCall ? (
          <footer className="pt-12 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-6 gap-8 text-left">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400">Founded</span>
              <span className="text-sm font-medium text-slate-900">2023</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400">Offices</span>
              <span className="text-sm font-medium leading-tight text-slate-900">London<br />San Francisco</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400">Founders</span>
              <span className="text-sm font-medium leading-tight text-slate-900">Lauren Ladd, CEO<br />Yev Vlasenko, CTO</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400">Recognition</span>
              <span className="text-sm font-medium leading-tight text-slate-900">Google AI Startup<br />Y Combinator<br />Innovate UK</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-400">Investors</span>
              <span className="text-sm font-medium leading-tight text-slate-900">General Catalyst<br />LocalGlobe<br />Sie Ventures<br />Angels from Google DeepMind, Apollo</span>
            </div>

            <div className="col-span-2 md:col-span-1 flex items-start md:justify-end gap-3 text-[0.5rem] text-slate-400 text-center font-medium">
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center border-dashed">
                GDPR
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center p-1 leading-none">
                ISO<br />27001
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center p-1 leading-none">
                AICPA<br />SOC 2
              </div>
            </div>
          </footer>
        ) : null}

        {isPostCall ? (
          <NextAction
            actionLabel={page.action_label}
            actionLink={page.action_link}
            nextStepDate={page.next_step_date}
          />
        ) : null}
      </div>
    </section>
  )
}
