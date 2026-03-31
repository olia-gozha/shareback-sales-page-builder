import FAQ from './FAQ'

export default function CTA({ activeTab }) {
  if (activeTab === 'post-call') {
    return <FAQ />
  }

  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-between px-6 md:px-12 lg:px-16 py-12 md:py-16 text-white overflow-hidden fade-in"
    >
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2574&auto=format&fit=crop"
          alt="Clouds background"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/95 via-ocean/80 to-sky-blue/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-ocean/35 backdrop-blur-[2px]"></div>
      </div>

      {/* Top Content: How it works & Timeline */}
      <div className="relative z-10 max-w-5xl">
        <p className="text-white/70 text-sm font-medium mb-6">
          How it works
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-snug tracking-tight mb-16 max-w-4xl text-white/95">
          Every person at Quantiffind gets a personal AI. <br className="hidden md:block" />
          It knows their job, their clients, and how they work. It <br className="hidden md:block" />
          sits on a shared company brain that knows the firm.
        </h2>

        {/* Timeline Table */}
        <div className="max-w-3xl flex flex-col border-t border-white/20">
          <div className="flex border-b border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <div className="w-24 md:w-32 py-4 px-4 md:px-6 border-r border-white/20 text-white/80 text-sm md:text-base font-light flex items-center">
              Start
            </div>
            <div className="flex-1 py-4 px-4 md:px-6 flex items-center gap-3 text-sm md:text-base text-white font-light">
              <div className="w-5 h-5 rounded-full bg-white text-ocean flex items-center justify-center shrink-0">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>
              </div>
              You send us names and emails
            </div>
          </div>

          <div className="flex border-b border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <div className="w-24 md:w-32 py-4 px-4 md:px-6 border-r border-white/20 text-white/80 text-sm md:text-base font-light flex items-center">
              In 48h
            </div>
            <div className="flex-1 py-4 px-4 md:px-6 flex items-center gap-3 text-sm md:text-base text-white font-light">
              <div className="w-5 h-5 rounded-full bg-deep-charcoal border border-white/40 text-white flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              We build personal AI for everyone
            </div>
          </div>

          <div className="flex border-b border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <div className="w-24 md:w-32 py-4 px-4 md:px-6 border-r border-white/20 text-white/80 text-sm md:text-base font-light flex items-center">
              x10m
            </div>
            <div className="flex-1 py-4 px-4 md:px-6 flex items-center gap-3 text-sm md:text-base text-white font-light">
              <div className="w-5 h-5 rounded-full bg-white text-ocean flex items-center justify-center shrink-0">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>
              </div>
              Everyone sets up in 10 minutes - no training
            </div>
          </div>

          <div className="flex border-b border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <div className="w-24 md:w-32 py-4 px-4 md:px-6 border-r border-white/20 text-white/80 text-sm md:text-base font-light flex items-center">
              In 7d
            </div>
            <div className="flex-1 py-4 px-4 md:px-6 flex items-center gap-2 text-sm md:text-base text-white font-light">
              <div className="flex -space-x-1 mr-1">
                <div className="w-5 h-5 rounded-full bg-deep-charcoal border border-white text-white flex items-center justify-center shrink-0 relative z-20">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
                <div className="w-5 h-5 rounded-full bg-white border border-white text-ocean flex items-center justify-center shrink-0 relative z-10">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>
                </div>
              </div>
              We build the company layer together
            </div>
          </div>

          <div className="flex border-b border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <div className="w-24 md:w-32 py-4 px-4 md:px-6 border-r border-white/20 text-white/80 text-sm md:text-base font-light flex items-center">
              Ongoing
            </div>
            <div className="flex-1 py-4 px-4 md:px-6 flex items-center gap-2 text-sm md:text-base text-white font-light">
              <div className="flex -space-x-1 mr-1">
                <div className="w-5 h-5 rounded-full bg-deep-charcoal border border-white text-white flex items-center justify-center shrink-0 relative z-20">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
                <div className="w-5 h-5 rounded-full bg-white border border-white text-ocean flex items-center justify-center shrink-0 relative z-10">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>
                </div>
              </div>
              We build workflows and agents with you in a dedicated Slack channel
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Content: CTA & Footer */}
      <div className="relative z-10 mt-32 md:mt-40 flex flex-col">
        <h2 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif tracking-tight leading-[0.9] mb-10 text-white drop-shadow-sm">
          Your team can be live <br className="hidden md:block" />
          this week
        </h2>

        <div className="mb-24">
          <a
            href="#"
            className="inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md rounded-full pr-8 pl-1.5 py-1.5 transition-all shadow-lg"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0">
              <img
                src="/lauren-avatar.png"
                alt="Lauren"
                className="w-full h-full object-cover bg-slate/20"
              />
            </div>
            <span className="text-xl md:text-2xl font-light tracking-wide text-white">Book a time</span>
          </a>
        </div>

        <footer className="flex justify-between items-end text-white/70 text-xs font-medium uppercase tracking-wider w-full">
          <a href="mailto:lauren@shareback.com" className="hover:text-white transition-colors">lauren@shareback.com</a>
          <span>Shareback 2026</span>
        </footer>
      </div>
    </section>
  )
}
