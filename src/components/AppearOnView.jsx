'use client'

import { useEffect, useRef, useState } from 'react'

export default function AppearOnView({
  as: Tag = 'div',
  children,
  className = '',
  animation = 'up',
  delay = 0,
  duration = 1600,
  threshold = 0.08,
  rootMargin = '0px 0px -8% 0px',
  distance = 100,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  once = true,
  style,
  ...rest
}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = elementRef.current
    if (!node) return
    let frameA = 0
    let frameB = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cancelAnimationFrame(frameA)
          cancelAnimationFrame(frameB)

          // Push the visible state to a later paint so CSS transitions
          // consistently run when the element first enters the viewport.
          frameA = requestAnimationFrame(() => {
            frameB = requestAnimationFrame(() => setIsVisible(true))
          })

          if (once) observer.disconnect()
          return
        }

        if (!once) setIsVisible(false)
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameA)
      cancelAnimationFrame(frameB)
    }
  }, [threshold, rootMargin, once])

  const classes = [
    'appear',
    `appear-${animation}`,
    isVisible ? 'appear-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={elementRef}
      className={classes}
      style={{
        ...(style || {}),
        '--appear-delay': `${delay}ms`,
        '--appear-duration': `${duration}ms`,
        '--appear-distance': `${distance}px`,
        '--appear-ease': easing,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}