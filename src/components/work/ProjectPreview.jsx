import { SiOpenai } from 'react-icons/si'

export function renderProjectPreview(variant, compact = false) {
  if (variant === 'learnlogicify') {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#f8f6f3] p-5 sm:p-6">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(90deg,rgba(220,180,255,0.8),rgba(255,212,169,0.72))]" />
        <div className="relative z-10 flex items-center justify-between text-[10px] text-black/55 sm:text-[11px]">
          <span className="font-semibold">Learnlogicify</span>
          <div className="flex gap-4">
            <span>Courses</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-8 max-w-[330px] text-center sm:mt-10">
          <h3 className="text-xl font-extrabold text-black sm:text-[1.7rem]">
            Accelerate the Tech Career
            <br />
            and build your Future Faster
          </h3>
          <p className="mt-3 text-[11px] text-black/55 sm:text-[12px]">
            Discover a wide range of programming courses tailored to enhance your skills.
          </p>
          <button className="mt-4 rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-semibold text-black shadow-sm">
            View Courses
          </button>
        </div>
        <div className="absolute bottom-5 left-1/2 flex w-[78%] -translate-x-1/2 gap-2 rounded-[24px] bg-white/85 p-3 shadow-[0_22px_40px_rgba(0,0,0,0.12)] backdrop-blur">
          <div className="w-[26%] rounded-[18px] bg-[#101114]" />
          <div className="grid flex-1 grid-cols-3 gap-2">
            <div className="rounded-[14px] bg-[#1e232f]" />
            <div className="rounded-[14px] bg-[#2d3344]" />
            <div className="rounded-[14px] bg-[#3a4256]" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'winzee') {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#7284cb_0%,#edb7a3_48%,#edc9d1_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_10%,rgba(255,255,255,0.95),transparent_18%),radial-gradient(circle_at_75%_10%,rgba(255,255,255,0.55),transparent_18%)] opacity-85" />
        <div className="absolute -left-8 top-8 h-32 w-[125%] rounded-full border-[10px] border-yellow-200/80 opacity-80 blur-[1px]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-white">
          <div className="text-5xl font-extrabold tracking-tight sm:text-6xl">w</div>
          <div className="text-4xl font-light tracking-[0.12em] sm:text-5xl">Winzee</div>
        </div>
      </div>
    )
  }

  if (variant === 'chatgpt') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-black">
        <SiOpenai className="h-24 w-24 text-white sm:h-28 sm:w-28" />
      </div>
    )
  }

  if (variant === 'rota') {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(154,119,255,0.22),transparent_26%),#05070b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(86,60,255,0.18),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(88,222,255,0.12),transparent_24%)]" />
        <div className="relative z-10 flex h-full items-center justify-center p-5 sm:p-7">
          <div className="relative flex h-full max-h-[520px] w-full max-w-[290px] items-center justify-center rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3 shadow-[0_24px_80px_rgba(90,70,180,0.18)]">
            <div className="absolute top-3 h-1 w-14 rounded-full bg-white/14" />
            <div className="flex h-full w-full flex-col rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,#121522_0%,#0b0e17_100%)] p-4">
              <div className="flex items-center justify-between text-[10px] text-white/55">
                <span>Rota</span>
                <span>Trip Plan</span>
              </div>
              <div className="mt-4 rounded-[18px] bg-[linear-gradient(180deg,rgba(124,92,255,0.28),rgba(44,56,86,0.45))] p-4">
                <div className="text-[11px] text-white/55">Next destination</div>
                <div className="mt-1 text-xl font-semibold text-white">Lisbon</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-white/58">
                  <div className="rounded-xl bg-white/6 p-2">3 days</div>
                  <div className="rounded-xl bg-white/6 p-2">Flight + Stay</div>
                </div>
              </div>
              <div className="mt-4 grid flex-1 gap-2">
                <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
                    Smart suggestion
                  </div>
                  <div className="mt-2 text-sm font-medium text-white">Create your full route in one flow</div>
                </div>
                <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-sky-300/80">
                    Offline mode
                  </div>
                  <div className="mt-2 text-sm font-medium text-white">Access saved plans without connection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!compact ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[26%] bg-[radial-gradient(circle_at_left,rgba(88,222,255,0.08),transparent_60%)]" />
        ) : null}
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),#040608]">
      <div className="absolute inset-x-0 top-[56%] h-px bg-[linear-gradient(90deg,transparent,#3d8fff,transparent)]" />
      <div className="absolute inset-x-0 top-[62%] h-px bg-[linear-gradient(90deg,transparent,#f0b5ff,transparent)] opacity-80" />
      <div className="absolute inset-x-0 top-[68%] h-px bg-[linear-gradient(90deg,transparent,#82f0ff,transparent)] opacity-70" />
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-4xl font-medium tracking-tight text-white sm:text-5xl">Gemini</span>
      </div>
    </div>
  )
}
