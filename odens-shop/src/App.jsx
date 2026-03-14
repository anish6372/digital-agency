import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/components/Navbar/Navbar'
import Home from '../src/components/landingpage/OdenShop'
import About from '../src/components/Aboutpage/About'
import Services from '../src/components/ServicePage/Service'
import Work from '../src/components/Workpage/Work'
import Contact from '../src/components/contactpage/Contact'

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work"     element={<Work />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
    </div>
  )
}
