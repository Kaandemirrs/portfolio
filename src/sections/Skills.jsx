import claudeLogo from '@/assets/logo/claude.png'
import figmaLogo from '@/assets/logo/figma.svg'
import gitLogo from '@/assets/logo/git.svg'
import kotlinLogo from '@/assets/logo/kotlin.svg'
import { FaAws, FaPython, FaReact } from 'react-icons/fa'
import {
  SiCplusplus,
  SiFlutter,
  SiJavascript,
  SiMysql,
} from 'react-icons/si'

const skillItems = [
  { label: 'GIT', type: 'image', src: gitLogo },
  { label: 'FIGMA', type: 'image', src: figmaLogo },
  { label: 'KOTLIN', type: 'image', src: kotlinLogo },
  { label: 'FLUTTER', type: 'icon', icon: SiFlutter, className: 'text-sky-400' },
  { label: 'REACT', type: 'icon', icon: FaReact, className: 'text-cyan-300' },
  { label: 'JAVASCRIPT', type: 'icon', icon: SiJavascript, className: 'text-yellow-400' },
  { label: 'C++', type: 'icon', icon: SiCplusplus, className: 'text-blue-300' },
  { label: 'MySQL', type: 'icon', icon: SiMysql, className: 'text-sky-500' },
  { label: 'PYHTON', type: 'icon', icon: FaPython, className: 'text-yellow-300' },
  { label: 'aws', type: 'icon', icon: FaAws, className: 'text-orange-400' },
  { label: 'Claude', type: 'image', src: claudeLogo },
]

const marqueeItems = [...skillItems, ...skillItems]

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-white/5 bg-[#161616] py-5 sm:py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#161616] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#161616] to-transparent sm:w-16" />

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-10">
          <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/80">
            <span className="h-px w-8 bg-white/30" />
            Skills
          </span>
        </div>

        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max items-stretch gap-3 sm:gap-5">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="flex min-w-[88px] flex-col items-center justify-center gap-3 px-3 py-2 text-center sm:min-w-[106px] sm:px-4"
              >
                <div className="flex h-12 items-center justify-center sm:h-14">
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.label}
                      className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                    />
                  ) : (
                    <item.icon
                      className={`h-10 w-10 sm:h-12 sm:w-12 ${item.className}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/72 sm:text-[11px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
