import merdivenGraphic from '@/assets/images/merdivens.svg'
import { FiCode, FiPenTool, FiSettings } from 'react-icons/fi'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  const aboutItems = useMemo(
    () => [
      {
        step: '01',
        title: t('about.cards.design.title'),
        description: t('about.cards.design.description'),
        icon: FiPenTool,
      },
      {
        step: '02',
        title: t('about.cards.development.title'),
        description: t('about.cards.development.description'),
        icon: FiCode,
      },
      {
        step: '03',
        title: t('about.cards.distribution.title'),
        description: t('about.cards.distribution.description'),
        icon: FiSettings,
      },
    ],
    [t],
  )

  return (
    <section
      id="about"
      className="overflow-hidden bg-[#efefef] px-4 py-14 text-black sm:px-6 sm:py-16 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1520px]">
        <div className="flex justify-center">
          <div className="inline-flex min-h-[74px] items-center justify-center border-[4px] border-black px-8 text-center sm:min-h-[86px] sm:px-16">
            <h2 className="font-gilroy text-[1.85rem] font-extrabold uppercase tracking-[0.28em] sm:text-[2.15rem]">
              {t('about.title')}
            </h2>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[720px] text-center text-[13px] leading-6 text-black/60 sm:mt-10 sm:text-[15px]">
          {t('about.paragraph')}
        </p>

        <div className="mx-auto mt-9 h-px w-full max-w-[1120px] bg-black/12 sm:mt-12" />

        <div className="relative mt-10 lg:mt-16">
          <div className="relative">
            <div className="mx-auto w-full max-w-none sm:max-w-[1240px] lg:ml-0 lg:max-w-[1120px]">
              <img
                src={merdivenGraphic}
                alt="About me timeline"
                className="h-auto w-full select-none object-contain"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:absolute lg:right-[1.5%] lg:top-[38%] lg:mt-0 lg:w-[42%] lg:gap-6">
            {aboutItems.map((item, index) => {
              const Icon = item.icon

              return (
                <article
                  key={item.title}
                  className={`border border-black/8 bg-white/55 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:p-5 ${
                    index === 2 ? 'md:col-span-2 lg:ml-[22%] lg:w-[72%]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex min-w-[48px] flex-col items-start gap-3">
                      <span className="text-[11px] font-semibold tracking-[0.28em] text-black/35">
                        {item.step}
                      </span>
                      <Icon className="h-5 w-5 shrink-0 text-black/30" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-gilroy text-lg font-extrabold uppercase tracking-[0.16em] text-black sm:text-[1.35rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[12px] leading-5 text-black/56 sm:text-[13px] sm:leading-6">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
