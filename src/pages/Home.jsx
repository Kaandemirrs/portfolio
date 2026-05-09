import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import About from '@/sections/About'
import Contact from '@/sections/Contact'
import GithubActivity from '@/sections/GithubActivity'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/sections/Hero'
import Skills from '@/sections/Skills'
import Works from '@/sections/Works'
import { hasAdminAccess, syncAdminAccessFromSearch } from '@/lib/projectStorage'

export default function Home() {
  const location = useLocation()
  const [showAdminButton, setShowAdminButton] = useState(() => hasAdminAccess())

  useEffect(() => {
    setShowAdminButton(syncAdminAccessFromSearch(location.search))
  }, [location.search])

  return (
    <main className="font-gilroy">
      <Navbar />
      <Hero />
      <Skills />
      <Works />
      <About />
      <GithubActivity />
      <Contact />

      {showAdminButton ? (
        <Link
          to="/yonetim/projeler"
          className="fixed right-4 bottom-4 z-40 inline-flex items-center rounded-full border border-white/14 bg-black/70 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.02] sm:right-6 sm:bottom-6"
        >
          Proje Paneli
        </Link>
      ) : null}
    </main>
  )
}
