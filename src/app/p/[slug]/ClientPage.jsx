'use client'

import { useState } from 'react'
import Hero from './Hero'
import Problem from './Problem'
import Solution from './Solution'
import SolutionDetails from './SolutionDetails'
import CTA from './CTA'
import CompanySetup from './CompanySetup'
import DailyWorkflow from './DailyWorkflow'
import Investment from './Investment'

export default function ClientPage({ page }) {
  const [activeTab, setActiveTab] = useState('pre-call')

  return (
    <main className="text-deep-charcoal antialiased font-sans">
      {/* <div className="max-w-7xl mx-auto px-6 py-8 md:p-12 lg:p-16"> */}
          <Hero
            page={page}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'pre-call' ? <Problem /> : null}
          {activeTab === 'pre-call' ? <Solution page={page} /> : null}
          {activeTab === 'pre-call' ? <SolutionDetails /> : null}
          {activeTab === 'post-call' ? <CompanySetup page={page} /> : null}
          {activeTab === 'post-call' ? <DailyWorkflow page={page} /> : null}
          {activeTab === 'post-call' ? <Investment page={page} /> : null}
          <CTA activeTab={activeTab} />
      {/* </div> */}
    </main>
  )
}