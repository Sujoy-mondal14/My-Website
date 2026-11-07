import { useState } from 'react'
import { Link } from 'react-router'

function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(ellipse_at_50%_40%,#131c2e_0%,#080b12_50%,#030508_100%)] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden select-none">
      {/* Background ambient light effects */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none -top-20 -left-20"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none -bottom-20 -right-20"></div>

      <div className="max-w-2xl w-full text-center relative z-10 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold tracking-[3px] uppercase mb-8 shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-pulse">
          <span>⚡ UPCOMING SERVICES</span>
          <span className="text-white/40">•</span>
          <span>LAUNCHING SOON</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none mb-6">
          COMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">SOON</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-slate-300 text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
          Exclusive client services, custom engineering solutions, and managed AI workflow pipelines are currently in development.
        </p>

        {/* Service Preview Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-10">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col items-center text-center">
            <span className="text-2xl mb-2">⚡</span>
            <span className="text-white font-bold text-sm">Full-Stack Dev</span>
            <span className="text-slate-400 text-xs mt-1">Next.js, Node, Cloud</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col items-center text-center">
            <span className="text-2xl mb-2">🤖</span>
            <span className="text-white font-bold text-sm">AI Automation</span>
            <span className="text-slate-400 text-xs mt-1">Autonomous Agent Workflows</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col items-center text-center">
            <span className="text-2xl mb-2">🎨</span>
            <span className="text-white font-bold text-sm">Interactive UI/UX</span>
            <span className="text-slate-400 text-xs mt-1">Motion, 3D & Micro-apps</span>
          </div>
        </div>

        {/* Early Access Notification Form */}
        {subscribed ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold mb-8">
            ✓ You&apos;re on the priority waitlist! We will notify you at launch.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for early access"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-200 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/20"
            >
              Notify Me
            </button>
          </form>
        )}

        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-mono tracking-[2px] uppercase mt-2 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Return to Homepage</span>
        </Link>
      </div>
    </section>
  )
}

export default ComingSoonPage

