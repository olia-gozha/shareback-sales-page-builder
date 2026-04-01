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
    </section>
  )
}
