import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiChevronDown, FiGithub, FiGlobe } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { renderProjectPreview } from '@/components/work/ProjectPreview'
import useProjects from '@/hooks/useProjects'
import { useTranslation } from 'react-i18next'

function renderSectionLabel(step, title) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/34">
        {step}
      </span>
      <span className="h-px flex-1 bg-white/8" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/46">
        {title}
      </span>
    </div>
  )
}

function renderMetaRow(items) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-y-2 text-[12px] text-white/52">
      {items.map((item, index) => (
        <div key={item.label} className="inline-flex items-center">
          <span className="font-semibold text-white/38">{item.label}:</span>
          <span className="ml-2 text-white/64">{item.value}</span>
          {index < items.length - 1 ? (
            <span className="mx-4 hidden h-4 w-px bg-white/10 sm:inline-block" aria-hidden="true" />
          ) : null}
        </div>
      ))}
    </div>
  )
}

function getStatAccentClass(label) {
  const key = (label ?? '').toLowerCase()

  if (key.includes('outcome') || key.includes('sonuc') || key.includes('sonuç') || key.includes('ergebnis')) {
    return 'text-[#10B981]'
  }

  if (key.includes('core') || key.includes('ana') || key.includes('kerntechnologie') || key.includes('kern')) {
    return 'text-[#8B5CF6]'
  }

  return 'text-white'
}

function getStatTranslationKey(label) {
  const key = (label ?? '').toLowerCase()

  if (key.includes('duration') || key.includes('sure') || key.includes('süre') || key.includes('dauer')) {
    return 'duration'
  }

  if (key.includes('outcome') || key.includes('sonuc') || key.includes('sonuç') || key.includes('ergebnis')) {
    return 'outcome'
  }

  if (key.includes('core') || key.includes('ana') || key.includes('kern')) {
    return 'coreTech'
  }

  if (key.includes('source') || key.includes('kaynak') || key.includes('quelle')) {
    return 'source'
  }

  return null
}

function matchProject(project, keyword) {
  const projectId = (project?.id || '').toLowerCase()
  const title = (project?.title || '').toLowerCase()
  const shortTitle = (project?.shortTitle || '').toLowerCase()
  return `${projectId} ${title} ${shortTitle}`.includes(keyword)
}

