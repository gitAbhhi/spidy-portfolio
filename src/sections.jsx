import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase, Check, Download, ExternalLink, FolderOpen, Github, GraduationCap, Linkedin,
  Mail, MapPin, Phone, Send, Trophy, User, Cpu, Award, X, Calendar,
} from 'lucide-react'
import { Button, Panel, Sprite, Tag, Title, item, stagger } from './ui'
import { useSettings } from './settings'
import { achievements, certificates, experience, learning, profile, projects, skills } from './data'
import { a } from 'framer-motion/client'
import profilephoto from './assets/profilephoto.jpeg'
import spidy from './assets/spidy.png'


const wrap = { variants: stagger, initial: 'hidden', animate: 'show' }

/* ------------------------------ HOME ------------------------------ */
const SKY = [40, 70, 50, 90, 60, 110, 45, 80, 55, 95, 65, 40, 85, 50, 100, 60]

function Terminal() {
  const lines = ['developer@abhishek', 'build ideas', 'solve problems', 'create impact']
  const [out, setOut] = useState([''])
  useEffect(() => {
    let li = 0, ci = 0, id
    setOut([''])
    const tick = () => {
      if (li >= lines.length) return
      ci++
      const idx = li, text = lines[li].slice(0, ci)
      setOut((o) => { const n = [...o]; n[idx] = text; return n })
      if (ci >= lines[li].length) {
        li++; ci = 0
        if (li < lines.length) setOut((o) => [...o, ''])
        id = setTimeout(tick, 450)
      } else id = setTimeout(tick, 60)
    }
    id = setTimeout(tick, 900)
    return () => clearTimeout(id)
  }, [])
  return (
    <motion.div variants={item} className="w-full max-w-xs rounded-md border-2 border-neon bg-screen shadow-[0_0_24px_rgb(var(--neon)/0.3)]">
      <div className="flex gap-1.5 border-b-2 border-neon/40 px-3 py-2">
        <i className="h-2.5 w-2.5 rounded-full bg-hot" /><i className="h-2.5 w-2.5 rounded-full bg-gold" /><i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="min-h-[7.5rem] space-y-1 p-3 text-base text-neon">
        {out.map((l, i) => (
          <div key={i}>&gt; {l}{i === out.length - 1 && <span className="animate-blink">_</span>}</div>
        ))}
      </div>
    </motion.div>
  )
}

