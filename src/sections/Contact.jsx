import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FiArrowUpRight, FiMail } from 'react-icons/fi'
import { SiUpwork } from 'react-icons/si'
import { useTranslation } from 'react-i18next'

const upworkUrl = 'https://www.upwork.com/freelancers/~01d0fd107e531014aa'
const linkedinUrl = 'https://www.linkedin.com/in/kaan-demir-b712b3260/'
const whatsappPhoneRaw = import.meta.env.VITE_WHATSAPP_PHONE
const whatsappPhone =
  typeof whatsappPhoneRaw === 'string' ? whatsappPhoneRaw.replace(/[^\d]/g, '') : ''
const whatsappText = 'Merhaba Kaan, portfolio sitenden yaziyorum.'
const whatsappUrl = whatsappPhone
  ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappText)}`
  : null

const contactItems = [
  {
    label: 'Upwork',
    value: 'Freelance profile',
    href: upworkUrl,
    icon: SiUpwork,
  },
  {
    label: 'LinkedIn',
    value: 'Professional network',
    href: linkedinUrl,
    icon: FaLinkedinIn,
  },
  {
    label: 'Email',
    value: 'kaandmr4331@hotmail.com',
    href: 'mailto:kaandmr4331@hotmail.com',
    icon: FiMail,
  },
  {
    label: 'WhatsApp',
    value: whatsappUrl ? 'Quick message' : 'Numara ekle',
    href: whatsappUrl ?? '#',
    disabled: !whatsappUrl,
    icon: FaWhatsapp,
  },
]

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section
      id="contact"
      className="bg-[linear-gradient(180deg,#efefef_0%,#101318_18%,#090b0f_100%)] px-4 pb-10 pt-12 text-white sm:px-6 sm:pb-12 sm:pt-16 lg:px-10 lg:pb-14 lg:pt-20"
    >
      <div className="mx-auto max-w-[1520px] overflow-hidden rounded-[32px] border border-white/8 bg-[#0d1117] px-5 py-8 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:px-7 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
          <div className="max-w-[620px]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/42">
              {t('contact.eyebrow')}
            </span>
            <h2 className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-white sm:text-5xl lg:text-[4.4rem]">
              {t('contact.titleLine1')}
              <br />
              {t('contact.titleLine2')}
            </h2>
            <p className="mt-5 max-w-[520px] text-[14px] leading-7 text-white/58 sm:text-[15px]">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactItems.map((item) => {
              const Icon = item.icon
              const isMail = item.href.startsWith('mailto:')
              const isDisabled = Boolean(item.disabled)
              const target = isMail || isDisabled ? undefined : '_blank'
              const rel = isMail || isDisabled ? undefined : 'noreferrer'
              const value =
                item.label === 'Upwork'
                  ? t('contact.upworkValue')
                  : item.label === 'LinkedIn'
                    ? t('contact.linkedinValue')
                    : item.label === 'WhatsApp'
                      ? isDisabled
                        ? t('contact.whatsappMissing')
                        : t('contact.whatsappValue')
                      : item.value

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={target}
                  rel={rel}
                  onClick={(event) => {
                    if (isDisabled) event.preventDefault()
                  }}
                  className={`group flex min-h-[148px] flex-col justify-between rounded-[24px] border border-white/8 bg-white/[0.04] p-5 transition-all duration-300 ${
                    isDisabled
                      ? 'cursor-not-allowed opacity-55'
                      : 'hover:-translate-y-1 hover:border-white/16 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <FiArrowUpRight className="h-4 w-4 text-white/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/80" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white">{item.label}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-white/55">{value}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
