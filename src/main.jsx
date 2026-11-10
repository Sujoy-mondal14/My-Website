import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import ComingSoonPage from './pages/ComingSoonPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import TechStackPage from './pages/TechStackPage.jsx'
import AgencyAiApp from './../src/pages/AgencyAi/src/AgencyAiApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="tech-stack" element={<TechStackPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="coming-soon" element={<ComingSoonPage />} />
        </Route>
        <Route path='/agency-ai/' element={<AgencyAiApp/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
