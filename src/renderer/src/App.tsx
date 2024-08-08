import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import NavigationButton from './NavigationButton'
import ToDoList from './ToDoList'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <Router>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>

        <Routes>
          <Route
            path="/"
            element={
              <Content
                ref={contentContainerRef}
                className="border-l bg-zinc-900/30 border-l-white/20"
              >
                <FloatingNoteTitle className="pt-2" />
                <MarkdownEditor />
              </Content>
            }
          />
          <Route path="/todo" element={<ToDoList />} />
        </Routes>
      </RootLayout>
      <NavigationButton />
    </Router>
  )
}

export default App
