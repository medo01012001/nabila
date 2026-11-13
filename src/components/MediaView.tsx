import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Media } from '../config/photos'

type Props = {
  item: Media
  className?: string
  /** 'cover' crops into the frame using item.focus; 'contain' keeps the full photo */
  fit?: 'cover' | 'contain'
  eager?: boolean
  /** for video: play only while visible */
  autoPlay?: boolean
  controls?: boolean
}

/** Renders a photo (lazy, sized) or a muted looping video with the same API. */
export function MediaView({ item, className = '', fit = 'cover', eager = false, autoPlay = true, controls = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const style = { objectFit: fit, objectPosition: item.focus } as const

  useEffect(() => {
    const v = ref.current
    if (!v || !autoPlay || reduce) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [autoPlay, reduce])

  if (item.kind === 'video') {
    return (
      <video
        ref={ref}
        className={className}
        style={style}
        src={item.src}
        poster={item.poster}
        width={item.width}
        height={item.height}
        muted
        loop
        playsInline
        preload="metadata"
        controls={controls}
        aria-label={item.alt}
      />
    )
  }

  return (
    <img
      className={className}
      style={style}
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  )
}
