/**
 * PHOTO CONFIGURATION
 * ------------------------------------------------------------
 * Every photograph used on the site is declared here, once.
 * To replace or rearrange photos:
 *   1. Drop the new file into /public/photos
 *   2. Update `src`, `width`, `height` (the real pixel size, used to keep
 *      original proportions and avoid layout shift)
 *   3. Adjust `focus` (CSS object-position) so the face stays in frame
 *      whenever a photo is shown in a fixed-ratio frame
 *   4. Change which ids each section uses in `placements` below.
 *
 * The originals live untouched in /Nabila_Photos.
 *   - nabila-portrait.jpg   ← "WhatsApp Image 2026-10-26 at 09.17.49.jpeg"
 *                             (cropped out of the phone screenshot UI only)
 *   - nabila-caftan.jpg     ← "WhatsApp Image 2026-10-26 at 09.17.49 (1).jpeg"
 *   - nabila-white-dress.jpg← "WhatsApp Image 2026-10-26 at 09.17.50.jpeg"
 *   - nabila-moment.mp4     ← "WhatsApp Video 2026-10-26 at 09.17.49.mp4" (muted web copy)
 */

const base = import.meta.env.BASE_URL

export type Media = {
  id: string
  kind: 'image' | 'video'
  src: string
  poster?: string
  width: number
  height: number
  alt: string
  /** CSS object-position used when cropped into a frame */
  focus: string
  /** neutral, editable caption — never describes an unknown event */
  caption: string
  captionAr?: string
}

export const media: Record<string, Media> = {
  caftan: {
    id: 'caftan',
    kind: 'image',
    src: `${base}photos/nabila-caftan.jpg`,
    width: 720,
    height: 1159,
    alt: 'Nabila en caftan bordeaux, souriante',
    focus: '50% 32%',
    caption: 'En bordeaux',
    captionAr: 'نبيلة',
  },
  whiteDress: {
    id: 'whiteDress',
    kind: 'image',
    src: `${base}photos/nabila-white-dress.jpg`,
    width: 716,
    height: 910,
    alt: 'Nabila en robe blanche, debout près d’une rambarde en verre',
    focus: '47% 58%',
    caption: 'En blanc',
    captionAr: 'بكل أناقة',
  },
  portrait: {
    id: 'portrait',
    kind: 'image',
    src: `${base}photos/nabila-portrait.jpg`,
    width: 424,
    height: 714,
    alt: 'Portrait rapproché de Nabila, la main sur la joue',
    focus: '45% 35%',
    caption: 'Un regard',
    captionAr: 'نظرة',
  },
  moment: {
    id: 'moment',
    kind: 'video',
    src: `${base}photos/nabila-moment.mp4`,
    poster: `${base}photos/nabila-moment-poster.jpg`,
    width: 640,
    height: 640,
    alt: 'Courte vidéo de Nabila, la main sous le menton',
    focus: '40% 40%',
    caption: 'Un instant',
    captionAr: 'لحظة',
  },
}

/** Which media each part of the photo experience uses (by id). */
export const placements = {
  cinematicHero: 'caftan',
  cinematicSecond: 'whiteDress',
  polaroids: ['portrait', 'caftan', 'moment', 'whiteDress'],
  scrapbook: ['portrait', 'moment'],
  carousel: ['caftan', 'portrait', 'whiteDress'],
} as const

export const pick = (id: string) => media[id]
