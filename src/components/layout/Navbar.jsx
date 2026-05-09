import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiGlobe } from 'react-icons/fi'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef(null)

  const navItems = useMemo(
    () => [
      { label: t('nav.about'), href: '#about' },
      { label: t('nav.skills'), href: '#skills' },
      { label: t('nav.works'), href: '#works' },
    ],
    [t],
  )

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!languageMenuRef.current) return
      if (!languageMenuRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const currentLanguage = (i18n.language || 'tr').toUpperCase()

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 pt-4 sm:px-6 sm:pt-5 md:flex-row md:items-center md:justify-between md:px-8 md:pt-7 lg:px-10">
        <nav className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-[12px] font-semibold text-text-primary sm:gap-x-8 md:text-[13px]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-opacity duration-300 hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div ref={languageMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
              className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/18 bg-white/8 px-4 leading-none text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition-transform duration-300 hover:scale-[1.02] sm:h-11 sm:px-5 sm:text-[12px]"
              aria-label={t('nav.language')}
            >
              <FiGlobe className="h-4 w-4" aria-hidden="true" />
              <span>{currentLanguage}</span>
              <FiChevronDown className="h-4 w-4 text-white/65" aria-hidden="true" />
            </button>

            {isLanguageMenuOpen ? (
              <div className="absolute right-0 mt-2 w-[168px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] p-1 shadow-[0_18px_46px_rgba(0,0,0,0.35)]">
                {[
                  { code: 'tr', label: 'Türkçe' },
                  { code: 'en', label: 'English' },
                  { code: 'de', label: 'Deutsch' },
                ].map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => {
                      i18n.changeLanguage(language.code)
                      setIsLanguageMenuOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold ${
                      i18n.language === language.code
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/6 hover:text-white'
                    }`}
                  >
                    <span>{language.label}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                      {language.code}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <a
            href="/cv.pdf"
            download="Kaan-Demir-CV.pdf"
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border border-white/18 bg-white/8 px-4 leading-none text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition-transform duration-300 hover:scale-[1.02] sm:h-11 sm:px-5 sm:text-[12px]"
          >
            {t('nav.downloadCv')}
          </a>
          <a
            href="#contact"
            className="inline-flex h-10 min-w-[112px] items-center justify-center whitespace-nowrap rounded-full bg-white px-4 leading-none text-[11px] font-extrabold uppercase tracking-[0.06em] text-black transition-transform duration-300 hover:scale-[1.02] sm:h-11 sm:min-w-[124px] sm:px-5 sm:text-[12px]"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </header>
  )
}
