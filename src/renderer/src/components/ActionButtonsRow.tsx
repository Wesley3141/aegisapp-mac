import { DeleteNoteButton, NewNoteButton } from '@/components'
import { ComponentProps } from 'react'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
      <button
        onClick={() => {
          const sidebar = document.querySelector('aside')
          if (sidebar) {
            sidebar.classList.toggle('hidden')
            // When sidebar is hidden, show a floating button in top-left corner
            const floatingBtn = document.createElement('button')
            floatingBtn.className = 'fixed top-8 px-2 py-1 rounded-md border border-zinc-400 left-4 p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-gray-100 z-50'
            floatingBtn.title = 'Show Sidebar'
            floatingBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3h18v18H3z" />
                <path d="M9 3v18" />
              </svg>
            `
            floatingBtn.onclick = () => {
              sidebar.classList.remove('hidden')
              floatingBtn.remove()
            }
            
            if (sidebar.classList.contains('hidden')) {
              document.body.appendChild(floatingBtn)
            }
          }
        }}
        className="px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100"
        title="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          opacity="0.65"
          viewBox="0 0 24 24"
          fill="none" 
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h18v18H3z" />
          <path d="M9 3v18" />
        </svg>
      </button>
    </div>
  )
}