export function Home({ go }) {
  return (
    <motion.div {...wrap} className="relative grid min-h-[480px] items-center gap-8 md:grid-cols-[1.25fr_1fr]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-1 opacity-20" aria-hidden="true">
        {SKY.map((h, i) => (
          <motion.div key={i} initial={{ height: 0 }} animate={{ height: h }} transition={{ delay: 0.3 + i * 0.05, duration: 0.7, ease: 'easeOut' }} className="flex-1 bg-neon" />
        ))}
      </div>
      <div className="relative z-10">
        <motion.p variants={item} className="mb-3 font-display text-sm text-hot">Welcome to my portfolio</motion.p>
        <h1 className="font-display text-3xl leading-snug text-neon sm:text-5xl lg:text-6xl">
          {['BUILDING THE WEB,', 'ONE LINE AT A TIME'].map((line) => (
            <span key={line} className="block">
              {line.split(' ').map((w, i) => (
                <motion.span key={i} variants={item} className="mr-3 inline-block">{w}</motion.span>
              ))}
            </span>
          ))}
        </h1>
        <motion.p variants={item} className="mt-5 text-xl">
          {profile.role} <span className="text-mute">|</span> <span className="text-neon">{profile.stack}</span>
        </motion.p>
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <Button icon={FolderOpen} onClick={() => go('projects')}>View projects</Button>
          <Button tone="gold" icon={Mail} onClick={() => go('contact')}>Contact me</Button>
        </motion.div>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="flex h-[250px] justify-center">
          <motion.div style={{ transformOrigin: 'top center' }} animate={{ rotate: [-14, 14, -14] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center">
            {/* <span className="block h-24 w-[3px] bg-white/80" /> */}
            <motion.div style={{ transformOrigin: 'top center' }} animate={{ rotate: [8, -8, 8] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
              {/* <Sprite size={9} />
               */}
               <img src={spidy} alt="" />
            </motion.div>
          </motion.div>
        </div>
        <Terminal />
      </div>
    </motion.div>
  )
}

/* ------------------------------ ABOUT ------------------------------ */
const Row = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 text-base"><Icon size={16} className="shrink-0 text-hot" />{children}</div>
)

export function About() {
  return (
    <motion.div {...wrap} className="mx-auto w-full max-w-5xl">
      <Title icon={User}>Character profile</Title>
      <div className="grid w-full gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Panel className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ rotate: -4, scale: 1.15 }} className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-md border-2 border-neon bg-gradient-to-b from-frame/50 to-screen">
              {/* <Sprite size={5} /> */}
              <img src={profilephoto} alt="" />
            </motion.div>
            <div>
              <h3 className="font-display text-lg text-neon">{profile.name}</h3>
              <p className="text-mute">{profile.role}</p>
            </div>
          </div>
          <Row icon={GraduationCap}>{profile.degree}, {profile.school}</Row>
          <Row icon={MapPin}>{profile.location}</Row>
          <Row icon={Calendar}>Graduated {profile.graduated}</Row>
          <p className="leading-relaxed">{profile.bio}</p>
          <blockquote className="rounded border-l-4 border-hot bg-screen p-3 text-neon">“{profile.quote}”</blockquote>
          <Button tone="gold" icon={Download} href={profile.resume} download className="self-start">Download resume</Button>
        </Panel>

        <div className="grid w-full gap-5 sm:grid-cols-2">
          <Panel className="sm:col-span-2">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm text-gold"><Briefcase size={18} />Experience</h3>
            <ol className="relative ml-2 space-y-4 border-l-2 border-frame pl-5">
              {experience.map((e) => (
                <motion.li key={e.org} variants={item} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-rim bg-hot" />
                  <p className="text-neon">{e.role}</p>
                  <p>{e.org}</p>
                  <p className="text-sm text-mute">{e.when}</p>
                </motion.li>
              ))}
            </ol>
          </Panel>
          <Panel>
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm text-gold"><GraduationCap size={18} />Education</h3>
            <p className="text-neon">{profile.degree}</p>
            <p>{profile.school}</p>
            <p className="text-sm text-mute">2022 – 2026</p>
            <p>{profile.percentage}%</p>
            <p className="text-neon">Class 12</p>
            <p>Jainarayan Saraswati Vidya Mandir I C, Bareilly</p>
            <p className="text-sm text-mute">2020 – 2021</p>
            <p>84.5%</p>
            <p className="text-neon">Class 10</p>
            <p>Jainarayan Saraswati Vidya Mandir I C, Bareilly</p>
            <p className="text-sm text-mute">2018 – 2019</p>
            <p>88.33%</p>
          </Panel>
          <Panel>
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm text-gold"><Trophy size={18} />Achievements</h3>
            <ul className="space-y-1">{achievements.map((a) => <li key={a}>▸ {a}</li>)}</ul>
            <h3 className="mb-2 mt-4 flex items-center gap-2 font-display text-sm text-gold"><Award size={18} />Certificates</h3>
            <ul className="space-y-1">{certificates.map((a) => <li key={a}>▸ {a}</li>)}</ul>
          </Panel>
          
        </div>
      </div>
    </motion.div>
  )
}

/* ----------------------------- PROJECTS ----------------------------- */
function Modal({ p, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.div
        role="dialog" aria-modal="true" aria-label={p.title}
        initial={{ scale: 0.8, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.85, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="pixel-panel w-full max-w-lg !bg-screen"
      >
        <button onClick={onClose} aria-label="Close" className="float-right rounded p-1 text-hot transition-transform hover:rotate-90"><X /></button>
        <h3 className="font-display text-xl text-neon">{p.title}</h3>
        <p className="mb-3 text-mute">{p.sub}</p>
        <p className="mb-3">{p.desc}</p>
        <ul className="mb-4 space-y-1">{p.features.map((f) => <li key={f}>▸ {f}</li>)}</ul>
        <div className="mb-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded border-2 border-frame px-2 text-sm text-neon">{t}</span>)}</div>
        <div className="flex flex-wrap gap-3">
          <Button icon={ExternalLink} href={p.demo} target="_blank" rel="noreferrer">Live demo</Button>
          <Button tone="gold" icon={Github} href={p.source} target="_blank" rel="noreferrer">Source code</Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [sel, setSel] = useState(null)
  const { play } = useSettings()
  return (
    <motion.div {...wrap}>
      <Title icon={FolderOpen}>Mission archive</Title>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <Panel key={p.title} whileHover={{ y: -6, rotate: -0.6 }} className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-base text-neon">{p.title}</h3>
                <p className="text-mute">{p.sub}</p>
              </div>
              <span className={`rounded px-2 py-0.5 font-display text-[10px] cursor-pointer ${p.live ? 'bg-emerald-500 text-black' : 'bg-frame text-white'}`}>{p.live ? <a href={p.live} target='_blank'>Live</a> : 'COMPLETED'}</span>
            </div>
            <p className="flex-1">{p.desc}</p>
            <motion.div variants={stagger} className="flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</motion.div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button onClick={() => { setSel(p); play('toggle') }}>View details</Button>
              <Button tone="gold" icon={Github} href={p.source} target="_blank" rel="noreferrer">Source code</Button>
            </div>
          </Panel>
        ))}
      </div>
      <AnimatePresence>{sel && <Modal p={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </motion.div>
  )
}

/* ------------------------------ SKILLS ------------------------------ */
export function Skills() {
  return (
    <motion.div {...wrap}>
      <Title icon={Cpu}>Skill tree</Title>
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map(([group, list]) => (
          <Panel key={group}>
            <h3 className="mb-3 font-display text-sm text-gold">{group}</h3>
            <motion.div variants={stagger} className="flex flex-wrap gap-2">{list.map((s) => <Tag key={s}>{s}</Tag>)}</motion.div>
          </Panel>
        ))}
        <Panel className="flex items-center gap-4 border-hot">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}></motion.div>
          <div className="flex-1">
            <p className="font-display text-sm text-hot">Currently learning</p>
            <p className="text-lg text-neon">{learning.join(', ')}</p>
            <div className="mt-2 h-2 overflow-hidden rounded bg-screen">
              <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }} className="h-full w-1/3 bg-hot" />
            </div>
          </div>
        </Panel>
      </div>
    </motion.div>
  )
}

