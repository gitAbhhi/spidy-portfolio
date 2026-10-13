import { motion } from 'framer-motion'
import { useSettings } from './settings'

export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
export const item = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

// 12x15 pixel-art Spider-Man, drawn from a character map
const MAP = [
  '...RRRRRR...', '..RRRRRRRR..', '.RRWWRRWWRR.', '.RRWWRRWWRR.', '.RRRRRRRRRR.',
  '..RRRRRRRR..', '.RRRRKKRRRR.', '.RRRRKKRRRR.', '..RRRKKRRR..', '...BBBBBB...',
  '...BBBBBB...', '..BBB..BBB..', '..BBB..BBB..', '..RRR..RRR..', '.RRRR..RRRR.',
]
const COL = { R: '#e8392f', B: '#1f4fd8', K: '#10131c', W: '#ffffff' }

export function Sprite({ size = 8, className = '' }) {
  return (
    <svg viewBox="0 0 12 15" width={12 * size} height={15 * size} shapeRendering="crispEdges" className={className} aria-hidden="true">
      {MAP.flatMap((row, y) =>
        [...row].map((c, x) => (c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COL[c]} />))
      )}
    </svg>
  )
}

const tones = { hot: 'bg-hot text-white', gold: 'bg-gold text-[#2a1600]', ghost: 'bg-panel text-neon' }

export function Button({ tone = 'hot', icon: Icon, children, className = '', onClick, ...p }) {
  const { play } = useSettings()
  const As = p.href ? motion.a : motion.button
  return (
    <As
      whileHover={{ y: -3 }}
      whileTap={{ y: 3 }}
      onMouseEnter={() => play('hover')}
      onClick={(e) => { play('click'); onClick?.(e) }}
      className={`inline-flex items-center gap-2 rounded-md border-2 border-rim px-4 py-2 font-display text-xs shadow-[0_5px_0_0_rgb(var(--rim))] transition-shadow active:shadow-none sm:text-sm ${tones[tone]} ${className}`}
      {...p}
    >
      {Icon && <Icon size={18} />}
      {children}
    </As>
  )
}

export function Panel({ className = '', children, ...p }) {
  return <motion.div variants={item} className={`pixel-panel ${className}`} {...p}>{children}</motion.div>
}

export function Tag({ children }) {
  return (
    <motion.span
      variants={item}
      whileHover={{ y: -3, scale: 1.08 }}
      className="inline-block rounded border-2 border-frame bg-screen px-2 py-0.5 text-sm text-neon"
    >
      {children}
    </motion.span>
  )
}

export function Title({ icon: Icon, children }) {
  return (
    <motion.h2 variants={item} className="mb-6 flex items-center gap-3 font-display text-2xl text-neon sm:text-3xl">
      <Icon className="shrink-0 text-hot" size={30} />
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="hidden h-1 flex-1 origin-left rounded bg-gradient-to-r from-hot to-transparent sm:block"
      />
    </motion.h2>
  )
}
