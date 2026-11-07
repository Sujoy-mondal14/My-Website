import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchProjects } from '../services/projectService.js'

const SORT_OPTIONS = [
  { key: 'recent', label: 'Recent' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'famous', label: 'Famous' },
]

function FolderCard({ project }) {
  return (
    <a
      href={project.html_url || `https://github.com/Sujoy-mondal14/${project.name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center gap-3 transition-transform duration-300 hover:-translate-y-1 group cursor-pointer block"
    >
      {/* Folder Icon — clean, vibrant blue folder with smooth geometry */}
      <div className="relative w-full aspect-[1.3/1] transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Back folder tab */}
        <div className="absolute top-0 left-2 w-[42%] h-[24%] bg-[#60a5fa] rounded-t-xl z-10 shadow-sm"></div>
        {/* Main folder body */}
        <div className="absolute top-[18%] left-0 right-0 bottom-0 bg-[#38bdf8] rounded-2xl shadow-md overflow-hidden">
          {/* Subtle top gloss lip */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-white/20 rounded-t-2xl"></div>
          {/* Subtle bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-black/10"></div>
        </div>
      </div>

      {/* Title capsule pill */}
      <div className="inline-flex items-center justify-center bg-white rounded-full px-5 py-1.5 max-w-[95%] shadow-md">
        <span className="font-sans text-sm md:text-base font-bold text-[#1e1b4b] truncate">
          {project.name}
        </span>
      </div>

      {/* Description box */}
      {project.description && (
        <div className="inline-flex items-center justify-center rounded-lg px-4 py-1.5 bg-black/20 max-w-[95%] text-xs text-white/90 text-center leading-relaxed backdrop-blur-xs">
          <span>{project.description}</span>
        </div>
      )}
    </a>
  )
}

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const [total, setTotal] = useState(0)
  const loaderRef = useRef(null)

  const loadProjects = useCallback(async (pageNum, sort, append = false) => {
    setLoading(true)
    try {
      const data = await fetchProjects({ page: pageNum, sortBy: sort })
      setProjects((prev) => append ? [...prev, ...data.projects] : data.projects)
      setHasMore(data.hasMore)
      setTotal(data.total)
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSortChange = (newSort) => {
    if (newSort === sortBy) return
    setSortBy(newSort)
    setPage(1)
    loadProjects(1, newSort, false)
  }

  // Initial load
  useEffect(() => {
    loadProjects(1, sortBy, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1
          setPage(nextPage)
          loadProjects(nextPage, sortBy, true)
        }
      },
      { threshold: 0.1 }
    )

    const el = loaderRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasMore, loading, page, sortBy, loadProjects])

  return (
    <section className="min-h-screen bg-[#17689d] pt-20 relative">
      {/* Top Header Bar */}
      <div className="flex flex-wrap justify-between items-center px-6 md:px-12 py-3.5 bg-[#fffff6] border-b border-slate-200 gap-2">
        <div className="font-sans font-bold text-sm md:text-base tracking-wider text-[#1e1b4b]">
          <span>𝓢𝓾𝓳𝓸𝔂</span>
        </div>
        <div className="font-sans font-semibold text-sm md:text-base tracking-wide text-[#1e1b4b]">
          <span>I'm a human being</span>
        </div>
        <div className="font-sans font-bold text-sm md:text-base text-[#1e1b4b]">
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Floating Toolbar */}
      {/* <div className="flex justify-center bg-[#fffff6] pt-2 pb-4">
        <div className="inline-flex items-center gap-4 bg-white px-6 py-2 rounded-full border border-slate-200 shadow-sm text-sm font-semibold text-[#1e1b4b]">
          <span className="font-bold">Group</span>
          <span>🔒</span>
          <span>⧉</span>
          <span>🗑</span>
          <span>⋯</span>
        </div>
      </div> */}

      {/* Services Banner Tab */}
      <div className="flex justify-center bg-[#fffff6]">
        <div className="bg-[#17689d] rounded-t-3xl px-8 md:px-14 pt-6 pb-4 inline-flex items-center gap-4 shadow-sm">
          <div className="text-white font-bold text-lg md:text-xl tracking-wider">
            <span>MY SERVICES</span>
          </div>
          <div className="text-white text-lg md:text-xl">
            <span>⟶</span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 md:px-12 py-6 gap-4">
        <div className="flex gap-3">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 border ${sortBy === opt.key
                ? 'bg-white text-[#17689d] border-white shadow-md'
                : 'text-white border-white/30 bg-white/10 hover:bg-white/20'
                }`}
              onClick={() => handleSortChange(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <span className="text-white/70 text-sm font-medium">{total} projects</span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12 pb-12">
        {projects.map((project, index) => (
          <FolderCard key={`${sortBy}-${project.id}-${index}`} project={project} />
        ))}
      </div>

      {/* Loading / Infinite Scroll Trigger */}
      <div ref={loaderRef} className="p-10 flex justify-center">
        {loading && (
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/60 animate-ping"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/60 animate-ping delay-150"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/60 animate-ping delay-300"></span>
          </div>
        )}
        {!hasMore && projects.length > 0 && (
          <p className="text-white/60 text-sm font-medium">All projects loaded</p>
        )}
      </div>
    </section>
  )
}

export default ProjectsPage
