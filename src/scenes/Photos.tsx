import { useCallback, useMemo, useState } from 'react'
import { photosCopy } from '../config/content'
import { media, type Media } from '../config/photos'
import { Lightbox } from '../components/Lightbox'
import { Reveal } from '../components/Reveal'
import { Cinematic } from './photos/Cinematic'
import { Polaroids } from './photos/Polaroids'
import { Scrapbook } from './photos/Scrapbook'
import { Carousel } from './photos/Carousel'

/** Scene 04 — one shared lightbox across four different photo treatments. */
export function Photos() {
  // every unique media item, once, in story order
  const all: Media[] = useMemo(() => [media.caftan, media.whiteDress, media.portrait, media.moment], [])
  const [open, setOpen] = useState<number | null>(null)
  const openById = useCallback((id: string) => setOpen(all.findIndex((m) => m.id === id)), [all])

  return (
    <section id="photos" className="relative overflow-hidden bg-cream px-5 py-24 md:py-36">
      <Reveal className="mx-auto mb-16 max-w-6xl md:mb-24">
        <p className="kicker mb-5">04 — {photosCopy.kicker}</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-[clamp(3rem,11vw,7rem)] leading-[0.9] text-burgundy">
            L’<span className="italic">album</span>
          </h2>
          <p lang="ar" dir="rtl" className="font-ar text-2xl font-medium text-charcoal/80 md:text-3xl">
            {photosCopy.title}
          </p>
        </div>
      </Reveal>

      <Cinematic onOpen={openById} />
      <div className="h-28 md:h-44" />
      <Polaroids onOpen={openById} />
      <div className="h-24 md:h-40" />
      <Scrapbook onOpen={openById} />
      <div className="h-24 md:h-40" />
      <Carousel onOpen={openById} />

      <Lightbox items={all} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  )
}
