import { FiArrowUpRight } from 'react-icons/fi'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { renderProjectPreview } from '@/components/work/ProjectPreview'
import useProjects from '@/hooks/useProjects'
import { useTranslation } from 'react-i18next'

export default function Works() {
  const { t } = useTranslation()
  const projects = useProjects()
  const visibleProjects = useMemo(() => {
    const filteredProjects = projects.filter((project) => {
      const projectId = (project.id || '').toLowerCase()
      const normalizedTitle = (project.title || '').trim().toLowerCase()
      const normalizedShortTitle = (project.shortTitle || '').trim().toLowerCase()

      if (projectId === 'winzee-web-chat-application' || normalizedTitle === 'winzee web chat application') {
        return false
      }

      if (projectId === 'gemini-clone' || normalizedTitle === 'gemini clone' || normalizedShortTitle === 'gemini') {
        return false
      }

      if (normalizedTitle === 'yeni proje' || normalizedShortTitle === 'yeni') {
        return false
      }

      return true
    })

    if (filteredProjects.length <= 1) {
      return filteredProjects
    }

    const getProjectMatch = (project) => {
      const projectId = (project.id || '').trim().toLowerCase()
      const normalizedTitle = (project.title || '').trim().toLowerCase()
      const normalizedShortTitle = (project.shortTitle || '').trim().toLowerCase()

      return `${projectId} ${normalizedTitle} ${normalizedShortTitle}`
    }

    const pinnedTopOrder = ['travelcini', 'evimai', 'vintage ai', 'loyalty']
    const pinnedBottomOrder = ['yourhil', 'beykenti']

    const remainingProjects = [...filteredProjects]
    const topProjects = []
    const bottomProjects = []

    pinnedTopOrder.forEach((keyword) => {
      const projectIndex = remainingProjects.findIndex((project) => getProjectMatch(project).includes(keyword))

      if (projectIndex !== -1) {
        topProjects.push(remainingProjects[projectIndex])
        remainingProjects.splice(projectIndex, 1)
      }
    })

    pinnedBottomOrder.forEach((keyword) => {
      const projectIndex = remainingProjects.findIndex((project) => getProjectMatch(project).includes(keyword))

      if (projectIndex !== -1) {
        bottomProjects.push(remainingProjects[projectIndex])
        remainingProjects.splice(projectIndex, 1)
      }
    })

    return [...topProjects, ...remainingProjects, ...bottomProjects]
  }, [projects])

  return (
    <section id="works" className="bg-[#ececec] px-4 py-12 text-black sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <h2 className="font-gilroy text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-[4.75rem]">
            {t('works.title')}
          </h2>

          <p className="max-w-[360px] whitespace-pre-line text-[13px] leading-7 text-black/60 sm:text-[15px] lg:justify-self-end">
            {t('works.description')}
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-12 lg:gap-x-8 lg:gap-y-10">
          {visibleProjects.map((project) => (
            <Link key={project.id} to={`/works/${project.id}`} className="group block">
              <article>
                <div className="aspect-[1.36/1] overflow-hidden rounded-[28px] bg-neutral-200 shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:-translate-y-1">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    renderProjectPreview(project.previewVariant)
                  )}
                </div>

                <div className="mt-4 flex items-center gap-3 text-black">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/25 text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <FiArrowUpRight />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight sm:text-[2rem]">{project.title}</h3>
                    <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.12em] text-black/45 sm:text-[13px]">
                      {project.category} / {project.year}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-5 py-3 text-[13px] font-semibold text-black shadow-[0_8px_20px_rgba(0,0,0,0.05)] backdrop-blur"
          >
            {t('works.exploreMore')}
          </a>
        </div>
      </div>
    </section>
  )
}
