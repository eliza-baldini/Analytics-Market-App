/**
 * Shared content types.
 *
 * Text fields typed `Rich` support lightweight inline markup (see RichText):
 *   [[text]]        highlighted (tone depends on the surface)
 *   [[text|tone]]   highlighted with a named tone: accent, positive, gold, violet
 *   *text*          italic
 *   **text**        bold
 */
export type Rich = string

/** Speaker notes, shown only when the Details toggle is on. Kept verbatim from the deck. */
export interface NoteBlock {
  heading?: string
  paragraphs: string[]
  link?: { label: string; url: string }
}

export interface Notes {
  /** Slide number(s) in the source deck, for traceability. */
  source: string
  blocks: NoteBlock[]
}

export interface SectionMeta {
  id: string
  /** Short label used by the dot rail. */
  navLabel: string
  /** Slide number(s) in the source deck. */
  slides: string
}
