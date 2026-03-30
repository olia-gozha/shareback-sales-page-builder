import { Menu, Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import useMounted from '@/lib/useMounted'

const styles = {
  aside: "shrink-0 bg-white bg-gradient-to-b  from-mist/9 to-mist/9 flex flex-col transition-all duration-200 border-r border-r-slate/12",
  menu: "cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-deep-charcoal/5 hover:text-deep-charcoal",
  createBtn: "cursor-pointer self-start text-sm mb-3 flex flex-row items-center gap-1 bg-white py-2 pr-4 pl-2.5 rounded-md border border-slate/10 shadow-[0px_2px_10px_color-mix(in_oklab,var(--color-slate)_10%,transparent)] hover:bg-slate/2 transition-colors duration-200 text-deep-charcoal",
  searchField: "cursor-pointer text-sm flex flex-row items-center gap-1 bg-transparent py-2 pr-4 pl-2.5 hover:bg-gradient-to-b hover:from-deep-charcoal/1 hover:to-deep-charcoal/1 hover:bg-mist/9 transition-colors duration-200 text-deep-charcoal rounded-md appearance-none outline-none ring-0 border border-transparent focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-deep-charcoal focus-visible:ring-2 focus-visible:ring-deep-charcoal w-full",
  pageItem: "cursor-pointer text-sm flex flex-col gap-1 bg-transparent py-2 px-3 hover:bg-gradient-to-b hover:from-deep-charcoal/1 hover:to-deep-charcoal/1 hover:bg-mist/9  transition-colors duration-200 text-deep-charcoal rounded-md appearance-none outline-none ring-0 border border-transparent focus:outline-none focus-visible:outline-none w-full text-left font-normal leading-[1.25] shrink-0",
}

export default function EditorSidebar({
  loading,
  error,
  pages,
  filteredPages,
  searchTerm,
  selectedPageId,
  onRefresh,
  onCreateNew,
  onSearchChange,
  onSelectPage,
})
{
  const isMounted = useMounted()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (!isMounted) return

    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMounted])

  return isCollapsed ? (
    <aside className={`${styles.aside} w-14 px-2 py-4`}>
      <div className="flex items-center justify-center mb-2 text-deep-charcoal/88">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          aria-label="Expand sidebar"
          suppressHydrationWarning
          className={styles.menu}
        >
          <Menu size={16} aria-hidden="true" />
        </button>
      </div>
    </aside>
  ) : (
    <aside className={`${styles.aside} w-60 p-4 gap-3 flex flex-col`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-deep-charcoal/88">
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              aria-label="Collapse sidebar"
              suppressHydrationWarning
              className={styles.menu}
            >
              <Menu size={16} aria-hidden="true" />
            </button>
            <h1
              suppressHydrationWarning
              className="text-sm font-normal not-italic leading-none whitespace-nowrap"
            >
              Sales pages
            </h1>
          </div>

          {/* <button
            type="button"
            onClick={onRefresh}
            className="text-sm text-blue-600 hover:underline"
          >
            Refresh
          </button> */}
        </div>

        <button
          type="button"
          onClick={onCreateNew}
                suppressHydrationWarning
          className={styles.createBtn}
        >
          <Plus size={16} aria-hidden="true" />
          <span className='whitespace-nowrap'>New page</span>
        </button>
        <div>
          <div suppressHydrationWarning className="relative">
            <Search
              size={16}
              aria-hidden="true"
              suppressHydrationWarning
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-deep-charcoal/50"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search&hellip;"
              suppressHydrationWarning
              className={`${styles.searchField} pl-8`}
            />
          </div>

          {loading && <p className="text-sm text-deep-charcoal/48 py-2 px-3">Loading pages...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="overflow-y-auto space-y-1">
              {filteredPages.length === 0 && (
                <p className="text-sm text-deep-charcoal/48 whitespace-nowrap py-2 px-3">
                  {pages.length === 0 ? 'No pages yet.' : 'No pages match this search.'}
                </p>
              )}

              {filteredPages.map((page) => {
                const isActive = selectedPageId === page.id

                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => onSelectPage(page.id)}
                    className={`${styles.pageItem} ${
                      isActive &&
                        'bg-slate/2'
                    }`}
                  >
                    <p className="truncate whitespace-nowrap">{page.company_name || 'Untitled'}</p>
                    <p className='text-deep-charcoal/48 whitespace-nowrap'>
                      {page.status || 'Pre-call'}
                    </p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 text-slate/30">
          <svg width="104" height="24" viewBox="0 0 104 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17.9981 12C17.9981 9.6472 18.3653 7.3784 19.0469 5.252C19.1061 5.0664 18.9317 4.892 18.7461 4.9512C16.6197 5.6328 14.3501 6 11.9981 6C9.64605 6 7.37645 5.6328 5.25005 4.9512C5.06445 4.892 4.89005 5.0664 4.94925 5.252C5.63085 7.3784 5.99805 9.648 5.99805 12C5.99805 14.352 5.63085 16.6216 4.94925 18.748C4.89005 18.9336 5.06445 19.108 5.25005 19.0488C7.37645 18.3672 9.64605 18 11.9981 18C14.3501 18 16.6197 18.3672 18.7461 19.0488C18.9317 19.108 19.1061 18.9336 19.0469 18.748C18.3653 16.6216 17.9981 14.352 17.9981 12ZM15.5981 15.5952C11.9981 15.6 8.39805 12.1704 8.40285 8.4H15.5981V15.5952Z" fill="currentColor" />
            <path d="M25.0888 13.9704C25.592 15.0656 26.7408 15.7304 27.9624 15.7304C29.0576 15.7304 30.028 15.2632 30.028 14.24C30.028 13.2168 29.1304 13.0728 27.5856 12.7496C26.0408 12.408 24.4248 12.0672 24.4248 10.1456C24.4248 8.47518 25.8792 7.30798 27.8728 7.30798C29.5608 7.30798 30.944 8.13438 31.5008 9.24718L30.3512 10.1632C29.8664 9.22958 28.9864 8.63678 27.8008 8.63678C26.7232 8.63678 26.0048 9.17598 26.0048 10.02C26.0048 10.864 26.8312 11.0616 28.1416 11.3488C29.7576 11.7256 31.608 12.0496 31.608 14.0968C31.608 15.8928 29.9736 17.0784 27.9624 17.0784C26.256 17.0784 24.5504 16.3424 23.832 14.8872L25.0888 13.9712V13.9704Z" fill="currentColor" />
            <path d="M32.5239 3.9856H34.1399V8.7624C34.6783 7.9904 35.6127 7.308 36.9415 7.308C38.9351 7.308 40.0663 8.6912 40.0663 10.684V16.88H38.4503V11.1152C38.4503 9.804 37.8935 8.8168 36.4927 8.8168C35.3255 8.8168 34.1399 9.7144 34.1399 11.2768V16.88H32.5239V3.9856Z" fill="currentColor" />
            <path d="M40.8384 14.348C40.8384 12.48 42.2928 11.708 44.3944 11.2768L46.6752 10.8096V10.4144C46.6752 9.33678 46.0824 8.72638 44.8256 8.72638C43.64 8.72638 42.94 9.28318 42.6528 10.3248L41.1264 9.92958C41.5752 8.40318 42.9584 7.30798 44.88 7.30798C46.9816 7.30798 48.2744 8.33198 48.2744 10.3432V14.9224C48.2744 15.5328 48.6512 15.7304 49.28 15.5872V16.88C47.8432 17.06 47.0168 16.7184 46.82 15.82C46.2456 16.556 45.204 17.0416 43.9288 17.0416C42.2224 17.0416 40.84 16.036 40.84 14.348H40.8384ZM46.6752 12.0672L44.8432 12.4624C43.4064 12.7496 42.4368 13.1448 42.4368 14.276C42.4368 15.192 43.1016 15.7304 44.1248 15.7304C45.508 15.7304 46.6752 14.8864 46.6752 13.6832V12.0672Z" fill="currentColor" />
            <path d="M54.8105 9.0856C54.5409 9.032 54.3257 9.0136 54.0201 9.0136C52.6553 9.0136 51.5601 10.0912 51.5601 11.7432V16.8792H49.9441V7.4864H51.5601V9.0848C51.9729 8.1328 52.8889 7.4144 54.1641 7.4144C54.4153 7.4144 54.6489 7.432 54.8105 7.4504V9.0856Z" fill="currentColor" />
            <path d="M54.4871 12.1928C54.4871 9.39118 56.2647 7.30798 58.8151 7.30798C61.3655 7.30798 62.8199 9.30158 62.8199 11.9056V12.444H56.0311C56.1207 14.4192 57.2527 15.6768 58.8863 15.6768C60.1431 15.6768 61.0415 14.9944 61.3287 13.8808L62.7471 14.384C62.1727 16.0544 60.7535 17.0776 58.8863 17.0776C56.2823 17.0776 54.4863 15.084 54.4863 12.1928H54.4871ZM56.1215 11.2048H61.1863C61.1503 9.87598 60.4319 8.69038 58.7975 8.69038C57.4327 8.69038 56.4087 9.60638 56.1215 11.2048Z" fill="currentColor" />
            <path d="M65.3704 15.5152V16.88H63.7544V3.9856H65.3704V8.8528C65.9272 7.9368 66.9688 7.308 68.28 7.308C70.884 7.308 72.3744 9.5168 72.3744 12.1928C72.3744 14.8688 70.884 17.0776 68.28 17.0776C66.9688 17.0776 65.9272 16.4488 65.3704 15.5152ZM65.3344 12.5336C65.3344 14.6888 66.6632 15.6584 67.992 15.6584C69.752 15.6584 70.74 14.204 70.74 12.192C70.74 10.18 69.752 8.7256 67.992 8.7256C66.6632 8.7256 65.3344 9.6776 65.3344 11.8688V12.5336Z" fill="currentColor" />
            <path d="M72.6072 14.348C72.6072 12.48 74.0616 11.708 76.1632 11.2768L78.444 10.8096V10.4144C78.444 9.33678 77.8512 8.72638 76.5944 8.72638C75.4088 8.72638 74.7088 9.28318 74.4216 10.3248L72.8952 9.92958C73.344 8.40318 74.7272 7.30798 76.6488 7.30798C78.7504 7.30798 80.0432 8.33198 80.0432 10.3432V14.9224C80.0432 15.5328 80.42 15.7304 81.0488 15.5872V16.88C79.612 17.06 78.7856 16.7184 78.5888 15.82C78.0144 16.556 76.9728 17.0416 75.6976 17.0416C73.9912 17.0416 72.6088 16.036 72.6088 14.348H72.6072ZM78.444 12.0672L76.612 12.4624C75.1752 12.7496 74.2056 13.1448 74.2056 14.276C74.2056 15.192 74.8704 15.7304 75.8936 15.7304C77.2768 15.7304 78.444 14.8864 78.444 13.6832V12.0672Z" fill="currentColor" />
            <path d="M85.5017 15.6584C86.7945 15.6584 87.5673 14.832 87.8361 13.6648L89.2729 14.3296C88.8241 15.892 87.4593 17.0776 85.5017 17.0776C82.8793 17.0776 81.0657 15.084 81.0657 12.1928C81.0657 9.30158 82.8793 7.30798 85.5017 7.30798C87.4593 7.30798 88.7881 8.43918 89.2369 10.0016L87.8361 10.7016C87.5665 9.55198 86.7945 8.70798 85.5017 8.70798C83.8313 8.70798 82.6825 10.0368 82.6825 12.192C82.6825 14.3472 83.8321 15.6584 85.5017 15.6584Z" fill="currentColor" />
            <path d="M91.5897 11.8696L95.7561 7.4872H97.7673L94.1033 11.1872L98.0721 16.88H96.1865L92.9537 12.3544L91.5889 13.7376V16.8808H89.9729V3.9856H91.5889V11.8696H91.5897Z" fill="currentColor" />
          </svg>
        </div>
      </aside>
  )
}