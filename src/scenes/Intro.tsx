import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { intro } from '../config/content'
import { Flower, Sprig } from '../components/Flower'
import { Floaters } from '../components/Floaters'

const ease = [0.22, 1, 0.36, 1] as const

export function Intro({ onOpen }: { onOpen: () => void }) {
  const letters = Array.from(intro.hello)

  return (
    <section id="intro" className="grain relative flex min-h-svh flex-col overflow-hidden bg-cream">
      <Floaters count={14} seed={3} />

      {/* soft framing */}
      <div className="pointer-events-none absolute inset-3 rounded-[2px] border border-burgundy/10 md:inset-6" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-rose/25 blur-3xl md:h-[28rem] md:w-[28rem]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-beige blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, delay: 0.4 }}
      />

      <header className="relative z-10 flex items-center justify-between px-7 pt-[max(1.75rem,env(safe-area-inset-top))] md:px-14 md:pt-12">
        <motion.p className="kicker" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>
          A little reminder
        </motion.p>
        <motion.p
          className="font-serif text-sm italic text-burgundy/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          N° 01
        </motion.p>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-6 px-7 pb-16 pt-6 md:grid-cols-[1.25fr_0.75fr] md:px-14">
        <div className="relative">
          <h1 className="whitespace-nowrap font-serif text-[clamp(3.2rem,13vw,7.25rem)] leading-[0.92] font-normal tracking-[-0.02em] text-burgundy">
            <span className="sr-only">{intro.hello}</span>
            <span aria-hidden="true" className="inline-block">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  className={`inline-block ${i >= 6 ? 'italic' : ''}`}
                  initial={{ opacity: 0, y: '0.5em', rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.9, ease }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            className="hairline my-7 w-40 md:my-9"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 1.2, ease }}
            style={{ originX: 0 }}
          />

          <div lang="ar" dir="rtl" className="max-w-xl text-right md:mr-auto md:max-w-lg">
            <motion.p
              className="font-ar text-[clamp(1.55rem,5.6vw,2.35rem)] leading-[1.6] font-medium text-charcoal"
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.6, duration: 1.1, ease }}
            >
              {intro.line1}
            </motion.p>
            <motion.p
              className="mt-3 font-ar text-[1.05rem] leading-[2] font-light text-charcoal/80 md:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 1.1, ease }}
            >
              {intro.line2}
            </motion.p>
          </div>

          <motion.p
            lang="fr"
            className="mt-6 font-serif text-xl italic text-burgundy/80 md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1.2 }}
          >
            {intro.fr}
          </motion.p>

          <motion.div
            className="mt-10 flex items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1, ease }}
          >
            <button
              type="button"
              onClick={onOpen}
              className="group relative inline-flex min-h-14 items-center gap-3 overflow-hidden rounded-full bg-burgundy px-8 py-4 text-cream shadow-[0_14px_40px_-12px_rgba(99,47,61,0.6)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" aria-hidden="true" />
              <span className="absolute inset-0 animate-[ping_3s_cubic-bezier(0,0,.2,1)_infinite] rounded-full ring-1 ring-burgundy/40" aria-hidden="true" />
              <span lang="ar" dir="rtl" className="relative font-ar text-lg font-medium">
                {intro.cta}
              </span>
              <ArrowDown size={18} strokeWidth={1.6} className="relative transition-transform duration-500 group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        <div className="pointer-events-none relative hidden h-full min-h-[420px] md:block" aria-hidden="true">
          <Flower className="absolute bottom-6 right-6 h-[440px] w-auto" delay={0.8} />
          <Sprig className="absolute left-4 top-10 h-40 w-auto opacity-50" />
          <motion.span
            className="absolute right-0 top-1/3 font-serif text-[11px] tracking-[0.4em] text-burgundy/40 uppercase [writing-mode:vertical-rl]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1.5 }}
          >
            pour Nabila — avec amitié
          </motion.span>
        </div>
      </div>

      {/* Mobile flower peeking from the corner */}
      <Flower className="pointer-events-none absolute -bottom-2 right-16 h-52 w-auto opacity-90 md:hidden" delay={1} />
    </section>
  )
}
