'use client'

import { useState } from 'react'

export default function TabLayout({ tabs }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === index
                ? 'bg-white text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  )
}