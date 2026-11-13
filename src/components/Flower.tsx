import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  className?: string
  /** seconds before the bloom starts */
  delay?: number
  /** play the bloom when scrolled into view instead of on mount */
  inView?: boolean
  petals?: number
  tone?: 'burgundy' | 'cream'
  sway?: boolean
}

const PETAL = 'M0 0 C -10 -10, -10 -27, 0 -33 C 10 -27, 10 -10, 0 0 Z'

/** A delicate line-art flower that draws itself, then sways softly. */
export function Flower({ className, delay = 0, inView = false, petals = 6, tone = 'burgundy', sway = true }: Props) {
  const reduce = useReducedMotion()
  const stroke = tone === 'burgundy' ? '#632F3D' : '#FAF6F0'
  const fill = tone === 'burgundy' ? '#D9A6A3' : '#D9A6A3'
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, amount: 0.4 } } : { animate: 'show' }

  return (
    <motion.svg
      viewBox="0 0 120 200"
      className={className}
      aria-hidden="true"
      initial="hidden"
      {...trigger}
      style={{ overflow: 'visible' }}
    >
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        animate={sway && !reduce ? { rotate: [-1.6, 1.6, -1.6] } : undefined}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: delay + 2 }}
      >
        <motion.path
          d="M60 200 C 57 165, 65 130, 60 90"
          fill="none"
          stroke={stroke}
          strokeWidth={1.3}
          strokeLinecap="round"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
          transition={{ duration: 1.4, delay, ease: 'easeInOut' }}
        />
        {[
          'M60 156 C 40 148, 29 132, 33 117 C 48 122, 58 136, 60 156 Z',
          'M61 132 C 79 124, 91 110, 88 97 C 74 101, 64 114, 61 132 Z',
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill={fill}
            fillOpacity={0.18}
            stroke={stroke}
            strokeWidth={1.1}
            variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 1, delay: delay + 0.7 + i * 0.25, ease: 'easeOut' }}
          />
        ))}
        <g transform="translate(60 72)">
          {Array.from({ length: petals }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / petals) * i})`}>
              <motion.path
                d={PETAL}
                fill={fill}
                fillOpacity={0.35}
                stroke={stroke}
                strokeWidth={1.1}
                strokeLinejoin="round"
                variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
                transition={{ duration: 0.9, delay: delay + 1.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              />
            </g>
          ))}
          <motion.circle
            r={5.5}
            fill={stroke}
            variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
            transition={{ duration: 0.6, delay: delay + 1.9, type: 'spring', bounce: 0.5 }}
          />
        </g>
      </motion.g>
    </motion.svg>
  )
}

/** A tiny five-petal blossom used as an ornament. */
export function Blossom({ className, color = '#632F3D' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="-20 -20 40 40" className={className} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <ellipse key={i} cx="0" cy="-9" rx="5" ry="9" transform={`rotate(${i * 72})`} fill={color} fillOpacity="0.16" stroke={color} strokeWidth="1" />
      ))}
      <circle r="3" fill={color} />
    </svg>
  )
}

/** A thin sprig, for margins and scrapbook pages. */
export function Sprig({ className, color = '#632F3D' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden="true" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
      <path d="M30 118 C 28 90, 34 60, 30 6" />
      {[22, 40, 58, 76, 94].map((y, i) => (
        <path
          key={y}
          d={i % 2 ? `M31 ${y} C 42 ${y - 6}, 50 ${y - 14}, 48 ${y - 22} C 40 ${y - 18}, 33 ${y - 10}, 31 ${y}` : `M30 ${y} C 19 ${y - 6}, 11 ${y - 14}, 13 ${y - 22} C 21 ${y - 18}, 28 ${y - 10}, 30 ${y}`}
          fill={color}
          fillOpacity="0.12"
        />
      ))}
    </svg>
  )
}
