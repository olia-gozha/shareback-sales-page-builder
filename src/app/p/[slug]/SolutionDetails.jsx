export default function SolutionDetails() {
  return (
    <section className="bg-white px-10 py-20 pt-75 space-y-20">
      <div className="space-y-10">
        {/* Label */}
        <div className="text-xl font-normal leading-none text-deep-charcoal/40 tracking-[-0.005em]!">Solution</div>
        <h2 className="text-6xl md:text-8xl lg:text-[124px] font-serif tracking-[-0.04em]! leading-none text-deep-charcoal">
          One surface. Every system,<br className="hidden md:block" />
          relationship, and context unified.
        </h2>
      </div>

      <div className="space-y-5">
        <div className="border border-ocean/20 p-8 md:p-12 lg:p-15 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0">
          {/* Left Column (Visuals) */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <h3 className="space-x-1 text-base font-medium text-deep-charcoal tracking-[-0.02em]! leading-[114%]"><span>01</span> <span>&middot;</span> <span>All the best of AI</span></h3>

            <div className="max-w-60">
              <img
                src="/solution-card-01.png"
                alt="All the best of AI visual"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column (Text) */}
          <div className="md:col-span-8 md:pl-12 lg:pl-16 space-y-8 flex flex-col justify-center">
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Multi-LLM</h4>
              <p>No vendor lock-in. Best of every model.</p>
            </div>
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Applied to you</h4>
              <p>When AI unlocks a new capability, we figure out how it applies to your team specifically and add it.</p>
            </div>
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Applied to you</h4>
              <p>When AI unlocks a new capability, we figure out how it applies to your team specifically and add it.</p>
            </div>
          </div>
        </div>

        {/* Card 02: Your data */}
        <div className="border border-ocean/20 p-8 md:p-12 lg:p-15 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0">
          {/* Left Column (Visuals) */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <h3 className="space-x-1 text-base font-medium text-deep-charcoal tracking-[-0.02em]! leading-[114%]"><span>02</span> <span>&middot;</span> <span>Your data</span></h3>

            <div className="max-w-100">
              <img
                src="/solution-card-02.png"
                alt="Your data integrations visual"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column (Text) */}
          <div className="md:col-span-8 md:pl-12 lg:pl-16 space-y-8 flex flex-col justify-center">
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Personal Tools</h4>
              <p>E.g. email, calendar, notes</p>
            </div>
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Personal AI</h4>
              <p>E.g. searches, analysis, history</p>
            </div>
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Personal Network</h4>
              <p>E.g. LinkedIn, contacts, meetings</p>
            </div>
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Internal Tooling</h4>
              <p>E.g. Salesforce, Sharepoint, Teams</p>
            </div>
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">External Data sources</h4>
              <p>E.g. Deep open source, newsletters, Pitchbook, Dakota, eVestment etc</p>
            </div>
          </div>
        </div>

        {/* Card 03: Your work context */}
        <div className="border border-ocean/20 p-8 md:p-12 lg:p-15 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0">
          {/* Left Column (Visuals) */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <h3 className="space-x-1 text-base font-medium text-deep-charcoal tracking-[-0.02em]! leading-[114%]"><span>03</span> <span>&middot;</span> <span>Your work context</span></h3>

            <div className="max-w-60">
              <img
                src="/solution-card-03.png"
                alt="Your work context visual"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column (Text) */}
          <div className="md:col-span-8 md:pl-12 lg:pl-16 space-y-8 flex flex-col justify-center">
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Individuals</h4>
              <p>Role, tenure, ways of working, location</p>
            </div>
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <h4 className="font-medium">Company</h4>
              <p>Templates, SOPs, tone of voice, history</p>
            </div>
            <div className="max-w-115 text-base text-deep-charcoal tracking-[-0.02em]! leading-[150%] space-y-2">
              <p>Every answer and action is through your lens because it understands not just what to do but <span className=" font-serif-italic">why it is doing something.</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
