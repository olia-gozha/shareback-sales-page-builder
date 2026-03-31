export default function Process({ page }) {
  return (
    <div className="space-y-10 pb-15">
      <div className="space-y-10">
        <div className="text-xl font-normal leading-none text-white/60 tracking-[-0.005em]!">How it works</div>

        <h2 className="max-w-236 space-y-10 text-5xl font-light tracking-[-0.02em]! leading-[120%] text-white">
            Every person at {page?.company_name} gets a personal AI. It knows their job, their clients, and how they work. It sits on a shared company brain that knows the firm.
        </h2>
      </div>

      {/* Timeline Table */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-0.5 ">
          <div className="p-5 bg-mist/12 text-white text-xl font-normal flex items-center tracking-[-0.005em]!">
            Start
          </div>
          <div className="gap-2 bg-linear-to-r from-mist/12 to-mist/0 text-white text-xl font-normal flex items-center p-5 tracking-[-0.005em]!">
            <div className="w-8 h-8 overflow-hidden rounded-full bg-white border-2 border-ocean flex items-center justify-center shrink-0">
              <img 
                src={page?.company_logo}
                alt={page?.company_name}
                className="w-full h-full object-cover"
              />
            </div>
            <span>You send us names and emails</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-0.5 ">
          <div className="p-5 bg-mist/12 text-white text-xl font-normal flex items-center tracking-[-0.005em]!">
            In 48h
          </div>
          <div className="gap-2 bg-linear-to-r from-mist/12 to-mist/0 text-white text-xl font-normal flex items-center p-5 tracking-[-0.005em]!">
            <div className="w-8 h-8 overflow-hidden rounded-full bg-white border-2 border-ocean flex items-center justify-center shrink-0">
              <img 
                src="/sb-logomark.svg"
                alt="Shareback logomark"
                className="w-full h-full object-cover"
              />
            </div>
            <span>We build personal AI for everyone</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-0.5 ">
          <div className="p-5 bg-mist/12 text-white text-xl font-normal flex items-center tracking-[-0.005em]!">
            x10m
          </div>
          <div className="gap-2 bg-linear-to-r from-mist/12 to-mist/0 text-white text-xl font-normal flex items-center p-5 tracking-[-0.005em]!">
            <div className="w-8 h-8 overflow-hidden rounded-full bg-white border-2 border-ocean flex items-center justify-center shrink-0">
              <img 
                src={page?.company_logo}
                alt={page?.company_name}
                className="w-full h-full object-cover"
              />
            </div>
            <span>Everyone sets up in 10 minutes - no training</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-0.5 ">
          <div className="p-5 bg-mist/12 text-white text-xl font-normal flex items-center tracking-[-0.005em]!">
            In 7d
          </div>
          <div className="gap-2 bg-linear-to-r from-mist/12 to-mist/0 text-white text-xl font-normal flex items-center p-5 tracking-[-0.005em]!">
            <div className="flex -space-x-1.5 mr-1">
              <div className="w-8 h-8 overflow-hidden rounded-full bg-white border-2 border-ocean flex items-center justify-center shrink-0">
                <img 
                  src="/sb-logomark.svg"
                  alt="Shareback logomark"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 overflow-hidden rounded-full bg-white border-2 border-ocean flex items-center justify-center shrink-0">
                <img 
                  src={page?.company_logo}
                  alt={page?.company_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span>We build the company layer together</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-0.5 ">
          <div className="p-5 bg-mist/12 text-white text-xl font-normal flex items-center tracking-[-0.005em]!">
            Ongoing
          </div>
          <div className="gap-2 bg-linear-to-r from-mist/12 to-mist/0 text-white text-xl font-normal flex items-center p-5 tracking-[-0.005em]!">
            <div className="flex -space-x-1.5 mr-1">
              <div className="w-8 h-8 overflow-hidden rounded-full bg-white border-2 border-ocean flex items-center justify-center shrink-0">
                <img 
                  src="/sb-logomark.svg"
                  alt="Shareback logomark"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 overflow-hidden rounded-full bg-white border-2 border-ocean flex items-center justify-center shrink-0">
                <img 
                  src={page?.company_logo}
                  alt={page?.company_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span>We build workflows and agents with you in a dedicated Slack channel</span>
          </div>
        </div>
      </div>
    </div>
  )
}
