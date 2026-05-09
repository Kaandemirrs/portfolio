function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function pickTranslation(value, language, fallbackLanguage = 'tr') {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (Array.isArray(value)) return value.map((item) => pickTranslation(item, language, fallbackLanguage))

  if (isPlainObject(value)) {
    const byLang = value?.[language]
    if (typeof byLang === 'string') return byLang

    const byFallback = value?.[fallbackLanguage]
    if (typeof byFallback === 'string') return byFallback

    const firstString = Object.values(value).find((entry) => typeof entry === 'string')
    if (typeof firstString === 'string') return firstString
  }

  return ''
}

export function localizeProject(project, language) {
  const localized = {
    ...project,
    title: pickTranslation(project.title, language),
    shortTitle: pickTranslation(project.shortTitle, language),
    category: pickTranslation(project.category, language),
    role: pickTranslation(project.role, language),
    origin: pickTranslation(project.origin, language),
    overview: pickTranslation(project.overview, language),
    summary: pickTranslation(project.summary, language),
    quickStats: Array.isArray(project.quickStats)
      ? project.quickStats.map((stat) => ({
          ...stat,
          label: pickTranslation(stat.label, language),
          value: pickTranslation(stat.value, language),
        }))
      : project.quickStats,
    problem: project.problem
      ? {
          ...project.problem,
          title: pickTranslation(project.problem.title, language),
          narrative: pickTranslation(project.problem.narrative, language),
          points: Array.isArray(project.problem.points)
            ? project.problem.points.map((point) => pickTranslation(point, language))
            : project.problem.points,
        }
      : project.problem,
    process: project.process
      ? {
          ...project.process,
          title: pickTranslation(project.process.title, language),
          stages: Array.isArray(project.process.stages)
            ? project.process.stages.map((stage) => pickTranslation(stage, language))
            : project.process.stages,
        }
      : project.process,
    tools: Array.isArray(project.tools)
      ? project.tools.map((tool) => pickTranslation(tool, language))
      : project.tools,
  }

  if (localized.stack) {
    localized.stack = {
      ...localized.stack,
      design: Array.isArray(localized.stack.design)
        ? localized.stack.design.map((item) => pickTranslation(item, language))
        : localized.stack.design,
      development: Array.isArray(localized.stack.development)
        ? localized.stack.development.map((item) => pickTranslation(item, language))
        : localized.stack.development,
    }
  }

  return localized
}
