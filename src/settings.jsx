import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const Ctx = createContext(null)
export const useSettings = () => useContext(Ctx)

const load = (k, d) => {
  try { const v = localStorage.getItem('spidey:' + k); return v === null ? d : JSON.parse(v) } catch { return d }
}

// tiny 8-bit blips generated with the Web Audio API — no audio files needed
const PRESETS = { hover: [660, 880, 0.04, 0.025], click: [440, 880, 0.1, 0.05], swing: [180, 720, 0.28, 0.05], toggle: [520, 780, 0.12, 0.05] }

export function SettingsProvider({ children }) {
  const [dark, setDark] = useState(() => load('dark', true))
  const [sound, setSound] = useState(() => load('sound', true))
  const [miles, setMiles] = useState(() => load('miles', false))
  const audio = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.mode = dark ? 'dark' : 'light'
    root.dataset.hero = miles ? 'miles' : 'classic'
    try {
      localStorage.setItem('spidey:dark', JSON.stringify(dark))
      localStorage.setItem('spidey:sound', JSON.stringify(sound))
      localStorage.setItem('spidey:miles', JSON.stringify(miles))
    } catch {}
  }, [dark, sound, miles])

  const play = useCallback((type = 'click') => {
    if (!sound) return
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!audio.current) audio.current = new AC()
      const ctx = audio.current
      if (ctx.state === 'suspended') ctx.resume()
      const [f1, f2, d, v] = PRESETS[type] || PRESETS.click
      const t = ctx.currentTime
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'square'
      o.frequency.setValueAtTime(f1, t)
      o.frequency.exponentialRampToValueAtTime(f2, t + d)
      g.gain.setValueAtTime(v, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + d)
      o.connect(g).connect(ctx.destination)
      o.start(t)
      o.stop(t + d)
    } catch {}
  }, [sound])

  return <Ctx.Provider value={{ dark, setDark, sound, setSound, miles, setMiles, play }}>{children}</Ctx.Provider>
}
