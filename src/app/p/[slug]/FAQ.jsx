export default function FAQ() {
  const items = [
    {
      question: 'How fast can we get started?',
      answer:
        'Most teams are live in under a week. We set up personal AI assistants first, then layer in shared workflows.',
    },
    {
      question: 'Do we need to migrate our systems?',
      answer:
        'No migration required. We connect to your existing stack and work with your current tools.',
    },
    {
      question: 'How do you handle security and permissions?',
      answer:
        'Access follows your existing permissions and role boundaries. We configure everything with your IT and compliance requirements.',
    },
    {
      question: 'Who will support us after launch?',
      answer:
        'You get a dedicated channel with the Shareback team for ongoing workflow improvements and agent updates.',
    },
  ]

  return (
    <section className="w-full py-20 md:py-24 px-6 md:px-12 lg:px-16 bg-ghost text-deep-charcoal fade-in">
      <div className="max-w-5xl mx-auto">
        <p className="text-slate/70 text-sm font-medium mb-6">FAQ</p>
        <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1] mb-12 text-deep-charcoal">
          Questions teams ask before rollout
        </h2>

        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.question} className="border border-slate/20 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-lg md:text-xl font-medium text-deep-charcoal mb-2">{item.question}</h3>
              <p className="text-deep-charcoal/80 font-light leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
