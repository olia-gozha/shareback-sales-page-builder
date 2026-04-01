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
    <section className="bg-white px-10 py-20 pt-75 space-y-20">
      <div className="space-y-10">
        <h3 className="text-xl font-normal leading-none text-deep-charcoal/40 tracking-[-0.005em]!">Investment</h3>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="border border-ocean/20 p-13 flex flex-col items-center justify-center">
            <div className="text-center text-[5rem] md:text-[6rem] lg:text-[7rem] leading-none font-serif tracking-tight text-deep-charcoal">
              {people}
            </div>
            <div className="text-base text-deep-charcoal/60">
              people
            </div>
          </div>

          <div className="border border-ocean/20 bg-white p-12 flex flex-col items-center justify-center">
            <div className="text-center text-[5rem] md:text-[6rem] lg:text-[7rem] leading-none font-serif tracking-tight text-deep-charcoal">
              {'\u00A3'}{price}
            </div>
            <div className="text-base text-deep-charcoal/60">
              per person/month
            </div>
          </div>

          <div className="bg-[#DAEAEE] p-12 flex flex-col items-center justify-center">
            <div className="text-center text-[5rem] md:text-[6rem] lg:text-[7rem] leading-none font-serif tracking-tight text-deep-charcoal">
              {'\u00A3'}{formatYearly(yearlyTotal)}
            </div>
            <div className="text-base text-deep-charcoal/60">
              yearly
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <h3 className="text-xl font-normal leading-none text-deep-charcoal/40 tracking-[-0.005em]!">Includes</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-deep-charcoal text-base tracking-[-0.02em]! leading-[150%]">
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

      <hr className="border-t border-ocean/20 w-full mb-20 md:mb-28" />

      <div className="space-y-10 py-10">
        <h3 className="text-xl font-normal leading-none text-deep-charcoal/40 tracking-[-0.005em]!">Our promise</h3>
        <h2 className="text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.95] font-serif tracking-tight text-deep-charcoal">
          Live in <span className="font-light">48</span> hours. <br className="hidden md:block" />
          We build with you ongoing.
        </h2>
      </div>
    </section>
  )
}
