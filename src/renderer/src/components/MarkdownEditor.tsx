import {
  MDXEditor,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()

  if (!selectedNote) return null

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),
        linkDialogPlugin(), // Allows inserting/editing links through a dialog
        linkPlugin(), // Enables link functionality
        thematicBreakPlugin(),
        markdownShortcutPlugin()
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-sky-200 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-hr:border-gray-300 prose-hr:px-5 prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']
      prose-a:text-blue-600 prose-a:underline prose-table:border prose-table:w-full prose-table:collapse prose-th:border prose-td:border prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2"
    />
  )
}
