import { motion } from 'framer-motion'
import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { littleThings, type CardMotif } from '../config/content'
import { Reveal } from '../components/Reveal'

/* ---------- line-art motifs, one per card ---------- */
function Motif({ kind, color }: { kind: CardMotif; color: string }) {
  const p = { fill: 'none', stroke: color, strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'smile':
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="24" {...p} />
          <path d="M39 54 C 44 62, 56 62, 61 54" {...p} />
          <circle cx="42" cy="44" r="1.6" fill={color} />
          <circle cx="58" cy="44" r="1.6" fill={color} />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="50" y1="14" x2="50" y2="20" {...p} transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </svg>
      )
    case 'leaf':
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <path d="M28 76 C 26 44, 46 24, 78 22 C 78 52, 60 74, 28 76 Z" {...p} fill={color} fillOpacity="0.12" />
          <path d="M28 76 C 44 60, 58 44, 72 30" {...p} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${40 + i * 8} ${62 - i * 8} l ${-6 + i} ${-8 + i}`} {...p} />
          ))}
        </svg>
      )
    case 'voice':
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <path d="M22 30 h 46 a 10 10 0 0 1 10 10 v 18 a 10 10 0 0 1 -10 10 h -26 l -12 10 v -10 h -8 a 10 10 0 0 1 -10 -10 v -18 a 10 10 0 0 1 10 -10 z" {...p} />
          {[34, 42, 50, 58, 66].map((x, i) => (
            <line key={x} x1={x} x2={x} y1={49 - [4, 9, 6, 10, 3][i]} y2={49 + [4, 9, 6, 10, 3][i]} {...p} />
          ))}
        </svg>
      )
    case 'lamp':
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <path d="M50 10 v 10" {...p} />
          <path d="M42 22 h 16 l -2 6 h -12 z" {...p} />
          <path d="M44 28 C 30 40, 30 62, 40 74 h 20 C 70 62, 70 40, 56 28 Z" {...p} fill={color} fillOpacity="0.1" />
          <path d="M50 30 v 44 M38 44 h 24 M36 58 h 28" {...p} strokeOpacity="0.6" />
          <path d="M42 74 h 16 l -3 8 h -10 z" {...p} />
          <circle cx="50" cy="52" r="5" fill={color} fillOpacity="0.5" />
        </svg>
      )
    case 'rings':
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <circle cx="40" cy="52" r="20" {...p} />
          <circle cx="60" cy="52" r="20" {...p} />
          <path d="M50 18 C 51 24, 52 25, 58 26 C 52 27, 51 28, 50 34 C 49 28, 48 27, 42 26 C 48 25, 49 24, 50 18 Z" fill={color} fillOpacity="0.7" />
        </svg>
      )
    case 'dice':
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          {/* a tiny Partisi board cross */}
          <path d="M40 14 h 20 v 26 h 26 v 20 h -26 v 26 h -20 v -26 h -26 v -20 h 26 z" {...p} strokeOpacity="0.55" />
          <rect x="38" y="38" width="24" height="24" rx="5" {...p} fill={color} fillOpacity="0.12" transform="rotate(12 50 50)" />
          {[
            [45, 45],
            [55, 55],
            [50, 50],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill={color} transform="rotate(12 50 50)" />
          ))}
        </svg>
      )
  }
}

/* ---------- six distinct art directions ---------- */
const looks = [
  { front: 'bg-paper text-burgundy ring-1 ring-burgundy/15', back: 'bg-burgundy text-cream', motif: '#632F3D', shape: 'rounded-[3px]', offset: 'md:translate-y-0' },
  { front: 'bg-rose text-cream', back: 'bg-paper text-burgundy ring-1 ring-rose/50', motif: '#FAF6F0', shape: 'rounded-t-[999px] rounded-b-[4px]', offset: 'md:translate-y-12' },
  { front: 'bg-burgundy text-cream', back: 'bg-beige text-burgundy', motif: '#D9A6A3', shape: 'rounded-[3px]', offset: 'md:translate-y-4' },
  { front: 'bg-beige text-burgundy', back: 'bg-charcoal text-cream', motif: '#632F3D', shape: 'rounded-[28px]', offset: 'md:translate-y-0' },
  { front: 'bg-charcoal text-cream', back: 'bg-rose text-burgundy', motif: '#D9A6A3', shape: 'rounded-[3px]', offset: 'md:translate-y-12' },
  { front: 'bg-paper text-burgundy ring-1 ring-burgundy/15 [background-image:linear-gradient(rgba(99,47,61,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,47,61,.06)_1px,transparent_1px)] [background-size:18px_18px]', back: 'bg-burgundy text-cream', motif: '#632F3D', shape: 'rounded-b-[999px] rounded-t-[4px]', offset: 'md:translate-y-4' },
]

function Card({ i, fr, ar, motif }: { i: number; fr: string; ar: string; motif: CardMotif }) {
  const [flipped, setFlipped] = useState(false)
  const look = looks[i]
  const tilt = [-1.5, 1, -0.5, 1.5, -1, 0.8][i]

  return (
    <Reveal delay={(i % 3) * 0.12} className={look.offset}>
      <motion.button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`${fr} — ${flipped ? 'retourner' : 'découvrir'}`}
        className="group relative block aspect-[3/4] w-full [perspective:1200px]"
        style={{ rotate: tilt }}
        whileHover={{ y: -6, rotate: 0 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* FRONT */}
          <div
            className={`grain absolute inset-0 flex flex-col overflow-hidden p-4 text-left shadow-[0_24px_40px_-24px_rgba(99,47,61,0.55)] sm:p-6 ${look.front} ${look.shape}`}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <span className="font-serif text-sm italic opacity-70">{String(i + 1).padStart(2, '0')}</span>
            <div className="mx-auto my-auto h-[42%] w-[62%] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
              <Motif kind={motif} color={look.motif} />
            </div>
            <span lang="fr" className="font-serif text-[1.3rem] leading-tight sm:text-[1.65rem]">
              {fr}
            </span>
            <span className="mt-2 flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase opacity-60">
              <span className="inline-block h-px w-4 bg-current" /> découvrir
            </span>
          </div>

          {/* BACK */}
          <div
            className={`grain absolute inset-0 flex flex-col overflow-hidden p-4 shadow-[0_24px_40px_-24px_rgba(99,47,61,0.55)] sm:p-6 ${look.back} ${look.shape}`}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span lang="fr" className="text-left font-serif text-sm italic opacity-70">
              {fr}
            </span>
            <p lang="ar" dir="rtl" className="my-auto text-right font-ar text-[0.98rem] leading-[1.95] font-medium sm:text-[1.15rem]">
              {ar.split(/(goût|Partisi)/).map((part, j) =>
                part === 'goût' || part === 'Partisi' ? (
                  <span key={j} dir="ltr" lang="fr" className="font-serif text-[1.15em] italic">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </p>
            <RotateCcw size={14} strokeWidth={1.5} className="self-start opacity-50" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.button>
    </Reveal>
  )
}

export function LittleThings() {
  return (
    <section id="little-things" className="relative overflow-hidden bg-beige/50 px-5 py-24 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mb-14 flex flex-col gap-6 md:mb-24 md:flex-row-reverse md:items-end md:justify-between">
          <div className="text-right">
            <p className="kicker mb-5">03 — {littleThings.kicker}</p>
            <h2 lang="ar" dir="rtl" className="font-ar text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.5] font-medium text-burgundy">
              {littleThings.title}
            </h2>
          </div>
          <p lang="ar" dir="rtl" className="flex items-center gap-2 font-ar text-sm text-burgundy/60">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rose" />
            {littleThings.hint}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-x-4 gap-y-6 pb-12 sm:gap-x-6 md:grid-cols-3 md:gap-x-10 md:gap-y-14">
          {littleThings.cards.map((c, i) => (
            <Card key={c.fr} i={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
