import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Media } from '../config/photos'
import { MediaView } from './MediaView'

type Props = {
  items: Media[]
  index: number | null
  onClose: () => void
  onChange: (i: number) => void
}

/** Full-screen viewer: keyboard (← → Esc), swipe, buttons, focus-managed. */
export function Lightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null
  const [dir, setDir] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<Element | null>(null)

  const go = useCallback(
    (delta: number) => {
      if (index === null) return
      setDir(delta)
      onChange((index + delta + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement
    document.body.classList.add('is-locked')
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // the page is LTR-structured; arrows map to visual direction
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
      ;(lastFocus.current as HTMLElement | null)?.focus?.()
    }
  }, [open, go, onClose])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
    else if (info.offset.y > 120) onClose()
  }

  const item = index !== null ? items[index] : null

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-[#1f1a1b]/95 text-cream backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie photo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] md:px-8">
            <span className="font-serif text-lg italic text-cream/70">
              {String(index! + 1).padStart(2, '0')} <span className="opacity-40">/</span> {String(items.length).padStart(2, '0')}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-cream/20 transition hover:bg-cream/10"
              aria-label="Fermer"
            >
              <X size={20} strokeWidth={1.4} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.figure
                key={item.id}
                custom={dir}
                className="flex max-h-full flex-col items-center"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.96 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.96 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag
                dragSnapToOrigin
                dragElastic={0.5}
                onDragEnd={onDragEnd}
                style={{ touchAction: 'none' }}
              >
                <div className="bg-paper p-2 shadow-2xl md:p-3">
                  <MediaView
                    item={item}
                    fit="contain"
                    eager
                    className="block h-auto max-h-[calc(100svh-12rem)] w-auto max-w-[calc(100vw-2.5rem)] md:max-w-[min(80vw,900px)]"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-xl italic">{item.caption}</span>
                  {item.captionAr && (
                    <span lang="ar" dir="rtl" className="text-sm text-rose">
                      {item.captionAr}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Photo précédente"
              className="absolute left-3 hidden h-12 w-12 items-center justify-center rounded-full ring-1 ring-cream/20 transition hover:bg-cream/10 md:left-8 md:flex"
            >
              <ChevronLeft size={22} strokeWidth={1.3} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Photo suivante"
              className="absolute right-3 hidden h-12 w-12 items-center justify-center rounded-full ring-1 ring-cream/20 transition hover:bg-cream/10 md:right-8 md:flex"
            >
              <ChevronRight size={22} strokeWidth={1.3} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
            <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-cream/20 md:hidden">
              <ChevronLeft size={20} strokeWidth={1.3} />
            </button>
            <div className="flex gap-2">
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => {
                    setDir(i > index! ? 1 : -1)
                    onChange(i)
                  }}
                  aria-label={`Aller à la photo ${i + 1}`}
                  className="flex h-6 items-center"
                >
                  <span className={`block h-[3px] rounded-full transition-all duration-500 ${i === index ? 'w-7 bg-cream' : 'w-3 bg-cream/30'}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-cream/20 md:hidden">
              <ChevronRight size={20} strokeWidth={1.3} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
