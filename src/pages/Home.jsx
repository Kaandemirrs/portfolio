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
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(true)
  const [barFull, setBarFull] = useState(false)

  useEffect(() => {
    setShowAdminButton(syncAdminAccessFromSearch(location.search))
  }, [location.search])

  useEffect(() => {
    const fallback = setTimeout(() => {
      setSplineLoaded(true)
    }, 5000)
    return () => clearTimeout(fallback)
  }, [])

  useEffect(() => {
    if (!splineLoaded) return
    setBarFull(true)
    const hideTimer = setTimeout(() => setLoaderVisible(false), 700)
    return () => clearTimeout(hideTimer)
  }, [splineLoaded])

  return (
    <main className="font-gilroy">
      {loaderVisible && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] transition-opacity duration-700 ${
            barFull ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <p className="font-gilroy text-[11px] font-semibold uppercase tracking-[0.55em] text-white/40">
            Portfolio
          </p>
          <p className="mt-3 font-gilroy text-3xl font-extrabold uppercase tracking-[0.18em] text-white/90 sm:text-4xl">
            Kaan Demir
          </p>
          <div className="mt-8 h-px w-52 overflow-hidden bg-white/10">
            <div
              className={`h-full bg-white/70 transition-all duration-500 ${
                barFull ? 'w-full' : 'animate-load-bar'
              }`}
            />
          </div>
        </div>
      )}
      <Navbar />
      <Hero onSplineLoad={() => setSplineLoaded(true)} />
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
