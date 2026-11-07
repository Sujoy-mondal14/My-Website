import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { fetchProfile } from '../services/profileService'

function HomePage() {
  const heroRef = useRef(null)
  const [profile, setProfile] = useState({
    name: 'Sujoy Mondal',
    github_avatar_url: 'https://github.com/Sujoy-mondal14.png',
    linkedin_avatar_url: '/Linkdln_profilePhoto.jpg',
    socials: {
      github: 'https://github.com/Sujoy-mondal14',
      linkedin: 'https://linkedin.com/in/sujoy-mondal',
    },
  })
  const [githubImgLoaded, setGithubImgLoaded] = useState(false)
  const [linkedinImgLoaded, setLinkedinImgLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true
    fetchProfile().then((data) => {
      if (isMounted && data) {
        setProfile(data)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8')
            entry.target.classList.add('opacity-100', 'translate-y-0')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = heroRef.current?.querySelectorAll('.animate-item')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="min-h-screen bg-black relative overflow-hidden pt-24 pb-8 flex flex-col justify-between" ref={heroRef}>
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] min-h-[calc(100vh-160px)] px-6 md:px-12 gap-8 lg:gap-4 items-center">
        {/* Left Side — Title & CTA */}
        <div className="flex flex-col justify-center lg:pr-6 py-6 lg:py-0">
          <h1 className="animate-item opacity-0 translate-y-8 transition-all duration-700 font-sans font-black leading-[0.85] tracking-[-3px] m-0 select-none">
            <span className="block text-[clamp(74px,12vw,180px)] text-white uppercase">𝓢𝓾𝓳𝓸𝔂</span>
            <span className="block text-[clamp(74px,12vw,180px)] text-white uppercase">𝓜𝓸𝓷𝓭𝓪𝓵</span>
          </h1>

          <Link
            to="/tech-stack"
            className="animate-item opacity-0 translate-y-8 transition-all duration-700 delay-300 flex items-center gap-5 mt-10 md:mt-14 group w-fit cursor-pointer"
          >
            <span className="font-sans text-xs md:text-sm font-bold tracking-[3px] uppercase text-white whitespace-nowrap group-hover:text-sky-400 transition-colors">
              GET STARTED here
            </span>
            <span className="w-16 md:w-20 h-[1.5px] bg-white shrink-0 group-hover:w-24 group-hover:bg-sky-400 transition-all duration-300"></span>
            <span className="font-sans text-xs md:text-sm font-medium tracking-[2px] uppercase text-white/75 leading-relaxed whitespace-nowrap group-hover:text-white transition-colors">
              FASTEN YOUR<br />SEAT BELT
            </span>
          </Link>
        </div>

        {/* Right Side — Editorial Portraits (GitHub & LinkedIn side by side) */}
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] relative gap-4 sm:gap-3 items-end">
          {/* Main Container — GitHub Profile Photo */}
          <div className="animate-item opacity-0 translate-y-8 transition-all duration-700 delay-200 relative overflow-hidden min-h-[380px] sm:min-h-[520px] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#533483] shadow-2xl border border-white/10 group rounded-none">
            {/* Background Image */}
            <img
              src={profile.github_avatar_url}
              alt="Sujoy Mondal GitHub Avatar"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                githubImgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setGithubImgLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = 'https://github.com/Sujoy-mondal14.png'
                setGithubImgLoaded(true)
              }}
            />

            {/* Gradient Overlays for Cinematic Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,rgba(147,51,234,0.15)_0%,transparent_70%)] pointer-events-none"></div>

            {/* Platform Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest uppercase text-white/90">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GITHUB
              </span>
            </div>

            {/* Name Tag Overlay */}
            <span className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 font-sans text-base sm:text-lg tracking-[6px] uppercase text-white whitespace-nowrap drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] z-10 select-none">
              SUJOY <strong className="font-extrabold">MONDAL</strong>
            </span>

            {/* Action arrow button linking to next page */}
            <Link
              to="/tech-stack"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white text-black flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-200 hover:scale-110 shadow-2xl z-20 group/btn"
              aria-label="Explore Tech Stack"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8l4 4-4 4M8 12h8" />
              </svg>
            </Link>
          </div>

          {/* Secondary Container — LinkedIn Profile Photo */}
          <div className="animate-item opacity-0 translate-y-8 transition-all duration-700 delay-500 relative overflow-hidden h-[240px] sm:h-[68%] min-h-[220px] bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#533483] border border-white/10 group rounded-none">
            {/* Background Image */}
            <img
              src={profile.linkedin_avatar_url || '/Linkdln_profilePhoto.jpg'}
              alt="Sujoy Mondal LinkedIn Avatar"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                linkedinImgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ objectPosition: '88% 28%' }}
              onLoad={() => setLinkedinImgLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = '/Linkdln_profilePhoto.jpg'
                setLinkedinImgLoaded(true)
              }}
            />

            {/* Gradient Overlays for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none"></div>

            {/* Platform Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest uppercase text-sky-400">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LINKEDIN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="animate-item opacity-0 translate-y-8 transition-all duration-700 delay-700 px-6 md:px-12 pt-6 flex items-baseline gap-3 md:gap-4 border-t border-white/10">
        <span className="font-display italic text-[clamp(24px,4vw,48px)] text-white font-normal">
          professional
        </span>
        <span className="font-display text-[clamp(24px,4vw,48px)] font-bold tracking-[4px] uppercase text-white">
          BUILDER & EXPLORER
        </span>
      </div>
    </section>
  )
}

export default HomePage
