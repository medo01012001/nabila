import { motion, type PanInfo } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { photosCopy } from '../../config/content'
import { pick, placements } from '../../config/photos'
import { MediaView } from '../../components/MediaView'

/**
 * A calm, manual carousel (no autoplay). Each photo keeps its original
 * proportions: slides share a height and their width follows the image.
 */
export function Carousel({ onOpen }: { onOpen: (id: string) => void }) {
  const items = placements.carousel.map(pick)
  const n = items.length
  const [index, setIndex] = useState(0)
  const go = (d: number) => setIndex((i) => (i + d + n) % n)
  const stage = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(800)
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const step = w < 640 ? w * 0.62 : Math.min(w * 0.36, 420)

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < Math.abs(info.offset.y)) return
    if (info.offset.x < -50 || info.velocity.x < -350) go(1)
    else if (info.offset.x > 50 || info.velocity.x > 350) go(-1)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-end justify-between md:mb-12">
        <h3 className="font-serif text-4xl italic text-burgundy md:text-5xl">{photosCopy.carouselTitle}</h3>
        <p className="font-serif text-xl italic text-burgundy/70" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span className="opacity-40">/</span> {String(n).padStart(2, '0')}
        </p>
      </div>

      <div
        ref={stage}
        className="relative h-[min(64svh,560px)] select-none overflow-hidden"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Album photo"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1)
          if (e.key === 'ArrowLeft') go(-1)
        }}
      >
        <motion.div className="absolute inset-0" onPanEnd={onPanEnd} style={{ touchAction: 'pan-y' }}>
          {items.map((item, i) => {
            let rel = i - index
            if (rel > n / 2) rel -= n
            if (rel < -n / 2) rel += n
            const on = rel === 0
            const visible = Math.abs(rel) <= 1
            return (
              <motion.div
                key={item.id}
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                animate={{
                  x: rel * step,
                  scale: on ? 1 : 0.78,
                  opacity: visible ? (on ? 1 : 0.38) : 0,
                  filter: on ? 'saturate(1)' : 'saturate(0.6)',
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: on ? 3 : visible ? 2 : 1, pointerEvents: 'none' }}
                aria-hidden={!on}
              >
                <button
                  type="button"
                  tabIndex={on ? 0 : -1}
                  onClick={() => (on ? onOpen(item.id) : setIndex(i))}
                  className={`h-full bg-paper p-2 ${visible ? 'pointer-events-auto' : ''} shadow-[0_30px_50px_-30px_rgba(56,51,51,.55)] ring-1 ring-burgundy/10 md:p-3`}
                  aria-label={on ? `Agrandir : ${item.caption}` : `Voir : ${item.caption}`}
                >
                  <MediaView item={item} fit="contain" className="pointer-events-none block h-full w-auto max-w-[78vw]" />
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Photo précédente"
          className="group flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-burgundy/25 text-burgundy transition hover:bg-burgundy hover:text-cream active:scale-95"
        >
          <ArrowLeft size={18} strokeWidth={1.4} className="transition-transform group-hover:-translate-x-0.5" />
        </button>

        <div className="flex flex-1 items-center justify-center gap-5">
          <span className="hidden font-serif text-lg italic text-charcoal/70 sm:inline">{items[index].caption}</span>
          <div className="flex gap-2">
            {items.map((it, i) => (
              <button key={it.id} type="button" onClick={() => setIndex(i)} aria-label={`Photo ${i + 1}`} aria-current={i === index} className="flex h-8 items-center">
                <span className={`block h-[2px] rounded-full transition-all duration-700 ${i === index ? 'w-10 bg-burgundy' : 'w-4 bg-burgundy/25'}`} />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Photo suivante"
          className="group flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-burgundy/25 text-burgundy transition hover:bg-burgundy hover:text-cream active:scale-95"
        >
          <ArrowRight size={18} strokeWidth={1.4} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
