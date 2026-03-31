export default function SolutionDetails() {
  return (
    <section className="bg-ghost w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 fade-in text-deep-charcoal">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div className="text-slate/70 text-sm mb-6 font-medium">
          Solution
        </div>

        {/* Main Header */}
        <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif tracking-tight leading-[0.95] text-deep-charcoal mb-16 md:mb-24 max-w-5xl">
          One surface. Every system,<br className="hidden md:block" />
          relationship, and context unified.
        </h2>

        {/* Cards Container */}
        <div className="space-y-6">
          {/* Card 01: All the best of AI */}
          <div className="border border-slate/20 bg-white p-8 md:p-12 lg:p-16 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0">
              {/* Left Column (Visuals) */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <h3 className="text-sm font-medium text-deep-charcoal mb-12">01 &middot; All the best of AI</h3>

                <div className="flex -space-x-3">
                  <div className="w-14 h-14 rounded-full border border-slate/20 bg-white flex items-center justify-center relative z-40 shadow-sm">
                    <svg className="w-6 h-6 text-deep-charcoal" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"/>
                    </svg>
                  </div>
                  <div className="w-14 h-14 rounded-full border border-slate/20 bg-white flex items-center justify-center relative z-30 shadow-sm">
                    <svg className="w-6 h-6 text-deep-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10H12V2Z"/>
                      <path d="M12 12 2.5 7.5"/>
                      <path d="M12 12 21.5 16.5"/>
                    </svg>
                  </div>
                  <div className="w-14 h-14 rounded-full border border-slate/20 bg-white flex items-center justify-center relative z-20 shadow-sm">
                    <svg className="w-7 h-7 text-deep-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 6v12M17.196 9 6.804 15M6.804 9l10.392 6"/>
                    </svg>
                  </div>
                  <div className="w-14 h-14 rounded-full border border-slate/20 bg-white flex items-center justify-center relative z-10 shadow-sm text-slate/70">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column (Text) */}
              <div className="md:col-span-8 md:pl-12 lg:pl-16 space-y-8 flex flex-col justify-center">
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Multi-LLM</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light">No vendor lock-in. Best of every model.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Applied to you</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light max-w-md">When AI unlocks a new capability, we figure out how it applies to your team specifically and add it.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Applied to you</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light max-w-md">When AI unlocks a new capability, we figure out how it applies to your team specifically and add it.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 02: Your data */}
          <div className="border border-slate/20 bg-white p-8 md:p-12 lg:p-16 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0">
              {/* Left Column (Visuals) */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <h3 className="text-sm font-medium text-deep-charcoal mb-8">02 &middot; Your data</h3>

                <div className="grid grid-cols-7 gap-y-4 gap-x-2 max-w-[240px]">
                  {[...Array(21)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-deep-charcoal" viewBox="0 0 24 24" fill="currentColor">
                        {i % 3 === 0 && <rect x="3" y="3" width="18" height="18" rx="4" />}
                        {i % 3 === 1 && <circle cx="12" cy="12" r="9" />}
                        {i % 3 === 2 && <path d="M12 2L2 22H22L12 2Z" />}
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (Text) */}
              <div className="md:col-span-8 md:pl-12 lg:pl-16 space-y-8 flex flex-col justify-center">
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Personal Tools</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light">E.g. email, calendar, notes</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Personal AI</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light">E.g. searches, analysis, history</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Personal Network</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light">E.g. LinkedIn, contacts, meetings</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Internal Tooling</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light">E.g. Salesforce, Sharepoint, Teams</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">External Data sources</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light">E.g. Deep open source, newsletters, Pitchbook, Dakota, eVestment etc</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 03: Your work context */}
          <div className="border border-slate/20 bg-white p-8 md:p-12 lg:p-16 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0">
              {/* Left Column (Visuals) */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <h3 className="text-sm font-medium text-deep-charcoal mb-12">03 &middot; Your work context</h3>

                <div className="flex -space-x-6">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-slate/30 overflow-hidden relative z-20 shadow-sm">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Work" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-sky-blue/30 overflow-hidden relative z-10 blur-[2px] opacity-70">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Context" alt="Avatar Blur" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Right Column (Text) */}
              <div className="md:col-span-8 md:pl-12 lg:pl-16 space-y-8 flex flex-col justify-center">
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Individuals</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light">Role, tenure, ways of working, location</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-deep-charcoal mb-1">Company</h4>
                  <p className="text-sm text-deep-charcoal/88 font-light">Templates, SOPs, tone of voice, history</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-deep-charcoal/88 font-light max-w-md">
                    Every answer and action is through your lens because it understands not just what to do but <span className="italic font-serif">why it is doing something.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
