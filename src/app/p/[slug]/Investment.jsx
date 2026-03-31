export default function Investment({ page = {} }) {
  const people = page.investment_people || 120
  const price = page.investment_price || 50
  const yearlyTotal = people * price * 12

  const formatYearly = (num) => {
    if (num >= 1000) {
      const divided = num / 1000
      return `${Number.isInteger(divided) ? divided : divided.toFixed(1)}K`
    }
    return `${num}`
  }

  const features = page.investment_features?.length > 0
    ? page.investment_features
    : [
        'Personal AI for everyone',
        'All integrations',
        'Company Brain',
        'Dedicated Slack channel',
        'Continuous improvement',
      ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 font-sans bg-ghost fade-in text-deep-charcoal">
      <div className="mb-16">
        <h3 className="text-sm text-slate/70 mb-6 font-medium">Investment</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="border border-slate/20 bg-white p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-[5rem] md:text-[6rem] lg:text-[7rem] leading-none font-serif tracking-tight text-deep-charcoal">
              {people}
            </div>
            <div className="text-xs text-slate/88 mt-2 font-medium">
              people
            </div>
          </div>

          <div className="border border-slate/20 bg-white p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-[5rem] md:text-[6rem] lg:text-[7rem] leading-none font-serif tracking-tight text-deep-charcoal">
              {'\u00A3'}{price}
            </div>
            <div className="text-xs text-slate/88 mt-2 font-medium">
              per person/month
            </div>
          </div>

          <div className="bg-mist p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-[5rem] md:text-[6rem] lg:text-[7rem] leading-none font-serif tracking-tight text-deep-charcoal">
              {'\u00A3'}{formatYearly(yearlyTotal)}
            </div>
            <div className="text-xs text-slate/88 mt-2 font-medium">
              yearly
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24 md:mb-32">
        <h3 className="text-sm text-slate/70 mb-6 font-medium">Includes</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-deep-charcoal font-medium">
              <svg
                className="w-4 h-4 mr-3 shrink-0 text-deep-charcoal"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-t border-slate/20 w-full mb-24 md:mb-32" />

      <div>
        <h3 className="text-sm text-slate/70 mb-8 font-medium">Our promise</h3>
        <h2 className="text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.95] font-serif tracking-tight text-deep-charcoal">
          Live in <span className="font-light">48</span> hours. <br className="hidden md:block" />
          We build with you ongoing.
        </h2>
      </div>
    </section>
  )
}
