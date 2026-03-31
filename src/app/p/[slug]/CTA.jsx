import FAQ from './FAQ'
import Process from './Process'

export default function CTA({ activeTab, page }) {

  return (
    <section
      className="bg-ocean bg-[linear-gradient(115.42deg,_#6A949D_37.48%,_#99BBC1_100%)] bg-cover bg-center bg-no-repeat px-10 py-20 pt-75 gap-20 relative"
    >

      <div className="absolute bottom-0 left-0 right-0 before:absolute before:inset-0 before:bg-[#6A949D]/12">
        <img
          src="/sb-clouds-transparent.png"
          alt="Clouds background"
          className="w-full h-full object-contain object-bottom"
        />
      </div>

      {activeTab === 'post-call' ? <FAQ /> : <Process page={page} />}

      {/* Bottom Content: CTA & Footer */}
      <div className="pt-25 space-y-16 sm:space-y-30 md:space-y-50 lg:space-y-95 relative z-10">
        <div className='space-y-4 sm:space-y-8 md:space-y-15'>
          <h2 className="max-w-240 text-6xl md:text-8xl lg:text-[110px] 2xl:text-[140px] 2xl:max-w-254 font-serif tracking-[-0.04em]! leading-none text-white drop-shadow-sm drop-shadow-slate/50">
            Your team can be live this week
          </h2>
          <a
            href="https://calendly.com/lauren-shareback/shareback-personalized-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center p-5 pr-10 gap-3 bg-ocean/16 border-[1.5px] border-white/24 shadow-[0px_2px_4px_color-mix(in_oklab,var(--color-ocean)_1%,transparent),0px_8px_34px_color-mix(in_oklab,var(--color-ocean)_24%,transparent)] rounded-full text-2xl text-white tracking-[-0.02em]! leading-[114%] grow-0 hover:bg-ocean/50 hover:-translate-y-0.5 hover:shadow-[0px_4px_8px_color-mix(in_oklab,var(--color-ocean)_6%,transparent),0px_12px_40px_color-mix(in_oklab,var(--color-ocean)_28%,transparent)] transition-all duration-300 ease-out"
          >
            <div className="transition-transform duration-300 group-hover:translate-x-0.5 relative w-15 h-15 rounded-full bg-white overflow-hidden shrink-0">
              <img
                src="/lauren-avatar.png"
                alt="Lauren Ladd"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-full ring-3 ring-inset ring-white/24 pointer-events-none" />
            </div>
            Book a time
          </a>
        </div>

        <footer className="flex justify-between items-center text-white text-sm w-full">
          <a href="mailto:lauren@shareback.com" className="inline-flex rounded py-1 px-2 hover:bg-mist/10 hover:drop-shadow-sm drop-shadow-slate/50 transition-colors duration-300 ease-out">lauren@shareback.com</a>
          <span>Shareback 2026</span>
        </footer>
      </div>
    </section>
  )
}
