import { motion, useScroll, useSpring } from 'framer-motion'
import { scenes, type SceneId } from '../config/content'
import { scrollToId } from '../hooks/useActiveScene'

/** Journey indicator: a hairline bar on top + a clickable chapter rail. */
export function ProgressRail({ active }: { active: SceneId }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const index = scenes.findIndex((s) => s.id === active)
  const dark = active === 'mchat'

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-burgundy/70"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Mobile chapter pill */}
      <div
        className={`fixed left-4 top-[max(0.75rem,env(safe-area-inset-top))] z-40 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase backdrop-blur-md transition-colors duration-500 md:hidden ${
          dark ? 'bg-cream/10 text-cream/85' : 'bg-cream/70 text-burgundy/80 shadow-[0_1px_8px_rgba(56,51,51,0.06)]'
        }`}
        aria-live="polite"
      >
        <span className="font-serif text-sm italic tracking-normal">{String(index + 1).padStart(2, '0')}</span>
        <span className="opacity-40">/</span>
        <span>{scenes[index]?.label}</span>
      </div>

      {/* Desktop rail */}
      <nav
        aria-label="Progression"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      >
        {scenes.map((s, i) => {
          const on = s.id === active
          const done = i < index
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToId(s.id)}
              className="group flex items-center gap-3"
              aria-current={on ? 'step' : undefined}
              aria-label={`${String(i + 1).padStart(2, '0')} — ${s.label}`}
            >
              <span
                className={`font-serif text-sm italic transition-all duration-500 ${
                  on ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70'
                } ${dark ? 'text-cream' : 'text-burgundy'}`}
              >
                {s.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-500 ${on ? 'h-6 w-[3px]' : 'h-[7px] w-[7px]'} ${
                  dark ? (on || done ? 'bg-cream' : 'bg-cream/30') : on || done ? 'bg-burgundy' : 'bg-burgundy/25'
                }`}
              />
            </button>
          )
        })}
      </nav>
    </>
  )
}
