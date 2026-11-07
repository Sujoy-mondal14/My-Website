import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './components/Header.jsx'

function App() {
  const location = useLocation()

  // Scroll to top on every route transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-sky-500 selection:text-white relative">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default App
