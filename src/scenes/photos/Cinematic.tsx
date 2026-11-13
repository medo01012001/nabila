import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { photosCopy } from '../../config/content'
import { pick, placements } from '../../config/photos'
import { MediaView } from '../../components/MediaView'
import { Sprig } from '../../components/Flower'

const ease = [0.22, 1, 0.36, 1] as const

/** Large editorial compositions with clip reveals and gentle parallax. */
export function Cinematic({ onOpen }: { onOpen: (id: string) => void }) {
  const hero = pick(placements.cinematicHero)
  const second = pick(placements.cinematicSecond)
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])
  const wordY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['40%', '-40%'])
  const secondY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])

  return (
    <div ref={ref} className="relative mx-auto max-w-6xl">
      <div className="grid grid-cols-12 items-end gap-y-20 md:gap-x-8 md:gap-y-10">
        {/* HERO */}
        <motion.figure className="relative col-span-12 md:col-span-7" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.button
            type="button"
            onClick={() => onOpen(hero.id)}
            aria-label={`Agrandir : ${hero.caption}`}
            className="group relative block w-full overflow-hidden bg-beige shadow-[0_50px_80px_-50px_rgba(99,47,61,0.7)]"
            style={{ aspectRatio: '3 / 4' }}
            variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } }}
            transition={{ duration: 1.6, ease }}
          >
            <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={{ y: imgY }}>
              <motion.div
                className="h-full w-full"
                variants={{ hidden: { scale: 1.18 }, show: { scale: 1 } }}
                transition={{ duration: 2.4, ease }}
              >
                <MediaView item={hero} className="h-full w-full transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]" />
              </motion.div>
            </motion.div>
            <span className="pointer-events-none absolute inset-3 border border-cream/40" aria-hidden="true" />
          </motion.button>
          <figcaption className="mt-4 flex items-baseline gap-3 px-1">
            <span className="kicker">Pl. I</span>
            <span className="font-serif text-lg italic text-burgundy">{hero.caption}</span>
          </figcaption>

          {/* giant overlapping name */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -right-1 font-serif text-[clamp(4.5rem,19vw,11rem)] leading-none italic text-burgundy mix-blend-multiply md:-right-32 md:bottom-16"
            style={{ y: wordY }}
          >
            Nabila
          </motion.span>
        </motion.figure>

        {/* TEXT + SECOND IMAGE */}
        <div className="col-span-12 flex flex-col gap-10 md:col-span-5 md:pb-6">
          <motion.blockquote
            className="relative max-w-sm border-l border-burgundy/25 pl-5 md:ml-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease }}
          >
            <p className="font-serif text-2xl leading-snug italic text-charcoal/80 md:text-[1.75rem]">{photosCopy.cinematicLine}</p>
            <Sprig className="absolute -right-6 -top-10 h-16 w-auto opacity-50" />
          </motion.blockquote>

          <motion.figure className="ml-auto w-[78%] md:w-full" style={{ y: secondY }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.button
              type="button"
              onClick={() => onOpen(second.id)}
              aria-label={`Agrandir : ${second.caption}`}
              className="group relative block w-full overflow-hidden bg-beige p-2.5 shadow-[0_30px_60px_-35px_rgba(99,47,61,0.6)] ring-1 ring-burgundy/10"
              variants={{ hidden: { clipPath: 'inset(0% 0% 0% 100%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } }}
              transition={{ duration: 1.4, ease, delay: 0.2 }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: `${second.width} / ${second.height}` }}>
                <MediaView item={second} className="h-full w-full transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
              </div>
            </motion.button>
            <figcaption className="mt-3 flex items-baseline justify-between px-1">
              <span className="kicker">Pl. II</span>
              <span className="font-serif text-lg italic text-burgundy">{second.caption}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </div>
  )
}
