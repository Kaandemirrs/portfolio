import {
  FiArrowUpRight,
  FiCode,
  FiGithub,
  FiGitBranch,
  FiStar,
} from 'react-icons/fi'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const username = 'Kaandemirrs'
const profileUrl = `https://github.com/${username}`
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Mon', 'Wed', 'Fri']
const cacheKey = `github-activity:${username}:v1`

function getContributionColor(level) {
  if (level === 0) return 'bg-[#161b22]'
  if (level === 1) return 'bg-[#0e4429]'
  if (level === 2) return 'bg-[#006d32]'
  if (level === 3) return 'bg-[#26a641]'
  return 'bg-[#39d353]'
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

function getLanguageColor(language) {
  const key = (language ?? '').toLowerCase()

  if (key === 'typescript') return 'bg-[#3178c6]'
  if (key === 'javascript') return 'bg-[#f1e05a]'
  if (key === 'python') return 'bg-[#3572A5]'
  if (key === 'kotlin') return 'bg-[#A97BFF]'
  if (key === 'dart') return 'bg-[#00B4AB]'
  if (key === 'swift') return 'bg-[#F05138]'
  if (key === 'java') return 'bg-[#b07219]'
  if (key === 'css') return 'bg-[#563d7c]'
  if (key === 'html') return 'bg-[#e34c26]'

  return 'bg-[#8b949e]'
}

function buildContributionWeeks(contributions) {
  if (!Array.isArray(contributions) || contributions.length === 0) return []

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date))
  const firstDate = new Date(`${sorted[0].date}T00:00:00Z`)
  const padDays = firstDate.getUTCDay()
  const padded = Array.from({ length: padDays }, () => null).concat(sorted)

  const weeks = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7))
  }

  return weeks.slice(-52)
}

function safeReadCache() {
  try {
    const raw = localStorage.getItem(cacheKey)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

function safeWriteCache(payload) {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(payload))
  } catch {
    return
  }
}

async function fetchJson(url, { signal } = {}) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json()
}

