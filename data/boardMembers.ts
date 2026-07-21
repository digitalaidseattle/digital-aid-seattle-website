/*
 * @2026 Digital Aid Seattle
 */

// Temporary: these people are board members (and exist in the Coda volunteer data).
// Listing their names here lets us filter them out of the Cadre list and show them
// under Board of Directors. Names must match Coda exactly. Moves to Coda when the
// board feature is built out.
export type BoardMember = {
  name: string
}

export const boardMembers: BoardMember[] = [
  { name: 'Seamus Brugh' },
  { name: 'Jake Mismas' },
  { name: 'Kenny Drake-Sargent' },
  { name: 'Manhattan Lowell' },
]
