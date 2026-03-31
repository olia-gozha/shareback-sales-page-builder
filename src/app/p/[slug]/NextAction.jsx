import { ArrowRight } from 'lucide-react'

function formatDate(dateString) {
  if (!dateString) return null

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function NextAction({ actionLabel, actionLink, nextStepDate }) {
  const displayDate = formatDate(nextStepDate)

  if (!actionLabel && !actionLink && !displayDate) {
    return null
  }

  return (
    <section className="pt-12 border-t border-slate-200/60 flex gap-8 text-left pb-6 items-center">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-normal leading-none text-deep-charcoal/40 tracking-[-0.005em]!">Next step</h3>
        {displayDate ? (
          <p className="text-xl font-normal leading-none text-deep-charcoal tracking-[-0.005em]!">
            {displayDate}
          </p>
        ) : null}
      </div>

      {actionLabel && actionLink ? (
        <a
          href={actionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center p-5 pr-10 gap-3 bg-ocean/16 border-[1.5px] border-white/24 shadow-[0px_2px_4px_color-mix(in_oklab,var(--color-ocean)_1%,transparent),0px_8px_34px_color-mix(in_oklab,var(--color-ocean)_24%,transparent)] rounded-full text-2xl text-deep-charcoal tracking-[-0.02em]! leading-[114%] grow-0 hover:bg-[#daeaee] hover:-translate-y-0.5 hover:shadow-[0px_4px_8px_color-mix(in_oklab,var(--color-ocean)_6%,transparent),0px_12px_40px_color-mix(in_oklab,var(--color-ocean)_28%,transparent)] transition-all duration-300 ease-out"
        >
          <div className='bg-white rounded-full flex items-center justify-center p-1 transition-transform duration-300 group-hover:translate-x-0.5'>
            <ArrowRight size={24} />
          </div>
          {actionLabel}
        </a>
      ) : null}

      
    </section>
  )
}