export default function CaseStudy() {
  const { t, i18n } = useTranslation()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef(null)
  const { id } = useParams()
  const projects = useProjects()
  const project = projects.find((entry) => entry.id === id)

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

  if (!project) {
    return (
      <main className="min-h-screen bg-[#06070a] px-4 py-10 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <Link
            to="/#works"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/76"
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('caseStudy.backToWorks')}
          </Link>

          <div className="mt-8 rounded-[28px] border border-white/8 bg-white/[0.03] p-8">
            <h1 className="text-3xl font-extrabold text-white">{t('caseStudy.notFound.title')}</h1>
            <p className="mt-3 max-w-[540px] text-white/56">
              {t('caseStudy.notFound.description')}
            </p>
          </div>
        </div>
      </main>
    )
  }

  const clientQuote = project.problem.points?.[2]
  const processStages = project.process.stages.map((stage) => {
    const [name] = stage.split(': ')
    return { name }
  })

  const heroLinks = (() => {
    if (matchProject(project, 'evimai')) return []
    if (matchProject(project, 'yourhil') || matchProject(project, 'your hill')) return []

    if (matchProject(project, 'travelcini')) {
      const webUrl = project.githubUrl || ''
      const mobileUrl = project.liveUrl || ''

      return [
        mobileUrl
          ? { href: mobileUrl, label: t('caseStudy.links.mobileApp'), icon: 'arrow' }
          : null,
        webUrl ? { href: webUrl, label: t('caseStudy.links.website'), icon: 'arrow' } : null,
      ].filter(Boolean)
    }

    const defaultLinks = []
    if (project.liveUrl) {
      defaultLinks.push({ href: project.liveUrl, label: t('caseStudy.viewLive'), icon: 'arrow' })
    }
    if (project.githubUrl) {
      defaultLinks.push({ href: project.githubUrl, label: t('caseStudy.githubRepo'), icon: 'github' })
    }
    return defaultLinks
  })()

  const toolsLinks = (() => {
    if (matchProject(project, 'evimai')) return []
    if (matchProject(project, 'yourhil') || matchProject(project, 'your hill')) return []

    if (matchProject(project, 'travelcini')) {
      const webUrl = project.githubUrl || ''
      const mobileUrl = project.liveUrl || ''

      return [
        mobileUrl ? { href: mobileUrl, label: t('caseStudy.links.mobileApp') } : null,
        webUrl ? { href: webUrl, label: t('caseStudy.links.website') } : null,
      ].filter(Boolean)
    }

    return [
      project.githubUrl ? { href: project.githubUrl, label: t('caseStudy.sections.github') } : null,
      project.liveUrl ? { href: project.liveUrl, label: t('caseStudy.sections.live') } : null,
    ].filter(Boolean)
  })()

  return (
    <main className="min-h-screen bg-[#06070a] px-4 py-10 text-white sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/#works"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[12px] font-medium text-white/76 transition-colors duration-300 hover:border-white/18 hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('caseStudy.backToWorks')}
          </Link>

          <div className="flex items-center gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/34">
              {t('caseStudy.label')}
            </div>

            <div ref={languageMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageMenuOpen((open) => !open)}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/78 transition-colors duration-300 hover:border-white/22 hover:bg-white/[0.06] hover:text-white"
                aria-label={t('nav.language')}
              >
                <FiGlobe className="h-4 w-4" aria-hidden="true" />
                {(i18n.language || 'tr').toUpperCase()}
                <FiChevronDown className="h-4 w-4 text-white/50" aria-hidden="true" />
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
          </div>
        </div>

        <section className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:items-start">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/42">
              {project.category} / {project.year}
            </div>
            <h1 className="mt-6 text-5xl font-light leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.8rem]">
              {project.title}
            </h1>
            <p className="mt-8 max-w-[640px] text-[16px] leading-[1.8] text-white/64">
              {project.summary}
            </p>

            {renderMetaRow([
              { label: t('caseStudy.meta.category'), value: project.category },
              { label: t('caseStudy.meta.year'), value: project.year },
              { label: t('caseStudy.meta.role'), value: project.role },
              { label: t('caseStudy.meta.source'), value: project.origin },
            ])}

            {heroLinks.length > 0 ? (
              <div className="mt-10 flex flex-wrap gap-3">
                {heroLinks.map((link, index) => {
                  const isPrimary = index === 0

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold transition-transform duration-300 hover:scale-[1.02] ${
                        isPrimary
                          ? 'bg-white text-black'
                          : 'border border-white/12 text-white/84 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      {link.label}
                      {link.icon === 'github' ? (
                        <FiGithub className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      )}
                    </a>
                  )
                })}
              </div>
            ) : null}
          </div>

          <div className="lg:pt-1">
            <div className="aspect-[1.26/1] overflow-hidden rounded-2xl bg-[#05070b]">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                renderProjectPreview(project.previewVariant, true)
              )}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10 lg:gap-0">
            {project.quickStats.map((stat) => {
              const translationKey = getStatTranslationKey(stat.label)
              const displayLabel = translationKey ? t(`caseStudy.stats.${translationKey}`) : stat.label

              return (
                <div key={stat.label} className="lg:px-8">
                <div
                  className={`text-3xl font-semibold leading-none tracking-tight ${getStatAccentClass(
                    stat.label,
                  )}`}
                >
                  {stat.value}
                </div>
                <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    {displayLabel}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="relative mt-20">
          <div className="relative">
            {renderSectionLabel(project.problem.tag, t('caseStudy.sections.problem'))}
            <h2 className="mt-10 max-w-[980px] bg-gradient-to-r from-white to-white/65 bg-clip-text text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-transparent sm:text-5xl">
              {project.problem.title}
            </h2>
            <p className="mt-10 max-w-[680px] text-[16px] leading-[1.8] text-white/64">
              {project.problem.narrative}
            </p>

            <div className="mt-12 max-w-[720px]">
              {project.problem.points
                .slice(0, 2)
                .filter(Boolean)
                .map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-4 border-b border-white/10 py-4 text-[15px] leading-7 text-white/70"
                  >
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#EF4444]"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </div>
                ))}
            </div>

            {clientQuote ? (
              <div className="mt-12 max-w-[980px] rounded-[22px] bg-[#161616] p-7 sm:p-9">
                <div className="relative border-l-4 border-[#8B5CF6] pl-6">
                  <div className="absolute left-6 top-[-18px] text-5xl font-semibold leading-none text-[#8B5CF6]">
                    “
                  </div>
                  <p className="pt-6 text-[18px] italic leading-[1.8] text-white">
                    {clientQuote}
                  </p>
                  <div className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    {project.origin}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="relative mt-20">
          <div className="relative">
            {renderSectionLabel(project.process.tag, t('caseStudy.sections.process'))}
            <div className="mt-12 grid gap-4 lg:grid-cols-[repeat(5,minmax(0,1fr))] lg:items-center">
              {processStages.map((stage, index) => (
                <div key={stage.name} className="flex items-center gap-3">
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/38">
                      0{index + 1}
                    </div>
                    <div className="mt-3 text-[16px] font-semibold leading-snug text-white">
                      {stage.name}
                    </div>
                  </div>

                  {index < processStages.length - 1 ? (
                    <div className="ml-auto hidden items-center justify-end text-white/20 lg:flex">
                      <FiArrowRight className="h-5 w-5" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 pb-6">
          <div className="max-w-[980px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
              {t('caseStudy.sections.stack')}
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.02em] text-white sm:text-[2.9rem]">
              {t('caseStudy.sections.toolsAndLinks')}
            </h2>
            <div className="mt-12 grid gap-10">
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {t('caseStudy.sections.design')}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.design.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-4 py-2 text-[12px] font-medium text-white/72"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {t('caseStudy.sections.development')}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.development.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-4 py-2 text-[12px] font-medium text-white/72"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {t('caseStudy.sections.extraTools')}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 px-4 py-2 text-[12px] font-medium text-white/72"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {toolsLinks.length > 0 ? (
                <div className="grid gap-3 pt-2 sm:max-w-[520px] sm:grid-cols-2">
                  {toolsLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-full border border-white/12 px-6 py-3 text-[13px] font-semibold text-white/84 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                    >
                      <span>{link.label}</span>
                      <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
