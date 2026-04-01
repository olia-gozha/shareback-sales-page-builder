import AppearOnView from '@/components/AppearOnView'

export default function CompanySetup({ page }) {
  return (
    <section className="bg-white px-10 py-20 pt-75 space-y-20">
      <AppearOnView as="div" animation="up" delay={20} className="space-y-10">
        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight mb-16 md:mb-24">
          {page.company_name} setup
        </h2>
      </AppearOnView>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column: Team */}
        <AppearOnView as="div" animation="up" delay={100} className="lg:col-span-8 space-y-5">
          <h3 className="text-xl font-normal leading-none text-deep-charcoal/40 tracking-[-0.005em]!">Team</h3>

          <div className="space-y-6">
            {page.team?.map((member, index) => (
              <AppearOnView key={index} as="div" animation="up" delay={160 + index * 45} className="border border-ocean/20 p-8 md:p-12 lg:p-15">
                {/* Name & Role */}
                <div className="space-y-2 pb-10">
                  <h4 className="text-base font-medium text-deep-charcoal tracking-[-0.005em]! leading-none">{member.full_name}</h4>
                  <p className="text-base font-normal text-deep-charcoal/60 tracking-[-0.005em]! leading-none">{member.role}</p>
                </div>

                {/* Focus & Description Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* AI Focus */}
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full border border-slate/30 flex items-center justify-center shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]"></div>
                      <div className="w-8 h-8 rounded-full bg-sky-blue/35 blur-[3px] opacity-70"></div>
                    </div>

                    <div className="text-sm text-deep-charcoal/60 tracking-[-0.005em]! leading-[132%]">
                      AI focus on
                      <br />
                        {member.ai_focus
                          ? member.ai_focus.charAt(0).toLowerCase() + member.ai_focus.slice(1)
                          : member.ai_focus}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-base font-normal text-deep-charcoal tracking-[-0.005em]! leading-[150%]">
                    {member.description}
                  </div>
                </div>
              </AppearOnView>
            ))}
          </div>
        </AppearOnView>

        {/* Right Column: World */}
        <AppearOnView as="div" animation="left" delay={140} className="lg:col-span-4 space-y-10 lg:px-10">
          <h3 className="text-xl font-normal leading-none text-deep-charcoal/40 tracking-[-0.005em]!">World</h3>

          <div className="space-y-10">
            {page.company_world?.industry && (
              <div className="space-y-2">
                <h4 className="text-base font-medium text-deep-charcoal tracking-[-0.005em]! leading-none">Industry</h4>
                <p className="text-base font-normal text-deep-charcoal tracking-[-0.005em]! leading-[150%]">
                  {page.company_world.industry}
                </p>
              </div>
            )}
            {page.company_world?.key_relationships && (
              <div className="space-y-2">
                <h4 className="text-base font-medium text-deep-charcoal tracking-[-0.005em]! leading-none">Key relationships</h4>
                <p className="text-base font-normal text-deep-charcoal tracking-[-0.005em]! leading-[150%]">
                  {page.company_world.key_relationships}
                </p>
              </div>
            )}
            {page.company_world?.competitors && (
              <div className="space-y-2">
                <h4 className="text-base font-medium text-deep-charcoal tracking-[-0.005em]! leading-none">Competitors</h4>
                <p className="text-base font-normal text-deep-charcoal tracking-[-0.005em]! leading-[150%]">
                  {page.company_world.competitors}
                </p>
              </div>
            )}
          </div>
        </AppearOnView>
      </div>
    </section>
  )
}
