'use client'

import { useEffect, useMemo, useState } from 'react'
import EditForm from './edit/[id]/EditForm'
import NewPage from './new/page'
import EditorSidebar from '@/components/EditorSidebar'

export default function Home() {
  const [pages, setPages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPageId, setSelectedPageId] = useState(null)
  const [selectedPageData, setSelectedPageData] = useState(null)
  const [selectedLoading, setSelectedLoading] = useState(false)
  const [selectedError, setSelectedError] = useState(null)

  async function loadPages() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/pages', { cache: 'no-store' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load pages')
      }

      setPages(data.pages || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPages()
  }, [])

  useEffect(() => {
    if (selectedPageId && !pages.some((page) => page.id === selectedPageId)) {
      setSelectedPageId(null)
    }
  }, [pages, selectedPageId])

  const selectedPage = useMemo(
    () => pages.find((page) => page.id === selectedPageId) || null,
    [pages, selectedPageId]
  )

  const filteredPages = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (normalizedSearch.length < 2) return pages

    return pages.filter((page) => {
      const name = (page.company_name || '').toLowerCase()
      const slug = (page.slug || '').toLowerCase()
      return name.includes(normalizedSearch) || slug.includes(normalizedSearch)
    })
  }, [pages, searchTerm])

  async function handleCreated() {
    await loadPages()
  }

  useEffect(() => {
    async function loadSelectedPage() {
      if (!selectedPage) {
        setSelectedPageData(null)
        setSelectedError(null)
        setSelectedLoading(false)
        return
      }

      setSelectedLoading(true)
      setSelectedError(null)

      try {
        const res = await fetch(
          `/api/pages/${selectedPage.id}?token=${encodeURIComponent(selectedPage.edit_token)}`,
          { cache: 'no-store' }
        )
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to load page')
        }

        setSelectedPageData(data.page)
      } catch (err) {
        setSelectedPageData(null)
        setSelectedError(err.message)
      } finally {
        setSelectedLoading(false)
      }
    }

    loadSelectedPage()
  }, [selectedPage])

  return (
    <main className="flex h-screen overflow-hidden bg-white">
      <EditorSidebar
        loading={loading}
        error={error}
        pages={pages}
        filteredPages={filteredPages}
        searchTerm={searchTerm}
        selectedPageId={selectedPageId}
        onRefresh={loadPages}
        onCreateNew={() => setSelectedPageId(null)}
        onSearchChange={setSearchTerm}
        onSelectPage={setSelectedPageId}
      />

      <section className="flex-1 min-h-0 overflow-y-auto px-9 py-4">
        {!selectedPage && <NewPage onCreated={handleCreated} />}

        {selectedPage && selectedLoading && (
          <div className="text-sm text-deep-charcoal/48 h-8 flex items-center">Loading page...</div>
        )}

        {selectedPage && selectedError && (
          <div className="text-sm text-red-600">{selectedError}</div>
        )}

        {selectedPage && selectedPageData && (
          <EditForm key={selectedPageData.id} page={selectedPageData} />
        )}
      </section>
    </main>
  )
}
