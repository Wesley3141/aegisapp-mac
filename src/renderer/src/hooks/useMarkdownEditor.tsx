import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef, useCallback, useEffect } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  // Reset editor content when selected note changes
  useEffect(() => {
    if (selectedNote && editorRef.current) {
      editorRef.current.setMarkdown(selectedNote.content)
    }
  }, [selectedNote?.title]) // Use title instead of id since it's guaranteed to exist

  const handleAutoSaving = useCallback(
    throttle(async (content: NoteContent) => {
      if (!selectedNote || content === selectedNote.content) return

      await saveNote(content)
    }, autoSavingTime),
    [selectedNote, saveNote]
  )

  const handleBlur = async () => {
    if (!selectedNote || !editorRef.current) return

    const content = editorRef.current.getMarkdown()
    if (content != null && content !== selectedNote.content) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur
  }
}
