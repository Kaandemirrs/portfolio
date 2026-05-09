import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '@/components/ui/ScrollToTop'
import AdminProjects from '@/pages/AdminProjects'
import CaseStudy from '@/pages/CaseStudy'
import Home from '@/pages/Home'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background" style={{ backgroundColor: '#0A0A0A' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/yonetim/projeler" element={<AdminProjects />} />
          <Route path="/works/:id" element={<CaseStudy />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
