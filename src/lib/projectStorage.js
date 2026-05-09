import { projects as defaultProjects } from '@/lib/constants'

const PROJECTS_STORAGE_KEY = 'portfolio-projects-v1'
const ADMIN_STORAGE_KEY = 'portfolio-admin-access'
const ADMIN_QUERY_KEY = 'admin'
const ADMIN_QUERY_VALUE = 'portfolio-panel'

function ensureArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback
}

function ensureObject(value, fallback = {}) {
  return value && typeof value === 'object' ? value : fallback
}

export function normalizeProject(project, index = 0) {
  const safeProject = ensureObject(project)
  const quickStats = ensureArray(safeProject.quickStats, [])
  const problem = ensureObject(safeProject.problem)
  const process = ensureObject(safeProject.process)
  const solution = ensureObject(safeProject.solution)
  const results = ensureObject(safeProject.results)
  const stack = ensureObject(safeProject.stack)

  return {
    id: safeProject.id || `proje-${index + 1}`,
    title: safeProject.title || 'Yeni Proje',
    shortTitle: safeProject.shortTitle || safeProject.title || 'Proje',
    category: safeProject.category || 'Web App',
    year: safeProject.year || '2026',
    role: safeProject.role || '',
    source: safeProject.source || '',
    origin: safeProject.origin || '',
    previewVariant: safeProject.previewVariant || 'gemini',
    coverImage: safeProject.coverImage || '',
    overview: safeProject.overview || '',
    summary: safeProject.summary || '',
    liveUrl: safeProject.liveUrl || '',
    githubUrl: safeProject.githubUrl || '',
    quickStats:
      quickStats.length > 0
        ? quickStats.map((item, statIndex) => ({
            label: item?.label || `Stat ${statIndex + 1}`,
            value: item?.value || '',
          }))
        : [
            { label: 'Sure', value: '' },
            { label: 'Sonuc', value: '' },
            { label: 'Ana teknoloji', value: '' },
            { label: 'Kaynak', value: '' },
          ],
    problem: {
      tag: problem.tag || '01',
      title: problem.title || '',
      narrative: problem.narrative || '',
      points: ensureArray(problem.points, ['', '', '']),
    },
    process: {
      tag: process.tag || '02',
      title: process.title || 'The Process',
      stages: ensureArray(process.stages, ['', '', '', '', '']),
    },
    tools: ensureArray(safeProject.tools, []),
    solution: {
      tag: solution.tag || '03',
      title: solution.title || '',
      points: ensureArray(solution.points, []),
    },
    results: {
      tag: results.tag || '04',
      title: results.title || '',
      points: ensureArray(results.points, []),
    },
    learnings: ensureArray(safeProject.learnings, []),
    stack: {
      design: ensureArray(stack.design, []),
      development: ensureArray(stack.development, []),
    },
  }
}

export function createEmptyProject() {
  return normalizeProject({
    id: `yeni-proje-${Date.now()}`,
    title: 'Yeni Proje',
    shortTitle: 'Yeni',
    category: 'Mobile App',
    year: '2026',
    role: '',
    source: '',
    origin: '',
    previewVariant: 'gemini',
    coverImage: '',
    overview: '',
    summary: '',
    liveUrl: '',
    githubUrl: '',
    quickStats: [
      { label: 'Sure', value: '' },
      { label: 'Sonuc', value: '' },
      { label: 'Ana teknoloji', value: '' },
      { label: 'Kaynak', value: '' },
    ],
    problem: {
      tag: '01',
      title: '',
      narrative: '',
      points: ['', '', ''],
    },
    process: {
      tag: '02',
      title: 'The Process',
      stages: ['', '', '', '', ''],
    },
    tools: [],
    solution: {
      tag: '03',
      title: '',
      points: [],
    },
    results: {
      tag: '04',
      title: '',
      points: [],
    },
    learnings: [],
    stack: {
      design: [],
      development: [],
    },
  })
}

export function loadProjects() {
  if (typeof window === 'undefined') {
    return defaultProjects.map(normalizeProject)
  }

  try {
    const storedProjects = window.localStorage.getItem(PROJECTS_STORAGE_KEY)
    if (!storedProjects) {
      return defaultProjects.map(normalizeProject)
    }

    const parsedProjects = JSON.parse(storedProjects)
    if (!Array.isArray(parsedProjects) || parsedProjects.length === 0) {
      return defaultProjects.map(normalizeProject)
    }

    return parsedProjects.map(normalizeProject)
  } catch {
    return defaultProjects.map(normalizeProject)
  }
}

export function saveProjects(projects) {
  if (typeof window === 'undefined') {
    return { ok: false, error: 'Tarayici ortami bulunamadi.' }
  }

  try {
    const normalizedProjects = projects.map(normalizeProject)
    window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(normalizedProjects))
    window.dispatchEvent(new Event('portfolio-projects-updated'))
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Projeler kaydedilemedi. Gorsel boyutu fazla buyuk olabilir.',
    }
  }
}

export function resetProjects() {
  saveProjects(defaultProjects.map(normalizeProject))
}

export function hasAdminAccess() {
  if (typeof window === 'undefined') {
    return false
  }

  const hostname = window.location.hostname
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return true
  }

  return window.localStorage.getItem(ADMIN_STORAGE_KEY) === 'true'
}

export function syncAdminAccessFromSearch(search) {
  if (typeof window === 'undefined') {
    return false
  }

  const params = new URLSearchParams(search)
  if (params.get(ADMIN_QUERY_KEY) === ADMIN_QUERY_VALUE) {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, 'true')
  }

  return hasAdminAccess()
}
