import type { BlueprintIcon } from '../../content/vision'
import { TableauMark } from './TableauMark'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Line icons for the architectural blueprint. */
export function Icon({ name, className = '' }: { name: BlueprintIcon; className?: string }) {
  if (name === 'tableau') return <TableauMark size={22} className={className} />
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      {name === 'code' && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M9.5 10l-2 2 2 2M14.5 10l2 2-2 2" />
        </>
      )}
      {name === 'app' && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 8.5h18M8 8.5V20M11 12h7M11 15.5h5" />
        </>
      )}
      {name === 'eval' && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
        </>
      )}
      {name === 'storage' && (
        <>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
          <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
        </>
      )}
      {name === 'writeback' && (
        <>
          <path d="M14 4h4.5A2.5 2.5 0 0121 6.5v11a2.5 2.5 0 01-2.5 2.5H14" />
          <path d="M3 12h11M10 8l4 4-4 4" />
        </>
      )}
      {name === 'salesforce' && (
        <path d="M7.5 18.5a4 4 0 01-.6-7.95A5 5 0 0116.4 8.6a3.6 3.6 0 014.1 3.55 3.4 3.4 0 01-3.2 6.35z" />
      )}
      {name === 'distribution' && (
        <>
          <circle cx="12" cy="12" r="2.4" />
          <circle cx="5" cy="6" r="1.8" />
          <circle cx="19" cy="6" r="1.8" />
          <circle cx="5" cy="18" r="1.8" />
          <circle cx="19" cy="18" r="1.8" />
          <path d="M6.5 7.2l3.6 3.2M17.5 7.2l-3.6 3.2M6.5 16.8l3.6-3.2M17.5 16.8l-3.6-3.2" />
        </>
      )}
    </svg>
  )
}
