import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { photosCopy } from '../../config/content'
import { pick, placements } from '../../config/photos'
import { MediaView } from '../../components/MediaView'

// hand-placed layout: rotation and nudges per polaroid (desktop)
const layout = [
  { rotate: -7, x: '0%', y: 30, z: 1 },
  { rotate: 4, x: '-6%', y: -10, z: 2 },
  { rotate: -2, x: '-10%', y: 50, z: 3 },
  { rotate: 6, x: '-14%', y: 0, z: 2 },
]

function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFine(mq.matches)
    const on = () => setFine(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return fine
}

/** A table of Polaroids — draggable on desktop, tap to open the lightbox. */
export function Polaroids({ onOpen }: { onOpen: (id: string) => void }) {
  const items = placements.polaroids.map(pick)
  const table = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const [top, setTop] = useState<string | null>(null)
  const dragged = useRef(false)

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex items-end justify-between gap-6 md:mb-16">
        <h3 className="font-serif text-4xl italic text-burgundy md:text-5xl">{photosCopy.polaroidTitle}</h3>
        <p lang="ar" dir="rtl" className="font-ar text-sm text-burgundy/60">
          {photosCopy.polaroidHint}
          {fine && <span lang="fr" dir="ltr" className="hidden font-serif italic md:inline"> · ou déplace-les</span>}
        </p>
      </div>

      <div
        ref={table}
        className="relative grid grid-cols-2 gap-x-3 gap-y-8 rounded-[4px] px-1 py-6 sm:gap-x-6 md:flex md:justify-center md:gap-0 md:py-16"
      >
        {items.map((item, i) => {
          const l = layout[i % layout.length]
          return (
            <motion.div
              key={item.id}
              className="relative md:w-[25%] md:max-w-[270px]"
              style={{ zIndex: top === item.id ? 10 : l.z, x: 0 }}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: l.rotate * (fine ? 1 : 0.6) }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                type="button"
                className="group block w-full cursor-pointer bg-paper p-2.5 pb-12 text-left shadow-[0_18px_30px_-18px_rgba(56,51,51,0.45),0_2px_4px_rgba(56,51,51,0.06)] ring-1 ring-charcoal/5 sm:p-3 sm:pb-14 md:cursor-grab md:active:cursor-grabbing"
                style={{ marginLeft: fine ? l.x : 0, marginTop: fine ? l.y : 0 }}
                drag={fine}
                dragConstraints={table}
                dragElastic={0.15}
                dragMomentum={false}
                onDragStart={() => {
                  dragged.current = true
                  setTop(item.id)
                }}
                onDragEnd={() => window.setTimeout(() => (dragged.current = false), 60)}
                onClick={() => !dragged.current && onOpen(item.id)}
                whileHover={fine ? { y: -10, rotate: 0, scale: 1.03, boxShadow: '0 40px 50px -25px rgba(56,51,51,.5)' } : undefined}
                whileTap={{ scale: 0.98 }}
                aria-label={`Ouvrir : ${item.caption}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-beige">
                  <MediaView item={item} className="pointer-events-none h-full w-full" />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#632F3D]/10 via-transparent to-[#FAF6F0]/15 mix-blend-soft-light" aria-hidden="true" />
                  {item.kind === 'video' && (
                    <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-cream/80 text-burgundy" aria-hidden="true">
                      <Play size={12} fill="currentColor" />
                    </span>
                  )}
                </div>
                <span className="absolute inset-x-3 bottom-3 flex items-baseline justify-between gap-2 sm:bottom-4">
                  <span className="font-hand text-xl leading-none text-charcoal/80 sm:text-2xl">{item.caption}</span>
                  {item.captionAr && (
                    <span lang="ar" dir="rtl" className="font-ruqaa text-sm text-burgundy/70 sm:text-base">
                      {item.captionAr}
                    </span>
                  )}
                </span>
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
