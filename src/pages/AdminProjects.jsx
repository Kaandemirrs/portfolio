/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react'
import { FiArrowLeft, FiDownload, FiPlus, FiSave, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {
  createEmptyProject,
  hasAdminAccess,
  loadProjects,
  normalizeProject,
  saveProjects,
} from '@/lib/projectStorage'

const previewOptions = [
  { value: 'rota', label: 'Rota / Mobil uygulama görünümü' },
  { value: 'learnlogicify', label: 'Learnlogicify / Açık tema landing' },
  { value: 'winzee', label: 'Winzee / Renkli chat görünümü' },
  { value: 'gemini', label: 'Gemini / Koyu AI görünümü' },
  { value: 'chatgpt', label: 'ChatGPT / Siyah logo görünümü' },
]

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-[780px] text-[13px] leading-6 text-white/52">{description}</p>
        ) : null}
      </div>
      <div className="mt-6 grid gap-4">{children}</div>
    </section>
  )
}

function Field({ label, children, hint }) {
  return (
    <label className="grid gap-2">
      <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/42">
        {label}
      </span>
      {children}
      {hint ? <span className="text-[12px] text-white/34">{hint}</span> : null}
    </label>
  )
}

function inputClassName(multiline = false) {
  return `w-full rounded-[16px] border border-white/10 bg-[#0d1016] px-4 py-3 text-[14px] text-white outline-none transition-colors duration-300 placeholder:text-white/22 focus:border-white/22 ${
    multiline ? 'min-h-[140px] resize-y' : ''
  }`
}

