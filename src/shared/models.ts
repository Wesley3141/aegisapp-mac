export type NoteInfo = {
  title: string
  lastEditTime: number
}

export type NoteContent = string

export interface Note {
  id: string
  content: string
  title: string
  lastEditTime: number
}
