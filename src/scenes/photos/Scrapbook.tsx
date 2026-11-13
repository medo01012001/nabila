import { motion } from 'framer-motion'
import { photosCopy } from '../../config/content'
import { pick, placements } from '../../config/photos'
import { MediaView } from '../../components/MediaView'
import { Blossom, Flower, Sprig } from '../../components/Flower'

const ease = [0.22, 1, 0.36, 1] as const
const drop = (delay: number, rotate: number) => ({
  initial: { opacity: 0, y: 30, rotate: rotate - 6, scale: 0.94 },
  whileInView: { opacity: 1, y: 0, rotate, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease },
})

/** A two-page carnet spread: taped photos, handwritten notes, pressed flowers. */
export function Scrapbook({ onOpen }: { onOpen: (id: string) => void }) {
  const [a, b] = placements.scrapbook.map(pick)
  const [n1, n2, n3, n4] = photosCopy.scrapbookNotes

  return (
    <div className="mx-auto max-w-5xl">
      <h3 className="mb-10 text-right font-serif text-4xl italic text-burgundy md:mb-14 md:text-5xl">{photosCopy.scrapbookTitle}</h3>

      <div className="paper grain relative grid overflow-hidden rounded-[6px] shadow-[0_50px_90px_-50px_rgba(99,47,61,0.6),0_0_0_1px_rgba(99,47,61,0.08)] md:grid-cols-2">
        {/* spine */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-burgundy/[0.07] to-transparent md:block" aria-hidden="true" />
        {/* dotted ruling */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ backgroundImage: 'radial-gradient(rgba(99,47,61,.13) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          aria-hidden="true"
        />

        {/* LEFT PAGE */}
        <div className="relative min-h-[520px] p-6 sm:p-10">
          <motion.p className="kicker relative" {...drop(0, 0)}>
            Pl. III — carnet
          </motion.p>

          <motion.figure className="relative mx-auto mt-8 w-[68%] max-w-[260px]" {...drop(0.1, -4)}>
            <span className="tape -top-3 left-1/2 z-10 -translate-x-1/2 -rotate-3" aria-hidden="true" />
            <button
              type="button"
              onClick={() => onOpen(a.id)}
              className="block w-full bg-white p-2 shadow-[0_14px_24px_-14px_rgba(56,51,51,.5)] transition-transform duration-500 hover:-translate-y-1 hover:rotate-1"
              aria-label={`Agrandir : ${a.caption}`}
            >
              <div style={{ aspectRatio: `${a.width} / ${a.height}` }} className="overflow-hidden">
                <MediaView item={a} className="h-full w-full" />
              </div>
            </button>
          </motion.figure>

          <motion.div className="relative mt-10 w-fit" {...drop(0.35, -6)}>
            <p className="font-hand text-3xl text-burgundy">{n1}</p>
            <svg viewBox="0 0 120 20" className="mt-0.5 h-3 w-28" aria-hidden="true">
              <path d="M2 12 C 30 4, 60 18, 118 8" fill="none" stroke="#D9A6A3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.div className="absolute right-4 top-24 sm:right-8" {...drop(0.5, 12)}>
            <Sprig className="h-28 w-auto opacity-70" />
          </motion.div>
        </div>

        {/* RIGHT PAGE */}
        <div className="relative min-h-[540px] border-t border-dashed border-burgundy/15 p-6 sm:p-10 md:border-t-0">
          {/* little note card */}
          <motion.div className="relative ml-auto w-[62%] max-w-[230px] bg-cream px-5 py-6 shadow-[0_10px_20px_-12px_rgba(56,51,51,.35)]" {...drop(0.15, 3)}>
            <span className="absolute -left-2 -top-2 h-5 w-5 rounded-full bg-rose shadow-inner" aria-hidden="true" />
            <p lang="ar" dir="rtl" className="font-ruqaa text-3xl leading-relaxed text-burgundy">
              {n3}
            </p>
            <p className="mt-2 font-hand text-2xl text-charcoal/70">{n2}</p>
            <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(99,47,61,.25)_0_4px,transparent_4px_8px)]" />
          </motion.div>

          {/* moving moment */}
          <motion.figure className="relative mt-10 w-[64%] max-w-[250px]" {...drop(0.3, -3)}>
            <span className="tape -right-6 top-3 z-10 rotate-[38deg]" aria-hidden="true" />
            <span className="tape -left-6 bottom-6 z-10 rotate-[38deg]" aria-hidden="true" />
            <button
              type="button"
              onClick={() => onOpen(b.id)}
              className="group block w-full bg-white p-2 pb-9 shadow-[0_14px_24px_-14px_rgba(56,51,51,.5)] transition-transform duration-500 hover:-translate-y-1 hover:-rotate-1"
              aria-label={`Agrandir : ${b.caption}`}
            >
              <div style={{ aspectRatio: `${b.width} / ${b.height}` }} className="overflow-hidden">
                <MediaView item={b} className="h-full w-full" />
              </div>
              <span className="absolute bottom-2 left-3 font-hand text-xl text-charcoal/70">{b.caption}</span>
            </button>
          </motion.figure>

          <motion.p className="absolute bottom-8 right-6 rotate-[-4deg] font-hand text-2xl text-burgundy/80 sm:right-10" {...drop(0.55, -4)}>
            {n4}
          </motion.p>

          <motion.div className="absolute bottom-20 right-8 sm:right-14" {...drop(0.6, 0)}>
            <Blossom className="h-9 w-9" />
          </motion.div>

          <Flower className="pointer-events-none absolute -right-4 top-40 h-40 w-auto opacity-60 sm:top-44" inView delay={0.3} sway={false} />
        </div>
      </div>
    </div>
  )
}
