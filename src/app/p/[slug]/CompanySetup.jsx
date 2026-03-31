export default function CompanySetup({ page }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 font-sans bg-ghost fade-in text-deep-charcoal">
      {/* Dynamic Header */}
      <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight mb-16 md:mb-24">
        {page.company_name} setup
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column: Team */}
        <div className="lg:col-span-8">
          <h3 className="text-lg text-slate/70 mb-8 font-medium">Team</h3>

          <div className="space-y-6">
            {page.team?.map((member, index) => (
              <div key={index} className="border border-slate/20 bg-white p-8 md:p-10 lg:p-12">
                {/* Name & Role */}
                <div className="mb-12">
                  <h4 className="text-base font-semibold text-deep-charcoal">{member.full_name}</h4>
                  <p className="text-sm text-slate/88 mt-1">{member.role}</p>
                </div>

                {/* Focus & Description Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  {/* AI Focus */}
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full border border-slate/30 flex items-center justify-center shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]"></div>
                      <div className="w-8 h-8 rounded-full bg-sky-blue/35 blur-[3px] opacity-70"></div>
                    </div>

                    <div className="text-xs text-slate/88 leading-snug">
                      AI focus on
                      <br />
                      <span className="text-slate">{member.ai_focus}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-[0.85rem] text-deep-charcoal/88 leading-relaxed font-light">
                    {member.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: World */}
        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <h3 className="text-lg text-slate/70 mb-8 font-medium">World</h3>

          <div className="space-y-10">
            {/* Industry */}
            {page.company_world?.industry && (
              <div>
                <h4 className="text-sm font-semibold text-deep-charcoal mb-3">Industry</h4>
                <p className="text-[0.85rem] text-deep-charcoal/88 font-light leading-relaxed">
                  {page.company_world.industry}
                </p>
              </div>
            )}

            {/* Key Relationships */}
            {page.company_world?.key_relationships && (
              <div>
                <h4 className="text-sm font-semibold text-deep-charcoal mb-3">Key relationships</h4>
                <p className="text-[0.85rem] text-deep-charcoal/88 font-light leading-relaxed">
                  {page.company_world.key_relationships}
                </p>
              </div>
            )}

            {/* Competitors */}
            {page.company_world?.competitors && (
              <div>
                <h4 className="text-sm font-semibold text-deep-charcoal mb-3">Competitors</h4>
                <p className="text-[0.85rem] text-deep-charcoal/88 font-light leading-relaxed">
                  {page.company_world.competitors}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
