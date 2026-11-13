import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

type Props = { count?: number; className?: string; tone?: 'rose' | 'cream' | 'burgundy'; seed?: number }

// Small deterministic PRNG so the composition is identical on every visit
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const shapes = ['petal', 'dot', 'ring', 'petal', 'dot'] as const

/** Very light floating decorative elements (petals, dots, rings). */
export function Floaters({ count = 12, className = '', tone = 'rose', seed = 7 }: Props) {
  const reduce = useReducedMotion()
  const color = tone === 'rose' ? '#D9A6A3' : tone === 'cream' ? '#FAF6F0' : '#632F3D'
  const items = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }).map((_, i) => ({
      left: r() * 100,
      top: r() * 100,
      size: 6 + r() * 12,
      dur: 9 + r() * 10,
      delay: r() * -12,
      drift: 10 + r() * 26,
      rot: r() * 360,
      shape: shapes[i % shapes.length],
      op: 0.25 + r() * 0.45,
    }))
  }, [count, seed])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {items.map((it, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{ left: `${it.left}%`, top: `${it.top}%`, width: it.size, height: it.size, opacity: it.op }}
          animate={reduce ? undefined : { y: [0, -it.drift, 0], x: [0, it.drift / 3, 0], rotate: [it.rot, it.rot + 40, it.rot] }}
          transition={{ duration: it.dur, repeat: Infinity, ease: 'easeInOut', delay: it.delay }}
        >
          {it.shape === 'petal' && (
            <svg viewBox="0 0 10 16" className="h-full w-full">
              <path d="M5 0 C 9 4, 9 11, 5 16 C 1 11, 1 4, 5 0 Z" fill={color} />
            </svg>
          )}
          {it.shape === 'dot' && <span className="block h-1/2 w-1/2 rounded-full" style={{ background: color }} />}
          {it.shape === 'ring' && <span className="block h-full w-full rounded-full border" style={{ borderColor: color }} />}
        </motion.span>
      ))}
    </div>
  )
}