function parseCommaList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function AdminProjects() {
  const [projects, setProjects] = useState(() => loadProjects())
  const [selectedId, setSelectedId] = useState(() => loadProjects()[0]?.id ?? '')
  const [savedMessage, setSavedMessage] = useState('')
  const adminEnabled = hasAdminAccess()

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? projects[0] ?? null,
    [projects, selectedId],
  )

  function updateProjectField(updater) {
    if (!selectedProject) {
      return
    }

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === selectedProject.id ? normalizeProject(updater(project)) : project,
      ),
    )
  }

  function handleSave() {
    const result = saveProjects(projects)

    if (!result.ok) {
      setSavedMessage('Kaydetme basarisiz. Fotograf boyutunu azaltip tekrar dene.')
      window.setTimeout(() => setSavedMessage(''), 3200)
      return
    }

    setSavedMessage('Projeler kaydedildi.')
    window.setTimeout(() => setSavedMessage(''), 2200)
  }

  function handleExport() {
    const json = JSON.stringify(projects, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-projects.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleAddProject() {
    const newProject = createEmptyProject()
    setProjects((currentProjects) => [newProject, ...currentProjects])
    setSelectedId(newProject.id)
    setSavedMessage('')
  }

  function resizeImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onerror = () => reject(new Error('Dosya okunamadi.'))
      reader.onload = () => {
        const image = new Image()

        image.onerror = () => reject(new Error('Gorsel islenemedi.'))
        image.onload = () => {
          const maxWidth = 1600
          const maxHeight = 1200
          let { width, height } = image

          const ratio = Math.min(maxWidth / width, maxHeight / height, 1)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height

          const context = canvas.getContext('2d')
          if (!context) {
            reject(new Error('Canvas olusturulamadi.'))
            return
          }

          context.drawImage(image, 0, 0, width, height)

          // localStorage limiti icin gorseli kontrollu sekilde sikistiriyoruz.
          let quality = 0.86
          let result = canvas.toDataURL('image/jpeg', quality)

          while (result.length > 900000 && quality > 0.5) {
            quality -= 0.08
            result = canvas.toDataURL('image/jpeg', quality)
          }

          resolve(result)
        }

        image.src = typeof reader.result === 'string' ? reader.result : ''
      }

      reader.readAsDataURL(file)
    })
  }

  async function handleCoverImageChange(file) {
    if (!file || !selectedProject) {
      return
    }

    try {
      const optimizedImage = await resizeImageFile(file)

      updateProjectField((project) => ({
        ...project,
        coverImage: optimizedImage,
      }))
      setSavedMessage('Kapak fotografi hazir. Kaydet butonuna basabilirsin.')
      window.setTimeout(() => setSavedMessage(''), 2600)
    } catch {
      setSavedMessage('Fotograf yuklenemedi. Lutfen farkli bir dosya dene.')
      window.setTimeout(() => setSavedMessage(''), 2600)
    }
  }

  function handleRemoveCoverImage() {
    updateProjectField((project) => ({
      ...project,
      coverImage: '',
    }))
  }

  if (!adminEnabled) {
    return (
      <main className="min-h-screen bg-[#06070a] px-4 py-10 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[920px]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/76"
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ana sayfaya don
          </Link>

          <div className="mt-8 rounded-[28px] border border-white/8 bg-white/[0.03] p-8">
            <h1 className="text-3xl font-extrabold text-white">Admin paneli gizli</h1>
            <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-white/56">
              Bu ekran sadece admin erisimi aktif oldugunda gorunur. Local ortamda otomatik acilir.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#06070a] px-4 py-6 text-white sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/34">
              Yonetim Paneli
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Proje ekleme ve duzenleme
            </h1>
            <p className="mt-3 max-w-[740px] text-[15px] leading-7 text-white/56">
              Buradan ana sayfadaki projeleri ve case study detay sayfasindaki tum alanlari
              Turkce form ile duzenleyebilirsin.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-[13px] font-medium text-white/76 transition-colors duration-300 hover:border-white/18 hover:text-white"
            >
              <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
              Siteye don
            </Link>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[13px] font-semibold text-white/76 transition-transform duration-300 hover:scale-[1.02] hover:text-white"
            >
              <FiDownload className="h-4 w-4" aria-hidden="true" />
              Disa aktar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-black transition-transform duration-300 hover:scale-[1.02]"
            >
              <FiSave className="h-4 w-4" aria-hidden="true" />
              Kaydet
            </button>
          </div>
        </div>

        {savedMessage ? (
          <div className="mt-6 rounded-[18px] border border-emerald-400/18 bg-emerald-400/[0.06] px-4 py-3 text-[14px] text-emerald-200">
            {savedMessage}
          </div>
        ) : null}

        <section className="mt-8 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/34">
                  Projeler
                </div>
                <div className="mt-1 text-sm text-white/58">{projects.length} proje kayitli</div>
              </div>

              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[12px] font-medium text-white/76 transition-colors duration-300 hover:border-white/18 hover:text-white"
              >
                <FiPlus className="h-4 w-4" aria-hidden="true" />
                Yeni
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className={`rounded-[18px] border px-4 py-4 text-left transition-colors duration-300 ${
                    selectedProject?.id === project.id
                      ? 'border-white/18 bg-white/[0.08]'
                      : 'border-white/8 bg-white/[0.02] hover:border-white/14 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="text-sm font-semibold text-white">{project.title}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.14em] text-white/38">
                    {project.category} / {project.year}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-[16px] border border-white/8 bg-white/[0.02] px-4 py-4 text-[12px] leading-6 text-white/48">
              Kayitli projeler korunur. Bu panelde sifirlama veya proje silme yoktur.
            </div>
          </aside>

          {selectedProject ? (
            <div className="grid gap-6">
              <SectionCard title="Temel Bilgiler" description="Kartta ve detay sayfasinda gorunen ana alanlar.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Proje id" hint="URL icin kullanilir. Ornek: rota-travel-planning-app">
                    <input
                      value={selectedProject.id}
                      onChange={(event) => updateProjectField((project) => ({ ...project, id: event.target.value }))}
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Preview tipi" hint="Hazir gorunumu sec.">
                    <select
                      value={selectedProject.previewVariant}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, previewVariant: event.target.value }))
                      }
                      className={inputClassName()}
                    >
                      {previewOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Kapak fotografi" hint="Tek bir gorsel yukle. Kartta ve detay sayfasinda bu gorsel kullanilir.">
                    <div className="grid gap-3 rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                      {selectedProject.coverImage ? (
                        <img
                          src={selectedProject.coverImage}
                          alt={selectedProject.title}
                          className="h-48 w-full rounded-[16px] object-cover"
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center rounded-[16px] border border-dashed border-white/10 text-[13px] text-white/34">
                          Henuz kapak fotografi yuklenmedi
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <label className="inline-flex cursor-pointer items-center rounded-full border border-white/10 px-4 py-3 text-[13px] font-medium text-white/76 transition-colors duration-300 hover:border-white/18 hover:text-white">
                          Fotograf sec
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => handleCoverImageChange(event.target.files?.[0])}
                          />
                        </label>

                        {selectedProject.coverImage ? (
                          <button
                            type="button"
                            onClick={handleRemoveCoverImage}
                            className="inline-flex items-center gap-2 rounded-full border border-red-400/16 bg-red-400/[0.05] px-4 py-3 text-[13px] font-medium text-red-200"
                          >
                            <FiTrash2 className="h-4 w-4" aria-hidden="true" />
                            Fotografi sil
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </Field>
                  <Field label="Proje basligi">
                    <input
                      value={selectedProject.title}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, title: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Kisa baslik">
                    <input
                      value={selectedProject.shortTitle}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, shortTitle: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Kategori">
                    <input
                      value={selectedProject.category}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, category: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Yil">
                    <input
                      value={selectedProject.year}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, year: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Rol">
                    <input
                      value={selectedProject.role}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, role: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Kaynak etiketi">
                    <input
                      value={selectedProject.source}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, source: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Nereden geldi">
                    <input
                      value={selectedProject.origin}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, origin: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Canli link">
                    <input
                      value={selectedProject.liveUrl}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, liveUrl: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="GitHub link">
                    <input
                      value={selectedProject.githubUrl}
                      onChange={(event) =>
                        updateProjectField((project) => ({ ...project, githubUrl: event.target.value }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                </div>

                <Field label="Kisa ozet">
                  <textarea
                    value={selectedProject.summary}
                    onChange={(event) =>
                      updateProjectField((project) => ({ ...project, summary: event.target.value }))
                    }
                    className={inputClassName(true)}
                  />
                </Field>

                <Field label="Genel aciklama">
                  <textarea
                    value={selectedProject.overview}
                    onChange={(event) =>
                      updateProjectField((project) => ({ ...project, overview: event.target.value }))
                    }
                    className={inputClassName(true)}
                  />
                </Field>
              </SectionCard>

              <SectionCard title="Quick Stats" description="Detay sayfasindaki 4 istatistik karti.">
                <div className="grid gap-4 md:grid-cols-2">
                  {selectedProject.quickStats.map((stat, index) => (
                    <div key={`${stat.label}-${index}`} className="grid gap-3 rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                      <Field label={`Kart ${index + 1} baslik`}>
                        <input
                          value={stat.label}
                          onChange={(event) =>
                            updateProjectField((project) => ({
                              ...project,
                              quickStats: project.quickStats.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, label: event.target.value } : item,
                              ),
                            }))
                          }
                          className={inputClassName()}
                        />
                      </Field>
                      <Field label={`Kart ${index + 1} deger`}>
                        <input
                          value={stat.value}
                          onChange={(event) =>
                            updateProjectField((project) => ({
                              ...project,
                              quickStats: project.quickStats.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, value: event.target.value } : item,
                              ),
                            }))
                          }
                          className={inputClassName()}
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Problem" description="01 bolumunde gorunen problem alani ve musteri alintisi.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Problem etiketi">
                    <input
                      value={selectedProject.problem.tag}
                      onChange={(event) =>
                        updateProjectField((project) => ({
                          ...project,
                          problem: { ...project.problem, tag: event.target.value },
                        }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                  <Field label="Problem basligi">
                    <input
                      value={selectedProject.problem.title}
                      onChange={(event) =>
                        updateProjectField((project) => ({
                          ...project,
                          problem: { ...project.problem, title: event.target.value },
                        }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                </div>

                <Field label="Problem aciklamasi">
                  <textarea
                    value={selectedProject.problem.narrative}
                    onChange={(event) =>
                      updateProjectField((project) => ({
                        ...project,
                        problem: { ...project.problem, narrative: event.target.value },
                      }))
                    }
                    className={inputClassName(true)}
                  />
                </Field>

                <div className="grid gap-4">
                  {selectedProject.problem.points.map((point, index) => (
                    <Field
                      key={`problem-point-${index}`}
                      label={index === 2 ? 'Musteri alintisi' : `Problem maddesi ${index + 1}`}
                    >
                      <textarea
                        value={point}
                        onChange={(event) =>
                          updateProjectField((project) => ({
                            ...project,
                            problem: {
                              ...project.problem,
                              points: project.problem.points.map((item, itemIndex) =>
                                itemIndex === index ? event.target.value : item,
                              ),
                            },
                          }))
                        }
                        className={inputClassName(true)}
                      />
                    </Field>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Process" description="5 adimli process ilerleme alanindaki tum bilgiler.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Process etiketi">
                    <input
                      value={selectedProject.process.tag}
                      onChange={(event) =>
                        updateProjectField((project) => ({
                          ...project,
                          process: { ...project.process, tag: event.target.value },
                        }))
                      }
                      className={inputClassName()}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {selectedProject.process.stages.map((stage, index) => (
                    <Field key={`process-stage-${index}`} label={`Adim ${index + 1}`}>
                      <input
                        value={stage}
                        onChange={(event) =>
                          updateProjectField((project) => ({
                            ...project,
                            process: {
                              ...project.process,
                              stages: project.process.stages.map((item, itemIndex) =>
                                itemIndex === index ? event.target.value : item,
                              ),
                            },
                          }))
                        }
                        className={inputClassName()}
                      />
                    </Field>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Stack ve Tools" description="Detay sayfasinda gorunen stack ve ek araclar alani.">
                <div className="grid gap-4">
                  <Field label="Tasarim stack" hint="Virgul ile ayir. Ornek: Figma, Spline, Maze">
                    <textarea
                      value={selectedProject.stack.design.join(', ')}
                      onChange={(event) =>
                        updateProjectField((project) => ({
                          ...project,
                          stack: { ...project.stack, design: parseCommaList(event.target.value) },
                        }))
                      }
                      className={inputClassName(true)}
                    />
                  </Field>

                  <Field label="Gelistirme stack" hint="Virgul ile ayir.">
                    <textarea
                      value={selectedProject.stack.development.join(', ')}
                      onChange={(event) =>
                        updateProjectField((project) => ({
                          ...project,
                          stack: { ...project.stack, development: parseCommaList(event.target.value) },
                        }))
                      }
                      className={inputClassName(true)}
                    />
                  </Field>

                  <Field label="Ek araclar" hint="Virgul ile ayir.">
                    <textarea
                      value={selectedProject.tools.join(', ')}
                      onChange={(event) =>
                        updateProjectField((project) => ({
                          ...project,
                          tools: parseCommaList(event.target.value),
                        }))
                      }
                      className={inputClassName(true)}
                    />
                  </Field>
                </div>
              </SectionCard>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