export default function GithubActivity() {
  const { t } = useTranslation()
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [contributionWeeks, setContributionWeeks] = useState([])
  const [contributionTotal, setContributionTotal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const cached = safeReadCache()

    if (cached?.profile) setProfile(cached.profile)
    if (Array.isArray(cached?.repos)) setRepos(cached.repos)
    if (Array.isArray(cached?.contributionWeeks)) setContributionWeeks(cached.contributionWeeks)
    if (typeof cached?.contributionTotal === 'number') setContributionTotal(cached.contributionTotal)

    async function load() {
      try {
        setIsLoading(true)
        setHasError(false)

        const results = await Promise.allSettled([
          fetchJson(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetchJson(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
            signal: controller.signal,
          }),
          fetchJson(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
            signal: controller.signal,
          }),
        ])

        if (controller.signal.aborted) return

        const nextCache = {
          savedAt: Date.now(),
          profile: cached?.profile ?? null,
          repos: Array.isArray(cached?.repos) ? cached.repos : [],
          contributionWeeks: Array.isArray(cached?.contributionWeeks) ? cached.contributionWeeks : [],
          contributionTotal: typeof cached?.contributionTotal === 'number' ? cached.contributionTotal : null,
        }

        const profileResult = results[0]
        if (profileResult.status === 'fulfilled') {
          setProfile(profileResult.value)
          nextCache.profile = profileResult.value
        }

        const repoResult = results[1]
        if (repoResult.status === 'fulfilled') {
          const repoJson = repoResult.value
          const normalizedRepos = Array.isArray(repoJson)
            ? repoJson
                .filter((repo) => !repo.fork)
                .slice(0, 3)
                .map((repo) => ({
                  name: repo.name,
                  description: repo.description || 'No description provided.',
                  language: repo.language || 'Other',
                  color: getLanguageColor(repo.language),
                  stars: formatCompactNumber(repo.stargazers_count ?? 0),
                  forks: formatCompactNumber(repo.forks_count ?? 0),
                  url: repo.html_url,
                }))
            : []

          setRepos(normalizedRepos)
          nextCache.repos = normalizedRepos
        }

        const contribResult = results[2]
        if (contribResult.status === 'fulfilled') {
          const contribJson = contribResult.value
          const contributions = contribJson?.contributions ?? []
          const weeks = buildContributionWeeks(contributions)
          const total =
            typeof contribJson?.total?.lastYear === 'number'
              ? contribJson.total.lastYear
              : contributions.reduce((sum, entry) => sum + (entry?.count ?? 0), 0)

          setContributionWeeks(weeks)
          setContributionTotal(total)
          nextCache.contributionWeeks = weeks
          nextCache.contributionTotal = total
        }

        const anySuccess = results.some((result) => result.status === 'fulfilled')
        if (anySuccess) {
          safeWriteCache(nextCache)
        } else if (!cached) {
          setHasError(true)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          if (!cached) setHasError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => controller.abort()
  }, [])

  const publicRepos = useMemo(() => {
    if (!profile) return null
    if (typeof profile.public_repos !== 'number') return null
    return profile.public_repos
  }, [profile])

  const visibleRepos = useMemo(() => {
    if (repos.length > 0) return repos
    return Array.from({ length: 3 })
  }, [repos])

  return (
    <section className="bg-[#efefef] px-4 pb-16 pt-4 text-black sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1520px]">
        <div className="max-w-[360px]">
          <h2 className="text-[1.7rem] font-semibold tracking-tight text-[#1f2328] sm:text-[1.95rem]">
            {t('github.title')}
          </h2>
          <p className="mt-1 text-[13px] text-black/42 sm:text-[14px]">
            {t('github.subtitle')}
          </p>
        </div>

        <div className="mt-8 rounded-[18px] border border-white/5 bg-[#0d1117] px-4 py-5 text-white shadow-[0_22px_55px_rgba(0,0,0,0.12)] sm:px-7 sm:py-6 lg:mx-auto lg:max-w-[1120px] lg:px-9">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[760px]">
              <div className="ml-[42px] grid grid-cols-12 gap-2 text-[10px] text-[#7d8590]">
                {months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>

              <div className="mt-3 flex gap-3">
                <div className="grid w-[28px] grid-rows-7 gap-[3px] pt-[2px] text-[10px] text-[#7d8590]">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <span key={index}>{days[index] ?? ''}</span>
                  ))}
                </div>

                <div className="grid grid-flow-col gap-[3px]">
                  {hasError || contributionWeeks.length === 0
                    ? Array.from({ length: 52 }).map((_, weekIndex) => (
                        <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                          {Array.from({ length: 7 }).map((__, dayIndex) => (
                            <span
                              key={`${weekIndex}-${dayIndex}`}
                              className="h-[10px] w-[10px] rounded-[2px] bg-[#161b22]"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      ))
                    : contributionWeeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                          {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const entry = week[dayIndex]
                            const level = entry?.level ?? 0

                            return (
                              <span
                                key={`${weekIndex}-${dayIndex}`}
                                className={`h-[10px] w-[10px] rounded-[2px] ${getContributionColor(level)}`}
                                aria-hidden="true"
                              />
                            )
                          })}
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-white/6 pt-5">
            <div className="grid gap-4 text-[#c9d1d9] sm:grid-cols-2 sm:gap-8">
              <div>
                <div className="text-[1.1rem] font-semibold text-white">
                  {typeof contributionTotal === 'number'
                    ? t('github.contributionsThisYear', { count: contributionTotal })
                    : '—'}
                </div>
                <div className="mt-1 text-[12px] text-[#8b949e]">
                  {t('github.activityAcross')}
                </div>
              </div>

              <div>
                <div className="text-[1.1rem] font-semibold text-white">
                  {typeof publicRepos === 'number' ? t('github.publicRepos', { count: publicRepos }) : '—'}
                </div>
                <div className="mt-1 text-[12px] text-[#8b949e]">{t('github.totalOpenSource')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:mx-auto lg:max-w-[1120px] lg:grid-cols-3 lg:gap-5">
          {(isLoading && repos.length === 0 ? Array.from({ length: 3 }) : visibleRepos).map(
            (repository, index) => (
            <article
              key={repository?.name ?? index}
              className="rounded-[14px] border border-white/5 bg-[#0d1117] p-4 text-white shadow-[0_14px_34px_rgba(0,0,0,0.08)]"
            >
              {repository ? (
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[13px] font-medium text-[#c9d1d9]"
                >
                  <FiCode className="h-3.5 w-3.5 text-[#8b949e]" aria-hidden="true" />
                  <span>{repository.name}</span>
                </a>
              ) : (
                <div className="h-4 w-40 rounded bg-white/10" />
              )}

              {repository ? (
                <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-[#8b949e]">
                  {repository.description}
                </p>
              ) : (
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-5/6 rounded bg-white/10" />
                </div>
              )}

              {repository ? (
                <div className="mt-5 flex items-center justify-between gap-4 text-[11px] text-[#8b949e]">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${repository.color}`} aria-hidden="true" />
                    <span>{repository.language}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1">
                      <FiStar className="h-3.5 w-3.5" aria-hidden="true" />
                      {repository.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FiGitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                      {repository.forks}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="h-3 w-20 rounded bg-white/10" />
                  <div className="h-3 w-24 rounded bg-white/10" />
                </div>
              )}
            </article>
          ),
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-transparent px-5 py-3 text-[14px] font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <FiGithub className="h-4 w-4" aria-hidden="true" />
            {t('github.viewAllRepos')}
            <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
