import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/landingpage/PulseLanding'
import About from './components/Aboutpage/About'
import Services from './components/ServicePage/Service'
import Work from './components/Workpage/Work'
import Contact from './components/contactpage/Contact'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