/* ----------------------------- CONTACT ----------------------------- */
export function Contact() {
  const { play } = useSettings()
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    play('swing')
    setSent(true)
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`)
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${body}`
    setTimeout(() => setSent(false), 3000)
  }

// message send on email function
 
const [result, setResult] = useState("");

const keyvalue = import.meta.env.VITE_keyvalue;

const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const handleChange = (event) => {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value,
  });
};

const onSubmit = async (event) => {
  event.preventDefault();

  const dataToSend = new FormData();
  dataToSend.append("access_key", keyvalue);
  dataToSend.append("name", formData.name);
  dataToSend.append("email", formData.email);
  dataToSend.append("message", formData.message);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: dataToSend,
  });

  const data = await response.json();

  if (data.success) {
    setResult("Success!");

    // Clear input values using React state
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  } else {
    setResult("Error");
  }
};

  const links = [[Mail, profile.email, `mailto:${profile.email}`], [Phone, profile.phone, `tel:${profile.phone}`], [Linkedin, 'LinkedIn', profile.linkedin], [Github, 'GitHub', profile.github]]
  return (
    <motion.div {...wrap} className="mx-auto w-full max-w-3xl">
      <Title icon={Mail}>Let’s connect</Title>
      <div className="grid w-full gap-5 md:grid-cols-2">
        <Panel className="w-full">
          <p className="mb-4">I’m always open to new opportunities, collaborations and exciting projects.</p>
          <ul className="space-y-3">
            {links.map(([Icon, label, href]) => (
              <motion.li key={label} whileHover={{ x: 6 }}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-3 text-neon hover:underline">
                  <Icon size={20} className="text-hot" />{label}
                </a>
              </motion.li>
            ))}
          </ul>
        </Panel>
        <Panel className="w-full">
          <form onSubmit={onSubmit}  method="POST" className="space-y-3">

            <label className="block"><span className="mb-1 block text-sm text-mute">Name</span><input type="text"
    name="name"
    placeholder="Your name"
    value={formData.name}
    onChange={handleChange}
    className="field"
    required
  /></label>
            <label className="block"><span className="mb-1 block text-sm text-mute">Email</span><input required type="email" className="field" name='email' value={formData.email} onChange={handleChange} placeholder="your@email.com" /></label>
            <label className="block"><span className="mb-1 block text-sm text-mute">Message</span><textarea required rows={4}name='message' className="field resize-none" value={formData.message} onChange={handleChange} placeholder="Write your message..." /></label>
            <Button type="submit" icon={sent ? Check : Send} className="w-full justify-center">{sent ? 'Opening mail app…' : 'Send message'}</Button>
             <span>{result}</span>
          </form>
        </Panel>
      </div>
    </motion.div>
  )
}
 