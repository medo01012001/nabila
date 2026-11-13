import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { scenes, type SceneId } from './config/content'
import { useActiveScene } from './hooks/useActiveScene'
import { ProgressRail } from './components/ProgressRail'
import { SoundToggle } from './components/SoundToggle'
import { Intro } from './scenes/Intro'
import { Letter } from './scenes/Letter'
import { LittleThings } from './scenes/LittleThings'
import { Photos } from './scenes/Photos'
import { Mchat } from './scenes/Mchat'
import { Finale } from './scenes/Finale'

const ids = scenes.map((s) => s.id)

export default function App() {
  const [opened, setOpened] = useState(false)
  const [curtain, setCurtain] = useState(false)
  const active = useActiveScene(ids) as SceneId

  // The gift stays "wrapped" (scroll locked) until the visitor opens it.
  useEffect(() => {
    document.body.classList.toggle('is-locked', !opened)
    if (!opened) window.scrollTo(0, 0)
  }, [opened])

  const open = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setOpened(true)
      requestAnimationFrame(() => document.getElementById('letter')?.scrollIntoView())
      return
    }
    setCurtain(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Intro onOpen={open} />
        <Letter />
        <LittleThings />
        <Photos />
        <Mchat />
        <Finale />
      </main>

      {opened && <ProgressRail active={active} />}
      <SoundToggle dark={active === 'mchat'} />

      {/* page-turn curtain between the intro and the letter */}
      <AnimatePresence>
        {curtain && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-burgundy"
            initial={{ clipPath: 'circle(0% at 50% 85%)' }}
            animate={{ clipPath: 'circle(150% at 50% 85%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={(def) => {
              // only react to the "enter" animation finishing
              if (typeof def === 'object' && def && 'clipPath' in def && String(def.clipPath).startsWith('circle(150')) {
                setOpened(true)
                requestAnimationFrame(() => {
                  window.scrollTo({ top: document.getElementById('letter')?.offsetTop ?? 0, behavior: 'instant' })
                  setTimeout(() => setCurtain(false), 250)
                })
              }
            }}
            aria-hidden="true"
          >
            <motion.span
              className="font-serif text-5xl text-cream italic md:text-7xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              pour toi.
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
