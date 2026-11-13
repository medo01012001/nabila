import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { finale } from '../config/content'
import { Flower } from '../components/Flower'
import { Floaters } from '../components/Floaters'
import { scrollToId } from '../hooks/useActiveScene'

const ease = [0.22, 1, 0.36, 1] as const
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 1.2, delay, ease },
})

export function Finale() {
  return (
    <section id="finale" className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-cream px-6 py-28 text-center">
      <Floaters count={20} seed={42} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/20 blur-3xl" aria-hidden="true" />

      {/* a small bouquet of three line-art flowers */}
      <div className="relative mb-10 flex items-end justify-center" aria-hidden="true">
        <Flower className="-mr-6 h-32 w-auto -rotate-12 opacity-80 md:h-40" inView delay={0.6} petals={5} />
        <Flower className="relative z-10 h-48 w-auto md:h-60" inView delay={0} />
        <Flower className="-ml-6 h-28 w-auto rotate-12 opacity-80 md:h-36" inView delay={1.1} petals={7} />
      </div>

      <div className="relative max-w-2xl">
        <motion.p lang="ar" dir="rtl" className="font-ar text-[clamp(1.6rem,6vw,2.6rem)] leading-[1.7] font-medium text-burgundy" {...fade(0.2)}>
          {finale.line1}
        </motion.p>
        <motion.p lang="ar" dir="rtl" className="mt-2 font-ar text-[clamp(1.2rem,4.5vw,1.8rem)] leading-[1.8] font-light text-charcoal/80" {...fade(0.9)}>
          {finale.line2}
        </motion.p>

        <motion.div className="hairline mx-auto my-10 w-32" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 1.5, ease }} />

        <motion.p lang="ar" dir="rtl" className="font-ruqaa text-[clamp(2rem,8vw,3.4rem)] leading-[1.5] text-burgundy" {...fade(1.8)}>
          {finale.ar}
        </motion.p>
        <motion.p lang="fr" className="mt-3 font-serif text-[clamp(1.4rem,5vw,2.2rem)] italic text-charcoal/80" {...fade(2.4)}>
          {finale.fr}
        </motion.p>

        <motion.button
          type="button"
          onClick={() => scrollToId('intro')}
          className="group mx-auto mt-16 flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-xs tracking-[0.22em] text-burgundy/70 uppercase ring-1 ring-burgundy/20 transition hover:bg-burgundy hover:text-cream"
          {...fade(3)}
        >
          <ArrowUp size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5" />
          {finale.replay}
        </motion.button>
      </div>

      <p className="absolute bottom-6 left-0 right-0 font-serif text-xs tracking-[0.3em] text-burgundy/40 uppercase">N — {new Date().getFullYear()}</p>
    </section>
  )
}
