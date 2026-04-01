'use client'

import { useEffect, useState } from 'react'
import Hero from './Hero'
import Problem from './Problem'
import Solution from './Solution'
import SolutionDetails from './SolutionDetails'
import CTA from './CTA'
import CompanySetup from './CompanySetup'
import DailyWorkflow from './DailyWorkflow'
import Investment from './Investment'

export default function ClientPage({ page }) {
  const hasPostTalkSummary = page.status === 'post-call'
  const [activeTab, setActiveTab] = useState('pre-call')

  useEffect(() => {
    if (!hasPostTalkSummary && activeTab === 'post-call') {
      setActiveTab('pre-call')
    }
  }, [activeTab, hasPostTalkSummary])

  return (
    <main className="text-deep-charcoal antialiased font-sans">
          <Hero
            page={page}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hasPostTalkSummary={hasPostTalkSummary}
          />

          {activeTab === 'pre-call' ? <Problem /> : null}
          {activeTab === 'pre-call' ? <Solution page={page} /> : null}
          {activeTab === 'pre-call' ? <SolutionDetails /> : null}
          {hasPostTalkSummary && activeTab === 'post-call' ? <CompanySetup page={page} /> : null}
          {hasPostTalkSummary && activeTab === 'post-call' ? <DailyWorkflow page={page} /> : null}
          {hasPostTalkSummary && activeTab === 'post-call' ? <Investment page={page} /> : null}
          <CTA activeTab={activeTab} page={page} />
      {/* </div> */}
    </main>
  )
}