import { useEffect, useState } from 'react'
import { loadProjects, saveProjects } from '@/lib/projectStorage'
import { useTranslation } from 'react-i18next'
import { localizeProject } from '@/lib/localize'

export default function useProjects() {
  const { i18n } = useTranslation()
  const [projects, setProjects] = useState(() => loadProjects())

  useEffect(() => {
    const syncProjects = () => {
      setProjects(loadProjects())
    }

    window.addEventListener('storage', syncProjects)
    window.addEventListener('portfolio-projects-updated', syncProjects)

    return () => {
      window.removeEventListener('storage', syncProjects)
      window.removeEventListener('portfolio-projects-updated', syncProjects)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storageKey = 'portfolio-projects-v1'
    const existing = window.localStorage.getItem(storageKey)
    if (existing) return

    const controller = new AbortController()

    fetch('/projects.json', { signal: controller.signal, cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        const nextProjects = Array.isArray(json) ? json : json?.projects
        if (!Array.isArray(nextProjects) || nextProjects.length === 0) return

        if (!controller.signal.aborted) {
          saveProjects(nextProjects)
          setProjects(loadProjects())
        }
      })
      .catch(() => {})

    return () => controller.abort()
  }, [])

  return projects.map((project) => localizeProject(project, i18n.language || 'tr'))
}
