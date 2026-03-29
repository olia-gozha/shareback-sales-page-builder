'use client'

import TabLayout from '@/components/TabLayout'

function PreSaleTab({ page }) {
  return (
    <div className="space-y-6">
      {page.company_logo && (
        <img
          src={page.company_logo}
          alt={`${page.company_name} logo`}
          className="h-16 object-contain"
        />
      )}
      <h1 className="text-3xl font-bold">{page.company_name}</h1>
      {page.company_summary && (
        <div dangerouslySetInnerHTML={{ __html: page.company_summary }} />
      )}
    </div>
  )
}

function PostSaleTab({ page }) {
  // If no post-sale content yet, show a placeholder
  const hasPostSale = page.talk_summary || page.features?.length > 0

  if (!hasPostSale) {
    return (
      <div className="py-12 text-center text-gray-400">
        Content will appear here after our conversation.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Talk Summary */}
      {page.talk_summary && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <div dangerouslySetInnerHTML={{ __html: page.talk_summary }} />
        </section>
      )}

      {/* Features */}
      {page.features?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-5 space-y-1">
            {page.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Action */}
      {page.action_label && page.action_link && (
        <section>
        <a
            href={page.action_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {page.action_label}
          </a>
        </section>
      )}

      {/* Next Step Date */}
      {page.next_step_date && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Next Step</h2>
          <p>{new Date(page.next_step_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
        </section>
      )}

      {/* Team */}
      {page.team?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.team.map((member, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <p className="font-semibold">{member.full_name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
                {member.ai_focus && (
                  <p className="text-sm mt-1">AI Focus: {member.ai_focus}</p>
                )}
                {member.description && (
                  <p className="text-sm mt-1 text-gray-600">{member.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Company World */}
      {page.company_world && Object.keys(page.company_world).length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Company World</h2>
          {page.company_world.industry && (
            <div className="mb-3">
              <h3 className="font-medium">Industry</h3>
              <div dangerouslySetInnerHTML={{ __html: page.company_world.industry }} />
            </div>
          )}
          {page.company_world.key_relationships && (
            <div className="mb-3">
              <h3 className="font-medium">Key Relationships</h3>
              <div dangerouslySetInnerHTML={{ __html: page.company_world.key_relationships }} />
            </div>
          )}
          {page.company_world.competitors && (
            <div className="mb-3">
              <h3 className="font-medium">Competitors</h3>
              <div dangerouslySetInnerHTML={{ __html: page.company_world.competitors }} />
            </div>
          )}
        </section>
      )}

      {/* Investment */}
      {(page.investment_people || page.investment_price) && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Investment</h2>
          {page.investment_people && (
            <p>{page.investment_people} people</p>
          )}
          {page.investment_price && (
            <p>${page.investment_price}/person/month</p>
          )}
        </section>
      )}

      {/* Investment Features */}
      {page.investment_features?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">What&apos;s Included</h2>
          <ul className="list-disc pl-5 space-y-1">
            {page.investment_features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default function ClientPage({ page }) {
  const tabs = [
    {
      label: page.company_name || 'About',
      content: <PreSaleTab page={page} />,
    },
    {
      label: 'Proposal',
      content: <PostSaleTab page={page} />,
    },
  ]

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <TabLayout tabs={tabs} />
    </main>
  )
}