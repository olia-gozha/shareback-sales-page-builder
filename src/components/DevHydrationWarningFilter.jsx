'use client'

import { useEffect } from 'react'

const HYDRATION_PATTERNS = [
  "A tree hydrated but some attributes of the server rendered HTML didn't match the client properties",
  'Hydration failed because the server rendered',
]

function isHydrationMessage(value) {
  if (typeof value === 'string') {
    return HYDRATION_PATTERNS.some((pattern) => value.includes(pattern))
  }

  if (value && typeof value === 'object' && 'message' in value) {
    const message = String(value.message || '')
    return HYDRATION_PATTERNS.some((pattern) => message.includes(pattern))
  }

  return false
}

export default function DevHydrationWarningFilter() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const originalError = console.error

    console.error = (...args) => {
      if (args.some((arg) => isHydrationMessage(arg))) {
        return
      }

      originalError(...args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return null
}
