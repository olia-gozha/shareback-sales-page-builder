// function SharebackIcon() {
//   return (
//     <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 relative z-10 border border-white/60">
//       <svg className="w-3.5 h-3.5 text-slate" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
//       </svg>
//     </div>
//   )
// }

// function ClientIcon({ companyLogo }) {
//   return (
//     <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden relative z-20 border border-white/60">
//       {companyLogo ? (
//         <img
//           src={companyLogo}
//           alt="Client logo"
//           className="w-full h-full object-contain p-1"
//         />
//       ) : (
//         <div className="w-2.5 h-2.5 bg-deep-charcoal rounded-[2px]"></div>
//       )}
//     </div>
//   )
// }
import Process from "./Process"

export default function DailyWorkflow({ page = {} }) {

  return (
    <section className="bg-[#DAEAEE] px-10 py-20 pt-75 space-y-20">
        <div className="space-y-10">
          <div className="text-xl font-normal leading-none text-deep-charcoal/40 tracking-[-0.005em]!">A day on Shareback</div>
          <h2 className="max-w-248 space-y-10 text-5xl font-light tracking-[-0.02em]! leading-[120%] text-deep-charcoal">
            Morning brief with your meetings, contacts, and emails. Meeting prep before every call. Draft replies waiting. Deliverables in minutes. Your AI learns how you work and gets better every week.
          </h2>
        </div>

        <Process 
          showHeading={false}
          theme="dark-on-light"
          page={page} />

        {/* <div>
          <p className="text-sm font-medium text-slate/70 mb-6">
            How it works
          </p>

          <div className="flex flex-col border-t border-white/60">
            <div className="flex border-b border-white/60 bg-white/40 hover:bg-white/50 transition-colors">
              <div className="w-24 md:w-32 py-5 px-5 md:px-6 border-r border-white/60 text-deep-charcoal/88 text-sm md:text-base font-light flex items-center">
                Start
              </div>
              <div className="flex-1 py-5 px-5 md:px-6 flex items-center gap-3 text-sm md:text-base text-deep-charcoal/88 font-light">
                <SharebackIcon />
                You send us names and emails
              </div>
            </div>

            <div className="flex border-b border-white/60 bg-white/40 hover:bg-white/50 transition-colors">
              <div className="w-24 md:w-32 py-5 px-5 md:px-6 border-r border-white/60 text-deep-charcoal/88 text-sm md:text-base font-light flex items-center">
                In 48h
              </div>
              <div className="flex-1 py-5 px-5 md:px-6 flex items-center gap-3 text-sm md:text-base text-deep-charcoal/88 font-light">
                <ClientIcon companyLogo={page.company_logo} />
                We build personal AI for everyone
              </div>
            </div>

            <div className="flex border-b border-white/60 bg-white/40 hover:bg-white/50 transition-colors">
              <div className="w-24 md:w-32 py-5 px-5 md:px-6 border-r border-white/60 text-deep-charcoal/88 text-sm md:text-base font-light flex items-center">
                x10m
              </div>
              <div className="flex-1 py-5 px-5 md:px-6 flex items-center gap-3 text-sm md:text-base text-deep-charcoal/88 font-light">
                <SharebackIcon />
                Everyone sets up in 10 minutes - no training
              </div>
            </div>

            <div className="flex border-b border-white/60 bg-white/40 hover:bg-white/50 transition-colors">
              <div className="w-24 md:w-32 py-5 px-5 md:px-6 border-r border-white/60 text-deep-charcoal/88 text-sm md:text-base font-light flex items-center">
                In 7d
              </div>
              <div className="flex-1 py-5 px-5 md:px-6 flex items-center gap-3 text-sm md:text-base text-deep-charcoal/88 font-light">
                <div className="flex -space-x-1">
                  <ClientIcon companyLogo={page.company_logo} />
                  <SharebackIcon />
                </div>
                We build the company layer together
              </div>
            </div>

            <div className="flex border-b border-white/60 bg-white/40 hover:bg-white/50 transition-colors">
              <div className="w-24 md:w-32 py-5 px-5 md:px-6 border-r border-white/60 text-deep-charcoal/88 text-sm md:text-base font-light flex items-center">
                Ongoing
              </div>
              <div className="flex-1 py-5 px-5 md:px-6 flex items-center gap-3 text-sm md:text-base text-deep-charcoal/88 font-light">
                <div className="flex -space-x-1">
                  <ClientIcon companyLogo={page.company_logo} />
                  <SharebackIcon />
                </div>
                We build workflows and agents with you in a dedicated Slack channel
              </div>
            </div>
          </div>
        </div> */}
    </section>
  )
}
