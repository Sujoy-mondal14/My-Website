import {useState} from 'react';
import {Toaster} from 'react-hot-toast'
import {ContactUs, Hero,Navbar,OurWork,Services,Teams,TrustedBy, Footer} from './components/index.js'
import './agency.css'

function AgencyAiApp() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

  return (
    <div className="agency-ai-root dark:bg-black relative font-manrope">
      <Toaster />
      <Navbar  theme={theme} setTheme={setTheme}/>
      <Hero/>
      <TrustedBy/>
      <Services/>
      <OurWork />
      <Teams />
      <ContactUs/>
      <Footer theme={theme} />
    </div>
  )
}

export default AgencyAiApp
