"use client"

import { useState } from 'react'
import AppearOnView from '@/components/AppearOnView'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

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
    <div className="space-y-15 pb-15">
      <AppearOnView as="div" animation="up" delay={20} className="space-y-10">
        <div className="text-xl font-normal leading-none text-white/60 tracking-[-0.005em]!">
          What&rsquo;s else</div>
        <h2 className="max-w-236 space-y-10 text-5xl font-light tracking-[-0.02em]! leading-[120%] text-white">
          Questions teams ask before rollout
        </h2>
      </AppearOnView>

      <div className="space-y-4 max-w-180">
        {items.map((item, index) => (
          <AppearOnView
            key={item.question} 
            as="article"
            animation="up"
            delay={90 + index * 45}
            className="border-b border-b-mist/20 pt-2 pb-5 text-white transition-colors duration-300 hover:bg-linear-to-t hover:from-mist/7 hover:to-mist/0"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="w-full cursor-pointer text-left space-y-3 rounded-sm transition-[opacity,background-color] duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mist/60"
              aria-expanded={openIndex === index}
            >
              <span className="text-base leading-none text-white/40">{`${index + 1}/${items.length}`}</span>
              <h3 className="text-2xl font-normal leading-[114%] tracking-[-0.005em]!">{item.question}</h3>
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows,opacity,transform,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${openIndex === index ? 'grid-rows-[1fr] opacity-100 translate-y-0 pt-5' : 'grid-rows-[0fr] opacity-0 -translate-y-0.5 pt-0'}`}
            >
              <p className="min-h-0 text-base font-normal leading-[132%] tracking-normal!">{item.answer}</p>
            </div>
          </AppearOnView>
        ))}
      </div>
    </div>
  )
}
