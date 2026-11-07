import { useCallback, useEffect, useRef, useState } from 'react'

function ContactPage() {
  const [letterState, setLetterState] = useState('held') // 'held' | 'dropping' | 'opening' | 'open'
  const windLayerRef = useRef(null)

  // Build wind streaks and shards dynamically
  const buildEffects = useCallback(() => {
    const container = windLayerRef.current
    if (!container) return
    container.innerHTML = ''

    // Wind lines
    for (let i = 0; i < 18; i++) {
      const line = document.createElement('div')
      line.className = 'wind-line'
      const top = 10 + Math.random() * 80
      const width = 90 + Math.random() * 220
      const dur = 1.1 + Math.random() * 1.2
      const delay = -Math.random() * 2.5
      const maxOp = 0.25 + Math.random() * 0.6

      line.style.top = `${top}%`
      line.style.width = `${width}px`
      line.style.setProperty('--dur', `${dur}s`)
      line.style.setProperty('--delay', `${delay}s`)
      line.style.setProperty('--max-op', maxOp)
      container.appendChild(line)
    }

    // Geometric shards
    for (let i = 0; i < 14; i++) {
      const shard = document.createElement('div')
      shard.className = 'shard'
      const left = 48 + Math.random() * 20
      const top = 22 + Math.random() * 48
      const size = 6 + Math.random() * 12
      const dur = 1.4 + Math.random() * 1.4
      const delay = -Math.random() * 2.5

      shard.style.left = `${left}%`
      shard.style.top = `${top}%`
      shard.style.setProperty('--size', `${size}px`)
      shard.style.setProperty('--dur', `${dur}s`)
      shard.style.setProperty('--delay', `${delay}s`)
      container.appendChild(shard)
    }
  }, [])

  useEffect(() => {
    buildEffects()
  }, [buildEffects])

  const handleLetterClick = () => {
    if (letterState !== 'held') return
    setLetterState('dropping')
    setTimeout(() => setLetterState('opening'), 800)
    setTimeout(() => setLetterState('open'), 1400)
  }

  const handleCloseModal = () => {
    setLetterState('held')
  }

  const contactLinks = [
    { icon: '✉', label: 'Email', href: 'sujoymondal14188521@gmail.com', color: '#38bdf8' },
    { icon: '⌘', label: 'GitHub', href: 'https://github.com/Sujoy-mondal14', color: '#f0f0f0' },
    { icon: '🔗', label: 'LinkedIn', href: 'https://linkedin.com/in/sujoy-mondal14', color: '#0077b5' },
    // { icon: '💬', label: 'Discord', href: '#', color: '#5865f2' },
  ]

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_50%_45%,#161d2a_0%,#0b0e14_50%,#05070a_100%)] flex flex-col items-center justify-center relative overflow-hidden pt-20 px-4">
      {/* 16:9 Stage Container */}
      <div className="relative w-[min(92vw,1120px)] aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-3xl bg-[radial-gradient(circle_at_52%_48%,#1a2333_0%,#0d1119_58%,#06080d_100%)] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.75)] overflow-hidden flex items-center justify-center">
        {/* Wind streaks layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" ref={windLayerRef}></div>

        {/* Pigeon rig */}
        <div className="relative z-10 w-[75%] md:w-[56%] max-w-[600px] pigeon-hover drop-shadow-[0_22px_35px_rgba(0,0,0,0.75)] drop-shadow-[0_0_28px_rgba(56,189,248,0.16)]">
          <svg viewBox="0 0 680 440" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyanEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="wingMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="wingNeon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* BACK WING */}
            <g className="wing-back">
              <polygon points="295,210 345,95 365,155" fill="#334155" stroke="#64748b" strokeWidth="0.8" />
              <polygon points="315,215 365,155 390,115 375,195" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="0.8" />
              <polygon points="330,220 375,195 405,145 385,215" fill="#38bdf8" fillOpacity="0.45" stroke="#7dd3fc" strokeWidth="0.8" />
              <polygon points="295,210 335,175 365,155" fill="#475569" stroke="#94a3b8" strokeWidth="0.8" />
            </g>

            {/* TAIL FEATHERS */}
            <g className="tail-group">
              <polygon points="395,295 510,315 495,340 385,312" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              <polygon points="390,308 505,345 480,365 380,320" fill="#334155" stroke="#38bdf8" strokeWidth="1" />
              <polygon points="382,316 465,372 440,382 372,324" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.9" />
            </g>

            {/* BODY & HEAD */}
            <g className="body-group">
              <polygon points="255,155 288,145 275,175" fill="#38bdf8" />
              <polygon points="265,160 305,155 282,175" fill="#818cf8" />
              <polygon points="238,182 262,156 282,175 256,195" fill="#475569" stroke="#94a3b8" strokeWidth="0.9" />
              <polygon points="256,195 282,175 305,192 272,212" fill="#1e293b" stroke="#475569" strokeWidth="0.9" />
              <circle cx="262" cy="182" r="5.5" fill="#090d16" stroke="#cbd5e1" strokeWidth="1.5" />
              <circle cx="260.5" cy="180.5" r="1.8" fill="#ffffff" />
              <polygon points="222,202 240,183 246,196" fill="#cbd5e1" stroke="#ffffff" strokeWidth="0.8" />
              <polygon points="222,202 246,196 238,205" fill="#64748b" />
              <polygon points="272,212 305,192 332,228 292,238" fill="url(#cyanEdge)" stroke="#475569" strokeWidth="0.9" />
              <polygon points="246,196 272,212 292,238 265,255" fill="#1e293b" stroke="#334155" strokeWidth="0.9" />
              <polygon points="265,255 292,238 320,268 282,292" fill="#0f172a" stroke="#334155" strokeWidth="0.9" />
              <polygon points="292,238 332,228 355,265 320,268" fill="#334155" stroke="#64748b" strokeWidth="0.9" />
              <polygon points="282,292 320,268 358,298 315,318" fill="#1e293b" stroke="#475569" strokeWidth="0.9" />
              <polygon points="320,268 355,265 395,295 358,298" fill="#475569" stroke="#94a3b8" strokeWidth="0.9" />
              <polygon points="315,318 358,298 395,315 352,332" fill="#0f172a" stroke="#334155" strokeWidth="0.9" />
              <polyline points="348,330 342,352 356,362" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="365,328 360,350 374,360" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* FRONT WING */}
            <g className="wing-front">
              <polygon points="312,235 425,145 530,52 440,175 345,248" fill="url(#wingMetal)" stroke="#cbd5e1" strokeWidth="1.1" />
              <polygon points="425,145 548,82 465,182" fill="url(#wingNeon)" stroke="#7dd3fc" strokeWidth="1" />
              <polygon points="410,168 532,124 455,205" fill="#38bdf8" fillOpacity="0.65" stroke="#bae6fd" strokeWidth="1" />
              <polygon points="392,190 508,168 438,225" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <polygon points="375,210 485,205 422,244" fill="#334155" stroke="#94a3b8" strokeWidth="0.9" />
              <polygon points="355,228 455,238 402,262" fill="#1e293b" stroke="#64748b" strokeWidth="0.9" />
              <polygon points="312,235 375,210 355,265 322,255" fill="#475569" stroke="#94a3b8" strokeWidth="0.9" />
              <polygon points="355,228 415,245 385,278 355,265" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.9" />
            </g>

            {/* ENVELOPE — held in beak with continuous glowing effect */}
            {letterState === 'held' && (
              <g className="envelope-group letter-clickable" onClick={handleLetterClick} role="button" aria-label="Open contact letter" tabIndex={0}>
                {/* Generous touch target */}
                <rect x="140" y="140" width="150" height="150" fill="transparent" />
                <polygon points="212,158 268,205 218,262 162,214" fill="url(#paperGrad)" stroke="#e2e8f0" strokeWidth="1.5" />
                <polygon points="162,214 212,158 215,210" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <polygon points="212,158 268,205 215,210" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                <polygon points="162,214 218,262 215,210" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
                <polygon points="268,205 218,262 215,210" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                <circle cx="215" cy="210" r="10" fill="#be123c" stroke="#fda4af" strokeWidth="1.2" />
                <circle cx="215" cy="210" r="6.5" fill="#e11d48" stroke="#fecdd3" strokeWidth="0.6" strokeDasharray="2 2" />
              </g>
            )}
          </svg>
        </div>

        {/* Dropping letter animation */}
        {(letterState === 'dropping' || letterState === 'opening') && (
          <div
            className={`absolute z-20 top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${letterState === 'dropping' ? 'dropping-letter-anim' : 'opening-letter-anim'
              }`}
          >
            <svg viewBox="0 0 120 110" width="120" height="110" fill="none">
              <defs>
                <linearGradient id="dropPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
              </defs>
              <polygon points="60,5 115,52 60,105 5,52" fill="url(#dropPaperGrad)" stroke="#e2e8f0" strokeWidth="1.5" />
              <polygon points="5,52 60,5 60,52" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
              <polygon points="60,5 115,52 60,52" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <polygon points="5,52 60,105 60,52" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
              <polygon points="115,52 60,105 60,52" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
              <circle cx="60" cy="52" r="10" fill="#be123c" stroke="#fda4af" strokeWidth="1.2" />
              <circle cx="60" cy="52" r="6.5" fill="#e11d48" stroke="#fecdd3" strokeWidth="0.6" strokeDasharray="2 2" />
            </svg>
          </div>
        )}

        {/* Contact hint text */}
        {letterState === 'held' && (
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs md:text-sm text-white/50 tracking-[3px] uppercase animate-pulse select-none">
            Click the letter to get in touch
          </p>
        )}
      </div>

      {/* Contact Modal Overlay */}
      {letterState === 'open' && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-[min(92vw,480px)] bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-sky-400/30 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(56,189,248,0.15)] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Envelope Header */}
            <div className="w-full">
              <svg viewBox="0 0 400 80" width="100%" height="80" preserveAspectRatio="none">
                <polygon points="0,80 200,0 400,80" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              </svg>
            </div>

            <div className="px-6 md:px-8 pb-8 pt-2 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-2 tracking-wide">
                Get In Touch
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                Let&apos;s connect and build something amazing!
              </p>

              {/* Contact Links */}
              <div className="flex flex-col gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-sky-400 hover:translate-x-1 transition-all duration-300 group"
                  >
                    <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="flex-1 text-left font-medium text-base">
                      {link.label}
                    </span>
                    <span className="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all text-lg">
                      →
                    </span>
                  </a>
                ))}
              </div>

              {/* Close Button */}
              <button
                type="button"
                className="absolute top-20 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ContactPage
