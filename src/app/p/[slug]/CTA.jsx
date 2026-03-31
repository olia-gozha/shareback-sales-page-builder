import FAQ from './FAQ'
import Process from './Process'

export default function CTA({ activeTab, page }) {

  return (
    <section
      className="bg-ocean px-10 py-20 pt-75 space-y-20"
    >
      {/* Background Image & Gradient Overlay */}
      {/* <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2574&auto=format&fit=crop"
          alt="Clouds background"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/95 via-ocean/80 to-sky-blue/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-ocean/35 backdrop-blur-[2px]"></div>
      </div> */}

      {activeTab === 'post-call' ? <FAQ /> : <Process page={page} />}

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
