import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/landingpage/PulseLanding'
import About from './components/Aboutpage/About'
import Services from './components/ServicePage/Service'
import Work from './components/Workpage/Work'
import Contact from './components/contactpage/Contact'

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}
