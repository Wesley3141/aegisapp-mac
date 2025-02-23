import {
  MDXEditor,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  imagePlugin,
  sandpackPlugin,
  toolbarPlugin,
  directivesPlugin,
  KitchenSinkToolbar,
  UndoRedo,
  InsertThematicBreak,
  ConditionalContents,
  ShowSandpackInfo,
  DiffSourceToggleWrapper,
  InsertTable,
  InsertCodeBlock,
  InsertImage,
  BoldItalicUnderlineToggles
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()

  if (!selectedNote) return null

  return (
    <MDXEditor
      ref={editorRef}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        imagePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex flex-col gap-4 fixed top-4 right-4 z-50 space-y-2">
              <div><UndoRedo /></div>
              <div><InsertThematicBreak /></div>
              <div><InsertTable /></div>
              <div><InsertCodeBlock /></div>
              <div><InsertImage /></div>
              <div><BoldItalicUnderlineToggles /></div>
            </div>
          )
        }),
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-sky-200 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-hr:border-gray-300 prose-hr:px-5 prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] prose-a:text-blue-600 prose-a:underline"
    />
  )
}
