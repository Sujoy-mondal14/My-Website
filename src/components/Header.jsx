import { NavLink } from 'react-router'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto">
      <nav className="flex items-center gap-6 md:gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase transition-colors duration-300 py-1 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'
            } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-white after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
            }`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/tech-stack"
          className={({ isActive }) =>
            `relative font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase transition-colors duration-300 py-1 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'
            } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-white after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
            }`
          }
        >
          TECH STACK
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `relative font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase transition-colors duration-300 py-1 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'
            } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-white after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
            }`
          }
        >
          PROJECTS
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `relative font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase transition-colors duration-300 py-1 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'
            } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-white after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
            }`
          }
        >
          CONTACT
        </NavLink>
        <NavLink
          to="/coming-soon"
          className={({ isActive }) =>
            `relative font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase transition-colors duration-300 py-1 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'
            } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-white after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
            }`
          }
        >
          COMING SOON
        </NavLink>
      </nav>

      {/* Brand logo & vertical label */}
      <div className="hidden sm:flex fixed right-8 top-8 z-50 flex-col items-center gap-5 group cursor-pointer">
        <svg
          className="w-7 h-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-transform duration-700 group-hover:rotate-90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Studio logo"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
          <line x1="9.69" y1="8" x2="21.17" y2="8" />
          <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
          <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
          <line x1="14.31" y1="16" x2="2.83" y2="16" />
          <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
        </svg>
        <span className="[writing-mode:vertical-rl] font-sans text-[11px] font-semibold tracking-[5px] uppercase text-white/80 group-hover:text-white transition-colors">
          PLAY IT RIGHT
        </span>
      </div>
    </header>
  )
}

export default Header
