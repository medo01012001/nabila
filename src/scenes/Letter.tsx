import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { letter } from '../config/content'
import { Blossom, Sprig } from '../components/Flower'
import { Reveal } from '../components/Reveal'

const ease = [0.22, 1, 0.36, 1] as const

function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      key="envelope"
      className="mx-auto w-full max-w-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      exit={{ opacity: 0, y: -40, scale: 0.95, transition: { duration: 0.6, ease } }}
      transition={{ duration: 1, ease }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative block aspect-[1.55] w-full [perspective:1200px] focus-visible:outline-offset-8"
        aria-label="Ouvrir la lettre — حلّي الرسالة"
      >
        {/* body */}
        <div className="absolute inset-0 rounded-[3px] bg-beige shadow-[0_30px_60px_-30px_rgba(99,47,61,0.45)] ring-1 ring-burgundy/10" />
        {/* paper peeking */}
        <div className="absolute inset-x-6 top-4 bottom-6 rounded-[2px] bg-paper transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-4" />
        {/* lower folds */}
        <svg viewBox="0 0 310 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M0 200 L155 105 L310 200 Z" fill="#E2D4C6" />
          <path d="M0 0 L140 110 L0 200 Z" fill="#E6D9CC" />
          <path d="M310 0 L170 110 L310 200 Z" fill="#E6D9CC" />
        </svg>
        {/* flap */}
        <div
          className="absolute inset-x-0 top-0 h-[62%] origin-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateX(18deg)]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 310 124" preserveAspectRatio="none" className="h-full w-full drop-shadow-[0_6px_6px_rgba(99,47,61,0.12)]">
            <path d="M0 0 L310 0 L155 124 Z" fill="#DCCBBB" />
          </svg>
        </div>
        {/* wax seal */}
        <span className="absolute left-1/2 top-[62%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy font-serif text-2xl text-cream italic shadow-[inset_0_-3px_6px_rgba(0,0,0,0.25),0_6px_14px_rgba(99,47,61,0.35)] transition-transform duration-500 group-hover:scale-105 group-active:scale-95">
          <span className="absolute inset-1.5 rounded-full border border-cream/25" />N
        </span>
      </button>
      <p lang="ar" dir="rtl" className="mt-8 text-center font-ar text-base text-burgundy/80">
        كليكي على الطابع باش تحلّي الرسالة
      </p>
      <p className="mt-1 text-center font-serif text-sm italic text-charcoal/50">touche le sceau pour ouvrir</p>
    </motion.div>
  )
}

function Paper() {
  const step = 0.55
  return (
    <motion.article
      key="paper"
      className="paper grain relative mx-auto w-full max-w-2xl rounded-[3px] px-7 pb-14 pt-12 shadow-[0_40px_80px_-40px_rgba(99,47,61,0.45),0_2px_6px_rgba(56,51,51,0.05)] ring-1 ring-burgundy/10 sm:px-12 md:px-16 md:pt-16"
      initial={{ opacity: 0, y: 60, rotateX: -14, scaleY: 0.6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scaleY: 1 }}
      transition={{ duration: 1.1, ease }}
      style={{ transformOrigin: 'top center', transformPerspective: 1400 }}
    >
      {/* fold crease */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-burgundy/10 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-burgundy/10 to-transparent" aria-hidden="true" />

      {/* stamp */}
      <div className="absolute right-5 top-5 flex h-16 w-14 rotate-3 items-center justify-center border border-dashed border-burgundy/30 bg-cream/70 md:right-8 md:top-8" aria-hidden="true">
        <Blossom className="h-8 w-8" />
      </div>

      <motion.p
        lang="fr"
        dir="ltr"
        className="font-serif text-3xl italic text-burgundy md:text-4xl"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease }}
      >
        {letter.greeting}
      </motion.p>

      <div lang="ar" dir="rtl" className="mt-8 space-y-6 text-right">
        {letter.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            className="font-ar text-[1.08rem] leading-[2.15] text-charcoal/90 md:text-[1.18rem]"
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.3 + i * step, duration: 1, ease }}
          >
            {/* highlight the two special words */}
            {p.split(/(Partisi|مشات)/).map((part, j) =>
              part === 'Partisi' ? (
                <span key={j} dir="ltr" className="font-serif text-[1.15em] italic text-burgundy">
                  Partisi
                </span>
              ) : part === 'مشات' ? (
                <span key={j} className="relative font-ruqaa text-[1.25em] text-burgundy">
                  مشات
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2 w-full" aria-hidden="true">
                    <motion.path
                      d="M2 6 C 25 2, 50 9, 98 4"
                      fill="none"
                      stroke="#D9A6A3"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1.3 + i * step + 0.9, duration: 0.8 }}
                    />
                  </svg>
                </span>
              ) : (
                part
              ),
            )}
          </motion.p>
        ))}
      </div>

      <motion.div
        className="mt-12 flex items-end justify-between gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 + letter.paragraphs.length * step + 0.2, duration: 1, ease }}
      >
        <Sprig className="h-20 w-auto shrink-0 opacity-60" />
        <p lang="fr" dir="ltr" className="text-right font-serif text-2xl italic leading-snug text-burgundy md:text-3xl">
          {letter.signoff}
        </p>
      </motion.div>
    </motion.article>
  )
}

export function Letter() {
  const [open, setOpen] = useState(false)

  return (
    <section id="letter" className="relative overflow-hidden bg-cream px-5 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 flex flex-col items-center text-center md:mb-20">
          <p className="kicker mb-5">02 — Une lettre</p>
          <h2 lang="ar" dir="rtl" className="font-ar text-[clamp(1.9rem,7vw,3.2rem)] leading-[1.5] font-medium text-burgundy">
            {letter.title}
          </h2>
          <div className="hairline mt-6 w-24" />
        </Reveal>

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">{open ? <Paper /> : <Envelope onOpen={() => setOpen(true)} />}</AnimatePresence>
        </div>
      </div>
    </section>
  )
}
