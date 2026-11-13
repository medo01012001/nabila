import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useState } from 'react'
import { mchat } from '../config/content'
import { Floaters } from '../components/Floaters'
import { Reveal } from '../components/Reveal'

const ease = [0.22, 1, 0.36, 1] as const
const bits = ['✦', 'ههه', '⚀', '✿', '!', '⚄', '✦', '😂', '⚂', '~', '✿', 'ههه', '⚅', '✦']

function Burst({ seed }: { seed: number }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
      {bits.map((b, i) => {
        const angle = (i / bits.length) * Math.PI * 2 + seed
        const r = 120 + ((i * 37 + seed * 50) % 90)
        return (
          <motion.span
            key={`${seed}-${i}`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${b === 'ههه' ? 'font-ar text-sm' : 'text-xl'} ${i % 3 ? 'text-rose' : 'text-cream'}`}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
            animate={{ x: Math.cos(angle) * r, y: Math.sin(angle) * r * 0.75, opacity: [0, 1, 1, 0], scale: [0.3, 1.1, 1, 0.8], rotate: (i % 2 ? 1 : -1) * 40 }}
            transition={{ duration: 1.8, ease: 'easeOut', delay: 0.15 + (i % 4) * 0.03 }}
          >
            {b}
          </motion.span>
        )
      })}
    </div>
  )
}

export function Mchat() {
  const [shown, setShown] = useState(false)
  const [burst, setBurst] = useState(0)
  const word = useAnimationControls()

  const reveal = () => {
    setShown(true)
    setBurst((b) => b + 1)
  }
  const replay = () => {
    setBurst((b) => b + 1)
    void word.start({ rotate: [0, -6, 5, -3, 0], scale: [1, 1.12, 0.96, 1.04, 1], transition: { duration: 0.8 } })
  }

  return (
    <section id="mchat" className="grain relative flex min-h-svh items-center overflow-hidden bg-burgundy px-5 py-24 text-cream md:py-32">
      <Floaters count={16} tone="rose" seed={21} />
      {/* faint repeated word as texture */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-around opacity-[0.045]" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <p key={i} lang="ar" dir="rtl" className={`whitespace-nowrap font-ruqaa text-7xl ${i % 2 ? '-translate-x-20' : 'translate-x-10'}`}>
            مشات مشات مشات مشات مشات مشات مشات مشات
          </p>
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Reveal>
          <p className="kicker mb-6 !text-rose">05 — le mot</p>
          <h2 lang="ar" dir="rtl" className="font-ar text-[clamp(1.7rem,6.5vw,2.8rem)] leading-[1.6] font-medium">
            {mchat.title}
          </h2>
        </Reveal>

        <div className="relative mt-14 flex min-h-[260px] w-full items-center justify-center md:min-h-[320px]">
          <AnimatePresence mode="wait">
            {!shown ? (
              <motion.button
                key="btn"
                type="button"
                onClick={reveal}
                className="group relative flex flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.4, rotate: -20, transition: { duration: 0.35 } }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-cream font-serif text-4xl text-burgundy italic shadow-[0_0_0_8px_rgba(250,246,240,0.08),0_0_0_18px_rgba(250,246,240,0.04)]">
                  <motion.span animate={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6 }}>
                    ?
                  </motion.span>
                  <span className="absolute inset-0 animate-ping rounded-full ring-1 ring-cream/40 [animation-duration:2.4s]" />
                </span>
                <span lang="ar" dir="rtl" className="font-ar text-base text-cream/80">
                  {mchat.button}
                </span>
              </motion.button>
            ) : (
              <motion.div key="word" className="relative" initial="hidden" animate="show">
                <Burst seed={burst} />
                <motion.button
                  type="button"
                  onClick={replay}
                  animate={word}
                  className="relative cursor-pointer"
                  aria-label="مشات — encore !"
                >
                  <motion.span
                    lang="ar"
                    dir="rtl"
                    className="block font-ruqaa text-[clamp(6rem,30vw,13rem)] leading-[1.15] text-cream drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    initial={{ scale: 0.2, rotate: -14, opacity: 0, filter: 'blur(12px)' }}
                    animate={{ scale: 1, rotate: -4, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ type: 'spring', stiffness: 180, damping: 12, mass: 0.9 }}
                  >
                    {mchat.word}
                  </motion.span>
                  {/* hand-drawn underline */}
                  <svg viewBox="0 0 300 30" className="absolute -bottom-2 left-1/2 h-6 w-[80%] -translate-x-1/2" aria-hidden="true">
                    <motion.path
                      d="M6 18 C 70 6, 150 26, 294 10"
                      fill="none"
                      stroke="#D9A6A3"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.6, duration: 0.7, ease }}
                    />
                  </svg>
                  {/* stamp */}
                  <motion.span
                    className="absolute -right-6 -top-2 rotate-12 rounded-[3px] border-2 border-rose px-2 py-0.5 font-sans text-[10px] font-medium tracking-[0.25em] text-rose uppercase md:-right-14"
                    initial={{ scale: 2.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9, type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    historique
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {shown && (
            <motion.div className="mt-8 max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.p
                lang="ar"
                dir="rtl"
                className="font-ar text-[1.15rem] leading-[2] text-cream/90 md:text-xl"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.9, ease }}
              >
                {mchat.line1}
              </motion.p>
              <motion.p
                lang="ar"
                dir="rtl"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-cream/10 px-5 py-2.5 font-ar text-base text-rose ring-1 ring-cream/15 md:text-lg"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.9, ease }}
              >
                <span aria-hidden="true" className="text-xl">⚂</span>
                <span>
                  {mchat.line2.split('Partisi').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span dir="ltr" lang="fr" className="font-serif text-[1.15em] italic text-cream">
                          Partisi
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              </motion.p>
              <motion.p
                className="mt-6 font-serif text-sm italic text-cream/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 1 }}
              >
                (touche le mot pour le refaire)
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
