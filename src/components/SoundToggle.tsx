import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * Optional, never autoplayed ambience. The sound is synthesised live with the
 * Web Audio API (a soft pad + sparse music-box notes), so there is no music
 * file and no copyright concern.
 */
class Ambience {
  ctx: AudioContext
  master: GainNode
  timer: number | undefined
  nodes: AudioScheduledSourceNode[] = []

  constructor() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0
    const lp = this.ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1400
    this.master.connect(lp).connect(this.ctx.destination)

    // Pad: a quiet chord of detuned sines with a slow breathing LFO
    const pad = this.ctx.createGain()
    pad.gain.value = 0.05
    pad.connect(this.master)
    const lfo = this.ctx.createOscillator()
    const lfoGain = this.ctx.createGain()
    lfo.frequency.value = 0.08
    lfoGain.gain.value = 0.025
    lfo.connect(lfoGain).connect(pad.gain)
    lfo.start()
    this.nodes.push(lfo)
    ;[174.61, 220, 261.63, 329.63].forEach((f, i) => {
      const o = this.ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      o.detune.value = (i % 2 ? 1 : -1) * 6
      o.connect(pad)
      o.start()
      this.nodes.push(o)
    })
  }

  chime() {
    const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
    const f = notes[Math.floor(Math.random() * notes.length)]
    const t = this.ctx.currentTime
    const o = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    o.type = 'triangle'
    o.frequency.value = f
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.06, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2)
    o.connect(g).connect(this.master)
    o.start(t)
    o.stop(t + 3.3)
  }

  async play() {
    await this.ctx.resume()
    const t = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(t)
    this.master.gain.setValueAtTime(this.master.gain.value, t)
    this.master.gain.linearRampToValueAtTime(0.9, t + 2.5)
    const loop = () => {
      this.chime()
      this.timer = window.setTimeout(loop, 2200 + Math.random() * 3800)
    }
    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(loop, 1200)
  }

  pause() {
    window.clearTimeout(this.timer)
    const t = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(t)
    this.master.gain.setValueAtTime(this.master.gain.value, t)
    this.master.gain.linearRampToValueAtTime(0, t + 1)
    window.setTimeout(() => this.ctx.state === 'running' && !this.timer && this.ctx.suspend(), 1100)
    this.timer = undefined
  }
}

export function SoundToggle({ dark = false }: { dark?: boolean }) {
  const [on, setOn] = useState(false)
  const engine = useRef<Ambience | null>(null)

  useEffect(() => () => engine.current?.pause(), [])

  const toggle = () => {
    try {
      if (!engine.current) engine.current = new Ambience()
      if (on) engine.current.pause()
      else void engine.current.play()
      setOn(!on)
    } catch {
      /* Web Audio unavailable — the site works fine without it */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Couper l’ambiance sonore' : 'Activer une ambiance sonore douce'}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-11 items-center gap-2 rounded-full px-4 text-xs tracking-[0.14em] uppercase backdrop-blur-md transition-all duration-500 hover:scale-[1.03] active:scale-95 md:right-6 ${
        dark ? 'bg-cream/10 text-cream/85 ring-1 ring-cream/20' : 'bg-cream/75 text-burgundy ring-1 ring-burgundy/15 shadow-[0_4px_18px_rgba(99,47,61,0.08)]'
      }`}
    >
      {on ? <Volume2 size={16} strokeWidth={1.5} /> : <VolumeX size={16} strokeWidth={1.5} />}
      <span className="hidden sm:inline">{on ? 'Ambiance' : 'Son'}</span>
      {on && (
        <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[2px] rounded-full bg-current"
              style={{ height: '100%', animation: `eq 1.${2 + i}s ease-in-out ${i * 0.15}s infinite alternate` }}
            />
          ))}
          <style>{`@keyframes eq{from{transform:scaleY(.3)}to{transform:scaleY(1)}}`}</style>
        </span>
      )}
    </button>
  )
}
