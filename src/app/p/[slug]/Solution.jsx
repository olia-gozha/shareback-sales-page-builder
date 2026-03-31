export default function Solution({ page }) {
  return (
    <section className="bg-deep-charcoal px-10 py-20 pt-75 space-y-20">
      <div className="space-y-10">
        <div className="text-xl font-normal leading-none text-ghost/36 tracking-[-0.005em]!">Solution</div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <h2 className="text-6xl md:text-8xl lg:text-[124px] font-serif tracking-[-0.04em]! leading-none text-ghost">
            20x yourself
          </h2>
          <div className="text-2xl text-ghost/60 text-normal tracking-[-0.005em]! leading-[150%] max-w-160">
            <p>Shareback handles the operations.</p>
            <p><span className="text-ghost">{page?.company_name}</span> owns the relationship.</p>
          </div>
        </div>
      </div>

      {/* Data Card */}
      <div className="border border-ghost/10 p-10">
        <div className="grid grid-cols-2 md:grid-cols-10 md:gap-y-0 gap-y-2">
          {/* Table Headers */}
          <div className="md:col-span-2 text-base font-normal text-ghost/40 py-4 pl-6.5">
            What you get back
          </div>

          <div className="md:col-span-8 text-base font-normal text-ghost/40 py-4 md:pl-12">
            How you get it
          </div>

          {/* Row 1: Time */}
          <div className="md:col-span-2 py-4 flex md:items-center gap-2 text-base font-normal text-ghost/80 md:border-r border-ghost/10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0013 18.3334C5.39893 18.3334 1.66797 14.6024 1.66797 10.0001C1.66797 5.39771 5.39893 1.66675 10.0013 1.66675C14.6036 1.66675 18.3346 5.39771 18.3346 10.0001C18.3346 14.6024 14.6036 18.3334 10.0013 18.3334ZM10.0013 16.6667C13.6832 16.6667 16.668 13.682 16.668 10.0001C16.668 6.31818 13.6832 3.33341 10.0013 3.33341C6.3194 3.33341 3.33464 6.31818 3.33464 10.0001C3.33464 13.682 6.3194 16.6667 10.0013 16.6667ZM10.8346 10.0001H14.168V11.6667H9.16797V5.83341H10.8346V10.0001Z" />
            </svg>
            <span>Time</span>
          </div>
          <div className="md:col-span-8 py-4 md:pl-12  text-base font-normal text-ghost/80">
            Automatic roadshow prep, CRM updates, outreach drafting
          </div>

          {/* Row 2: Intelligence */}
          <div className="md:col-span-2 py-4 flex md:items-center gap-2 text-base font-normal text-ghost/80 md:border-r border-ghost/10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.1695 0.574463C16.2525 3.15014 17.5 6.4293 17.5 9.99984C17.5 13.5703 16.2525 16.8495 14.1695 19.4253L12.8729 18.3779C14.7244 16.0884 15.8333 13.1737 15.8333 9.99984C15.8333 6.82603 14.7244 3.91122 12.8729 1.62173L14.1695 0.574463ZM10.928 3.19262C12.4323 5.05284 13.3333 7.42112 13.3333 9.99984C13.3333 12.5786 12.4323 14.9468 10.928 16.8071L9.63133 15.7598C10.9043 14.1858 11.6667 12.1818 11.6667 9.99984C11.6667 7.81784 10.9043 5.81391 9.63133 4.23989L10.928 3.19262ZM7.68642 5.81079C8.61225 6.95553 9.16667 8.41292 9.16667 9.99984C9.16667 11.5868 8.61225 13.0442 7.68642 14.1889L6.38983 13.1417C7.08417 12.2831 7.5 11.19 7.5 9.99984C7.5 8.80967 7.08417 7.7166 6.38983 6.85804L7.68642 5.81079ZM4.44492 8.42892C4.79208 8.85825 5 9.40475 5 9.99984C5 10.5949 4.79208 11.1414 4.44492 11.5708L2.5 9.99984L4.44492 8.42892Z" />
            </svg>
            <span>Intelligence</span>
          </div>
          <div className="md:col-span-8 py-4 md:pl-12  text-base font-normal text-ghost/80">
            Living map of relationships, coverage, institutional knowledge
          </div>

          {/* Row 3: Speed */}
          <div className="md:col-span-2 py-4 flex d:items-center gap-2 text-base font-normal text-ghost/80 md:border-r border-ghost/10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.832 7.5H17.4987L9.16536 20V12.5H3.33203L10.832 0V7.5ZM9.16536 9.16667V6.01719L6.27568 10.8333H10.832V14.4953L14.3845 9.16667H9.16536Z" />
            </svg>
            <span>Speed</span>
          </div>
          <div className="md:col-span-8 py-4 md:pl-12  text-base font-normal text-ghost/80">
            Days of email coordination → minutes
          </div>

          {/* Row 4: Leverage */}
          <div className="md:col-span-2 py-4 md:py-6 flex d:items-center gap-2 text-base font-normal text-ghost/80 md:border-r border-ghost/10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.47357 10.1865C9.80088 9.91961 10.2837 9.93902 10.5888 10.2441L14.7558 14.4111C15.0808 14.7364 15.0808 15.2635 14.7558 15.5888C14.4304 15.9142 13.9025 15.9142 13.5771 15.5888L9.99896 12.0117L6.42181 15.5888C6.09638 15.9142 5.56951 15.9142 5.24408 15.5888C4.91864 15.2634 4.91864 14.7365 5.24408 14.4111L9.41009 10.2441L9.47357 10.1865ZM9.41009 4.41107C9.73553 4.08563 10.2634 4.08563 10.5888 4.41107L14.7558 8.57709C15.0812 8.90247 15.0811 9.43035 14.7558 9.7558C14.4304 10.0812 13.9025 10.0812 13.5771 9.7558L9.99896 6.17767L6.42181 9.7558C6.09642 10.081 5.56947 10.081 5.24408 9.7558C4.91864 9.43036 4.91864 8.90252 5.24408 8.57709L9.41009 4.41107Z" />
            </svg>
            <span>Leverage</span>
          </div>
          <div className="md:col-span-8 py-4 md:pl-12  text-base font-normal text-ghost/80">
            Every relationship across your team, mapped, ranked, and ready to action
          </div>

          {/* Row 5: Focus */}
          <div className="md:col-span-2 py-4 flex d:items-center gap-2 text-base font-normal text-ghost md:border-r border-ghost/10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0013 16.6667C13.6832 16.6667 16.668 13.682 16.668 10.0001C16.668 6.31818 13.6832 3.33341 10.0013 3.33341C6.3194 3.33341 3.33464 6.31818 3.33464 10.0001C3.33464 13.682 6.3194 16.6667 10.0013 16.6667ZM10.0013 18.3334C5.39893 18.3334 1.66797 14.6024 1.66797 10.0001C1.66797 5.39771 5.39893 1.66675 10.0013 1.66675C14.6036 1.66675 18.3346 5.39771 18.3346 10.0001C18.3346 14.6024 14.6036 18.3334 10.0013 18.3334ZM10.0013 13.3334C11.8422 13.3334 13.3346 11.841 13.3346 10.0001C13.3346 8.15913 11.8422 6.66675 10.0013 6.66675C8.16035 6.66675 6.66797 8.15913 6.66797 10.0001C6.66797 11.841 8.16035 13.3334 10.0013 13.3334ZM10.0013 15.0001C7.23988 15.0001 5.0013 12.7615 5.0013 10.0001C5.0013 7.23866 7.23988 5.00008 10.0013 5.00008C12.7627 5.00008 15.0013 7.23866 15.0013 10.0001C15.0013 12.7615 12.7627 15.0001 10.0013 15.0001ZM10.0013 11.6667C9.0808 11.6667 8.33464 10.9206 8.33464 10.0001C8.33464 9.07958 9.0808 8.33341 10.0013 8.33341C10.9218 8.33341 11.668 9.07958 11.668 10.0001C11.668 10.9206 10.9218 11.6667 10.0013 11.6667Z" />
            </svg>
            <span>Focus</span>  
          </div>
          <div className="md:col-span-8 py-4 md:pl-12  text-base font-normal text-ghost">
            One question across email, CRM, calendar, and news. One answer
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-2xl text-ghost/60 text-normal tracking-[-0.005em]! leading-[150%] max-w-160">
        CRM management, research, outreach, conference prep, <br className="hidden md:block" />
        internal coordination, follow-ups, daily briefs <span className="font-serif-italic">done for you.</span>
      </p>
    </section>
  )
}
