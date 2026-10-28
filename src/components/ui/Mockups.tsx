/**
 * Code-drawn stand-ins for the product screenshots on slides 3 and 7.
 * Decorative only: they suggest each era's experience without reproducing real UI.
 */

/** A dense, gray, pre-2003 report: toolbars, a tree and rows of figures. */
export function ReportMockup() {
  return (
    <div aria-hidden className="h-full overflow-hidden rounded-xl bg-[#e9ebef] p-2.5 ring-1 ring-black/5">
      <div className="mb-2 flex gap-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="h-3 w-5 rounded-sm bg-[#c9ced8]" />
        ))}
      </div>
      <div className="grid h-[calc(100%-1.25rem)] grid-cols-[110px_1fr] gap-2">
        <div className="space-y-1 rounded bg-white p-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="block h-1.5 rounded bg-[#d7dbe3]" style={{ width: `${55 + ((i * 37) % 40)}%` }} />
          ))}
        </div>
        <div className="rounded bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <span className="h-2.5 w-28 rounded bg-[#9aa3b5]" />
            <span className="h-4 w-16 rounded bg-[#2b5bb8]/70" />
          </div>
          {Array.from({ length: 9 }).map((_, r) => (
            <div key={r} className="mb-1.5 grid grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr] gap-2">
              {Array.from({ length: 4 }).map((_, c) => (
                <span key={c} className={`h-1.5 rounded ${c === 0 ? 'bg-[#b8bfcc]' : 'bg-[#dde1e8]'}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** A self-service dashboard with a ranked bar chart, a filter rail and a phone view. */
export function DashboardMockup() {
  const bars = [92, 84, 77, 70, 66, 58, 51, 46, 39, 33, 27]
  return (
    <div aria-hidden className="relative h-full overflow-hidden rounded-xl bg-white p-3 ring-1 ring-black/5">
      <div className="mb-2 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-2 w-12 rounded bg-[#e3e8f2]" />
        ))}
      </div>
      <div className="grid h-[calc(100%-1rem)] grid-cols-[1fr_96px] gap-3">
        <div className="space-y-1.5 pl-16">
          {bars.map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="-ml-16 h-1.5 w-14 rounded bg-[#e3e8f2]" />
              <span className={`h-2 rounded-sm ${i === 2 ? 'bg-[#e05c47]' : 'bg-[#8aa0c4]'}`} style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="block h-2 rounded bg-[#e3e8f2]" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-3 h-[58%] w-[22%] rounded-lg bg-white p-1.5 shadow-[0_8px_20px_-6px_rgba(0,30,91,0.35)] ring-1 ring-black/5">
        <span className="mb-1 block h-1.5 w-2/3 rounded bg-[#c9d3e6]" />
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="mb-1 block h-1 rounded bg-[#e3e8f2]" style={{ width: `${90 - i * 9}%` }} />
        ))}
      </div>
    </div>
  )
}

/** An agentic answer: KPI tiles, a trend line, channel bars and the generated query. */
export function AgentMockup() {
  return (
    <div aria-hidden className="h-full overflow-hidden rounded-xl bg-white p-4 ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <span className="h-2.5 w-40 rounded bg-[#1d2a44]" />
        <span className="rounded-full bg-[#e6f6ec] px-2 py-0.5 text-[9px] font-semibold text-[#2e9e4f]">Live</span>
      </div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {['415', '59', '18.4%'].map((v) => (
          <div key={v} className="rounded-md bg-[#f5f7fb] p-2">
            <span className="mb-1 block h-1.5 w-12 rounded bg-[#d5dbe6]" />
            <span className="text-[18px] font-semibold text-[#1d2a44] tabular">{v}</span>
          </div>
        ))}
      </div>
      <div className="grid h-[calc(100%-8.5rem)] grid-cols-[1.4fr_1fr] gap-3">
        <div className="relative rounded-md bg-[#f5f7fb] p-2">
          <svg viewBox="0 0 200 90" className="h-[70%] w-full" preserveAspectRatio="none">
            <polyline points="0,60 30,40 60,45 90,30 120,35 150,62 180,55 200,58" fill="none" stroke="#3b6fd8" strokeWidth="2.5" />
            <polyline points="0,70 30,62 60,66 90,58 120,60 150,72 180,70 200,72" fill="none" stroke="#b8c2d6" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
          <div className="mt-1 rounded bg-[#1d2a44] p-1.5">
            {[80, 60, 70].map((w, i) => (
              <span key={i} className="mb-0.5 block h-1 rounded bg-[#5f7bb5]" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-md bg-[#f5f7fb] p-2">
          {[95, 72, 68, 30].map((w, i) => (
            <div key={i}>
              <span className="mb-0.5 block h-1 w-10 rounded bg-[#d5dbe6]" />
              <span className="block h-2 rounded-sm bg-[#3b6fd8]" style={{ width: `${w}%` }} />
              <span className="mt-0.5 block h-1.5 rounded-sm bg-[#c5cfe2]" style={{ width: `${w * 0.8}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
