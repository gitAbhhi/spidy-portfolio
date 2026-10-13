import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cpu, FolderOpen, Home as HomeIcon, Mail, Moon, Settings, Sun, User, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { About, Contact, Home, Projects, Skills } from './sections'
import { useSettings } from './settings'

const TABS = [
  ['home', 'Home', HomeIcon], ['about', 'About', User], ['projects', 'Projects', FolderOpen],
  ['skills', 'Skills', Cpu], ['contact', 'Contact', Mail],
]

function Toggle({ on, onChange, icon: Icon, label }) {
  return (
    <button role="switch" aria-checked={on} onClick={onChange} className="flex w-full items-center justify-between gap-3 rounded px-2 py-2 transition-colors hover:bg-frame/20">
      <span className="flex items-center gap-2 "><Icon size={18} className="text-neon" />{label}</span>
      <span className={`flex h-6 w-11 items-center rounded-full border-2  p-0.5 transition-colors border-blue-700 ${on ? 'justify-end bg-gold' : 'justify-start bg-screen '}`}>
        <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="h-4 w-4 rounded-full bg-blue-900" />
      </span>
    </button>
  )
}

function NavBtn({ id, label, Icon, mobile, tab, go, play }) {
  const active = tab === id
  return (
    <button
      onClick={() => { play('swing'); go(id) }}
      onMouseEnter={() => play('hover')}
      aria-current={active ? 'page' : undefined}
      className={`relative rounded-md font-display text-xs transition-colors ${mobile ? 'flex flex-1 flex-col items-center gap-1 px-1 py-2 text-[10px]' : 'px-4 py-2 sm:text-sm'} ${active ? 'text-white' : 'text-white/60 hover:text-white'}`}
    >
      {active && <motion.span layoutId={mobile ? 'pill-m' : 'pill'} className="absolute inset-0 rounded-md bg-neon" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
      <span className={`relative z-10 flex ${mobile ? 'flex-col items-center gap-1' : ''}`}>{mobile && <Icon size={20} />}{label}</span>
    </button>
  )
}

export default function App() {
  const { dark, setDark, sound, setSound, miles, setMiles, play } = useSettings()
  const [open, setOpen] = useState(false)
  const settingsRef = useRef(null)
  const toggleRef = useRef(null)
  const [tab, setTab] = useState(() => {
    const h = window.location.hash.slice(1)
    return TABS.some((t) => t[0] === h) ? h : 'home'
  })
  const go = useCallback((id) => {
    setTab(id)
    history.replaceState(null, '', '#' + id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event) => {
      const clickedInsideToggle = toggleRef.current?.contains(event.target)
      const clickedInsidePanel = settingsRef.current?.contains(event.target)

      if (!clickedInsideToggle && !clickedInsidePanel) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown, { passive: true })

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [open])

  const Page = { home: Home, about: About, projects: Projects, skills: Skills, contact: Contact }[tab]
  const idx = TABS.findIndex((t) => t[0] === tab)

  return (
    <div className="min-h-screen px-3 py-4 pb-28 md:px-8 md:py-10 md:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="pixel-window mx-auto max-w-6xl p-3 md:p-4"
      >
        <header className="relative z-30 mb-3 flex items-center gap-3">
          <motion.div whileHover={{ rotate: 12 }} className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-gold bg-rim">
            <span className="flex gap-1"><i className="h-4 w-3 rounded-full bg-white" /><i className="h-4 w-3 rounded-full bg-white" /></span>
          </motion.div>
          <div className="flex-1 rounded-md border-2 border-rim bg-rim/70 px-3 py-2 font-display text-lg text-white sm:text-2xl md:flex-none md:px-5">ABHISHEK.exe</div>
          <nav aria-label="Main" className="hidden flex-1 items-center gap-1 rounded-md border-2 border-rim bg-rim/70 p-1 md:flex">
            {TABS.map(([id, label, Icon]) => <NavBtn key={id} id={id} label={label} Icon={Icon} tab={tab} go={go} play={play} />)}
            <span className="ml-auto mr-2 flex gap-1.5"><i className="h-3 w-3 rounded-full bg-hot" /><i className="h-3 w-3 rounded-full bg-gold" /><i className="h-3 w-3 rounded-full bg-emerald-400" /></span>
          </nav>
          <div className="relative">
            <motion.button
              ref={toggleRef}
              whileHover={{ rotate: 20, scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={() => { setOpen(!open); play('toggle') }} aria-label="Theme and settings" aria-expanded={open}
              className="grid h-12 w-12 place-items-center rounded-md border-2 border-rim bg-white text-rim"
            ><Settings /></motion.button>
            <AnimatePresence>
              {open && (
                <motion.div
                  ref={settingsRef}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="pixel-panel absolute right-0 top-full z-40 mt-3 w-64 !bg-screen"
                >
                  <p className="mb-2 font-display text-xs text-gold">Theme / settings</p>
                  <Toggle on={dark} onChange={() => { setDark(!dark); play('toggle') }} icon={dark ? Moon : Sun} label="Dark mode" />
                  <Toggle on={sound} onChange={() => setSound(!sound)} icon={sound ? Volume2 : VolumeX} label="Sound effects" />
                  <Toggle on={miles} onChange={() => { setMiles(!miles); play('toggle') }} icon={Sparkles} label="Miles theme" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="screen scanlines relative min-h-[540px] overflow-hidden rounded-md p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(6px)' }} transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Page go={go} />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mt-3 flex items-center justify-between gap-3 rounded-md border-2 border-rim bg-rim/70 px-4 py-2 font-display text-[10px] text-neon sm:text-xs">
          <span className="flex items-center gap-2 text-blue-500"><i className="h-2.5 w-2.5 animate-blink rounded-full bg-hot  " />SYSTEM ONLINE // OPEN TO OPPORTUNITIES</span>
          <span className="flex gap-1" aria-hidden="true">
            {TABS.map((t, i) => <motion.i key={t[0]} animate={{ backgroundColor: i <= idx ? 'rgb(61,224,255)' : 'rgba(61,224,255,0.2)', scaleY: i === idx ? 1.5 : 1 }} className="h-3 w-4" />)}
          </span>
        </footer>
      </motion.div>

      <nav aria-label="Mobile" className="fixed inset-x-3 bottom-3 z-30 flex gap-1 rounded-xl border-4 border-frame bg-rim p-1 md:hidden">
        {TABS.map(([id, label, Icon]) => <NavBtn key={id} id={id} label={label} Icon={Icon} mobile tab={tab} go={go} play={play} />)}
      </nav>
    </div>
  )
}
