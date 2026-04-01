export default function Process({ 
  page={},
  showHeading = true,
  theme = "light-on-dark"
}) {
  const isDark = theme === "dark-on-light"

  const headingLabelClass = isDark ? "text-deep-charcoal/40" : "text-white/60"
  const headingTitleClass = isDark ? "text-deep-charcoal" : "text-white"
  const timelineStepClass = isDark ? "bg-white/34 text-deep-charcoal" : "bg-mist/12 text-white"
  const timelineDetailClass = isDark
    ? "bg-linear-to-r from-white/30 to-white/0 text-deep-charcoal"
    : "bg-linear-to-r from-mist/12 to-mist/0 text-white"
  const imageContainerClass = isDark ? "border-[#DEEDF0]" : "border-ocean"

  return (
    <div className="space-y-10 pb-15">
      <div className="space-y-10">
        <div className={`text-xl font-normal leading-none tracking-[-0.005em]! ${headingLabelClass}`}>How it works</div>

        {showHeading && (
          <h2 className={`max-w-236 space-y-10 text-5xl font-light tracking-[-0.02em]! leading-[120%] ${headingTitleClass}`}>
              Every person at {page?.company_name} gets a personal AI. It knows their job, their clients, and how they work. It sits on a shared company brain that knows the firm.
          </h2>
        )}
      </div>

      {/* Timeline Table */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-0.5 ">
          <div className={`p-5 text-xl font-normal flex items-center tracking-[-0.005em]! ${timelineStepClass}`}>
            Start
          </div>
          <div className={`gap-2 text-xl font-normal flex items-center p-5 tracking-[-0.005em]! ${timelineDetailClass}`}>
            <div className={`w-8 h-8 overflow-hidden rounded-full bg-white border-2 flex items-center justify-center shrink-0 ${imageContainerClass}`}>
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
          <div className={`p-5 text-xl font-normal flex items-center tracking-[-0.005em]! ${timelineStepClass}`}>
            In 48h
          </div>
          <div className={`gap-2 text-xl font-normal flex items-center p-5 tracking-[-0.005em]! ${timelineDetailClass}`}>
            <div className={`w-8 h-8 overflow-hidden rounded-full bg-white border-2 flex items-center justify-center shrink-0 ${imageContainerClass}`}>
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
          <div className={`p-5 text-xl font-normal flex items-center tracking-[-0.005em]! ${timelineStepClass}`}>
            x10m
          </div>
          <div className={`gap-2 text-xl font-normal flex items-center p-5 tracking-[-0.005em]! ${timelineDetailClass}`}>
            <div className={`w-8 h-8 overflow-hidden rounded-full bg-white border-2 flex items-center justify-center shrink-0 ${imageContainerClass}`}>
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
          <div className={`p-5 text-xl font-normal flex items-center tracking-[-0.005em]! ${timelineStepClass}`}>
            In 7d
          </div>
          <div className={`gap-2 text-xl font-normal flex items-center p-5 tracking-[-0.005em]! ${timelineDetailClass}`}>
            <div className="flex -space-x-1.5 mr-1">
              <div className={`w-8 h-8 overflow-hidden rounded-full bg-white border-2 flex items-center justify-center shrink-0 ${imageContainerClass}`}>
                <img 
                  src="/sb-logomark.svg"
                  alt="Shareback logomark"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`w-8 h-8 overflow-hidden rounded-full bg-white border-2 flex items-center justify-center shrink-0 ${imageContainerClass}`}>
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
          <div className={`p-5 text-xl font-normal flex items-center tracking-[-0.005em]! ${timelineStepClass}`}>
            Ongoing
          </div>
          <div className={`gap-2 text-xl font-normal flex items-center p-5 tracking-[-0.005em]! ${timelineDetailClass}`}>
            <div className="flex -space-x-1.5 mr-1">
              <div className={`w-8 h-8 overflow-hidden rounded-full bg-white border-2 flex items-center justify-center shrink-0 ${imageContainerClass}`}>
                <img 
                  src="/sb-logomark.svg"
                  alt="Shareback logomark"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`w-8 h-8 overflow-hidden rounded-full bg-white border-2 flex items-center justify-center shrink-0 ${imageContainerClass}`}>
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
