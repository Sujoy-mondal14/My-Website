import { useEffect, useRef, useState } from 'react'

const techStages = [
  {
    id: 'start',
    x: 400,
    y: 120,
    align: 'right', // label to the right of dot
    number: null,
    title: 'Start',
    emoji: '🏁',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    badges: [],
  },
  {
    id: 'c',
    x: 390,
    y: 320,
    align: 'left', // label to the left of dot
    number: '01',
    title: 'C/C++',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    badges: [{ label: 'Tech', color: '#38bdf8' }],
    icon: 'C',
  },
  {
    id: 'python',
    x: 450,
    y: 2020,
    align: 'right', // label to the right of dot
    number: '08',
    title: 'Python',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.45)',
    badges: [{ label: 'Python', color: '#3776ab' }],
    icon: '🐍',
  },
  {
    id: 'java',
    x: 230,
    y: 540,
    align: 'right', // label to the right of dot
    number: '02',
    title: 'Java',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    badges: [{ label: 'Tech', color: '#ef4444' }],
    icon: '☕',
  },
  {
    id: 'html-css-js',
    x: 520,
    y: 760,
    align: 'left', // label to the left of dot
    number: '03',
    title: 'HTML, CSS & JS',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    badges: [{ label: 'Tech', color: '#a855f7' }],
    icons: ['H5', 'C3', 'JS'],
    iconColors: ['#e34f26', '#1572b6', '#f7df1e'],
  },
  {
    id: 'react',
    x: 310,
    y: 1020,
    align: 'left', // label to the left of dot
    number: '04',
    title: 'React.js',
    color: '#61dafb',
    glowColor: 'rgba(97, 218, 251, 0.45)',
    badges: [],
    icon: '⚛',
  },
  {
    id: 'node-mongo',
    x: 480,
    y: 1280,
    align: 'left', // label to the left of dot
    number: '05',
    title: 'Node.js & MongoDB',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.45)',
    badges: [{ label: 'Node.js', color: '#22c55e' }],
    icons: ['N', 'M', 'DB'],
    iconColors: ['#339933', '#47a248', '#13aa52'],
  },
  {
    id: 'aws',
    x: 340,
    y: 1540,
    align: 'right', // label to the right of dot
    number: '06',
    title: 'AWS',
    subtitle: '(EC2 & Lambda)',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    badges: [{ label: 'aws', color: '#ff9900' }],
    icon: '☁',
  },

]

// The exact SVG path passing through every milestone point:
// (400,60) -> (400,120) [Start] -> (390,320) [C] -> (230,540) [Java] -> (520,760) [HTML]
// -> (310,1020) [React] -> (480,1280) [Node] -> (340,1540) [AWS] -> (500,1780) [C++]
// -> (450,2020) [Python] -> (430,2220) [Tail]
const MAIN_ROAD_PATH = `
  M 400,60
  L 400,120
  C 400,180 390,240 390,320
  C 390,420 230,420 230,540
  C 230,660 520,620 520,760
  C 520,900 310,880 310,1020
  C 310,1160 480,1140 480,1280
  C 480,1420 340,1400 340,1540
  C 340,1680 500,1660 500,1780
  C 500,1900 450,1900 450,2020
  C 450,2120 430,2140 430,2220
`

const YOUTUBE_BRANCH_PATH = `
  M 520,760
  C 590,780 650,840 650,920
  C 650,1000 680,1040 680,1120
`

