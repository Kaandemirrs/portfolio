import heroImage from '@/assets/images/headerfoto.jpg'
import heroMobileImage from '@/assets/images/headermobile.jpg'
import { useTranslation } from 'react-i18next'

export default function Hero({ onSplineLoad }) {
  const { t } = useTranslation()

  return (
    <section className="relative flex min-h-screen w-full items-stretch overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden"
        style={{ backgroundImage: `url(${heroMobileImage})` }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat sm:block"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.34)_100%)]" />

      <div className="absolute inset-y-0 left-[51%] z-20 flex w-[90vw] max-w-none -translate-x-1/2 -translate-y-[8vh] items-center justify-center sm:left-[-8%] sm:w-[76vw] sm:max-w-[780px] sm:translate-x-0 sm:translate-y-0 md:left-[-6%] md:w-[64vw] lg:left-[-4%] lg:w-[56vw] xl:left-0 xl:w-[50vw]">
        <div className="h-[48vh] min-h-[380px] w-full overflow-hidden opacity-95 sm:h-[42vh] sm:min-h-[280px] md:h-[52vh] lg:h-[60vh]">
          <iframe
            src="https://my.spline.design/dimensioncopycopy-sUQq5hgyep7phYBiBk11Xasv-DTE/"
            title="Portfolio spline animation"
            className="pointer-events-auto block h-full w-full border-0 bg-transparent"
            loading="lazy"
            allowFullScreen
            onLoad={onSplineLoad}
          />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <div className="flex-1" />

        <div className="flex items-end justify-end px-4 pb-8 sm:px-6 sm:pb-10 md:px-8 md:pb-12 lg:px-10 lg:pb-14">
          <a
            href="#about"
            className="animate-float-bounce inline-flex items-center gap-2 text-[11px] font-medium text-text-primary/85 transition-opacity duration-300 hover:opacity-70 sm:text-[12px]"
          >
            {t('hero.scrollDown')}
            <span aria-hidden="true" className="text-base leading-none">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
