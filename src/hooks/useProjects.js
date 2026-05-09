import { useEffect, useState } from 'react'
import { loadProjects } from '@/lib/projectStorage'
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

  return projects.map((project) => localizeProject(project, i18n.language || 'tr'))
}