function TechStackPage() {
  const [visibleStages, setVisibleStages] = useState(new Set([0]))
  const [pathProgress, setPathProgress] = useState(0)
  const pageRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!pageRef.current || !containerRef.current) return
      const rect = pageRef.current.getBoundingClientRect()
      const scrolled = -rect.top + window.innerHeight * 0.4
      const total = rect.height - window.innerHeight * 0.6
      const progress = Math.min(Math.max(scrolled / total, 0), 1)
      setPathProgress(progress)

      // Progressive reveal based on scroll position down the 2400px track
      const currentY = progress * 2400
      const activeSet = new Set()
      techStages.forEach((stage, idx) => {
        if (currentY >= stage.y - 180) {
          activeSet.add(idx)
        }
      })
      setVisibleStages(activeSet)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={pageRef}
      className="min-h-[300vh] bg-[radial-gradient(ellipse_at_50%_0%,#161d2a_0%,#0b0e14_40%,#06080d_100%)] relative pt-24 pb-48 overflow-hidden select-none"
    >
      {/* Scroll indicator widget */}
      <div className="fixed left-3 md:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none">
        <span className="text-white/40 text-lg leading-none">⌃</span>
        <div className="w-[3px] h-16 bg-white/10 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-emerald-500 via-sky-400 to-amber-500 rounded-full transition-all duration-100"
            style={{ height: `${pathProgress * 100}%` }}
          />
        </div>
        <span className="text-white/40 text-lg leading-none">⌄</span>
      </div>

      {/* Main Roadmap Canvas — 800px coordinate system */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[800px] h-[2350px] mx-auto px-4"
      >
        {/* SVG Road Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 800 2350"
          preserveAspectRatio="xMidYMin meet"
        >
          <defs>
            <linearGradient id="roadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="15%" stopColor="#38bdf8" />
              <stop offset="30%" stopColor="#ef4444" />
              <stop offset="45%" stopColor="#a855f7" />
              <stop offset="60%" stopColor="#61dafb" />
              <stop offset="70%" stopColor="#22c55e" />
              <stop offset="80%" stopColor="#f97316" />
              <stop offset="90%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>

          {/* Background dashed road */}
          <path
            d={MAIN_ROAD_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3.5"
            strokeDasharray="12 8"
          />

          {/* Active colorful dashed road, traced as user scrolls */}
          <path
            d={MAIN_ROAD_PATH}
            fill="none"
            stroke="url(#roadGradient)"
            strokeWidth="4"
            strokeDasharray="12 8"
            strokeDashoffset={2400 - pathProgress * 2400}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />

          {/* YouTube red dashed branch road */}
          <path
            d={YOUTUBE_BRANCH_PATH}
            fill="none"
            stroke="rgba(239,68,68,0.4)"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
        </svg>

        {/* Milestones — Each dot is centered directly on (x, y) */}
        {techStages.map((stage, index) => {
          const isVisible = visibleStages.has(index)
          const leftPercent = (stage.x / 800) * 100

          return (
            <div
              key={stage.id}
              className={`absolute z-10 transition-all duration-700 pointer-events-auto ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              style={{
                left: `${leftPercent}%`,
                top: `${stage.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Glowing Node Dot exactly on the road */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Outer Glow Halo */}
                <div
                  className="absolute w-24 h-24 rounded-full blur-2xl opacity-60 pointer-events-none"
                  style={{ backgroundColor: stage.glowColor }}
                />
                {/* Node Ring */}
                <div
                  className="w-5 h-5 rounded-full border-2 border-white relative z-10 shadow-lg"
                  style={{
                    backgroundColor: stage.color,
                    boxShadow: `0 0 16px ${stage.color}`,
                  }}
                />
              </div>

              {/* Node Label & Badges positioned directly next to the dot */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-3 whitespace-nowrap ${stage.align === 'right'
                    ? 'left-full pl-3.5 text-left flex-row'
                    : 'right-full pr-3.5 text-right flex-row-reverse'
                  }`}
              >
                {/* Small Tech Badge if available */}
                {stage.badges.length > 0 && (
                  <span
                    className="inline-block text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded text-white shadow-sm"
                    style={{ backgroundColor: stage.badges[0].color }}
                  >
                    {stage.badges[0].label}
                  </span>
                )}

                {/* Milestone Name */}
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-lg md:text-xl font-bold text-white tracking-wide drop-shadow">
                    {stage.number && (
                      <span className="text-slate-400 font-normal mr-1">{stage.number}.</span>
                    )}
                    {stage.title}
                    {stage.subtitle && (
                      <span className="text-slate-400 font-normal text-sm ml-1">
                        {stage.subtitle}
                      </span>
                    )}
                  </span>
                  {stage.emoji && <span className="text-xl ml-1">{stage.emoji}</span>}
                </div>

                {/* Single or Multi-icon badges */}
                {stage.icons ? (
                  <div className="flex gap-1">
                    {stage.icons.map((icon, ii) => (
                      <span
                        key={ii}
                        className="inline-flex items-center justify-center w-6 h-6 rounded text-[10px] font-black text-white shadow"
                        style={{ backgroundColor: stage.iconColors?.[ii] || stage.color }}
                      >
                        {icon}
                      </span>
                    ))}
                  </div>
                ) : stage.icon ? (
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold text-white shadow"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stage.icon}
                  </span>
                ) : null}
              </div>
            </div>
          )
        })}

        {/* YouTube Content Creation Branch items pinned to the branch path */}
        <div
          className={`absolute z-10 transition-all duration-700 ${visibleStages.has(3) ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            left: `${(650 / 800) * 100}%`,
            top: '920px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Branch Node 1 */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-red-500 border border-white shadow-md shadow-red-500/50" />
            <div className="absolute w-16 h-16 rounded-full blur-xl bg-red-500/30" />
          </div>
          <div className="absolute left-full top-1/2 -translate-y-1/2 pl-3 whitespace-nowrap text-left">
            <p className="font-sans text-xs font-semibold text-white/80">YouTube Content Creation</p>
            <p className="text-[11px] text-white/50 flex items-center gap-1.5">
              <span className="text-red-500">▶</span> Channel & Tech Videos
            </p>
          </div>
        </div>

        <div
          className={`absolute z-10 transition-all duration-700 ${visibleStages.has(3) ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            left: `${(680 / 800) * 100}%`,
            top: '1120px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Branch Node 2 */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-red-500 border border-white shadow-md shadow-red-500/50" />
            <div className="absolute w-16 h-16 rounded-full blur-xl bg-red-500/30" />
          </div>
          <div className="absolute left-full top-1/2 -translate-y-1/2 pl-3 whitespace-nowrap text-left">
            <p className="text-[11px] text-white/60 flex items-center gap-1.5">
              <span className="text-red-500">▶</span> Video Production & Community
            </p>
          </div>
        </div>

        {/* Journey Continues script text pinned at the end of the road */}
        <div
          className="absolute z-10 text-right whitespace-nowrap transition-all duration-1000"
          style={{
            left: `${(430 / 800) * 100}%`,
            top: '2240px',
            transform: 'translate(-30%, 0)',
          }}
        >
          <p className="font-display italic text-2xl md:text-3xl text-white/65">
            and the journey continues...
          </p>
        </div>
      </div>
    </section>
  )
}

export default TechStackPage
