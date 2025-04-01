import { createNote, deleteNote, getNotes, readNote, writeNote } from '@/lib'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { BrowserWindow, app, ipcMain, shell, globalShortcut, webContents } from 'electron'
import { join } from 'path'
//import icon from '/Users/User/notes/resources/icon.png?asset'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'aegis',
    frame: false,  // Ensure the frame is false if you are using a custom title bar
    vibrancy: 'under-window',
    visualEffectState: 'active',
    backgroundMaterial: 'acrylic',
    titleBarStyle: 'hiddenInset',  
  

    titleBarOverlay: {
      color: '#2c313c',
      symbolColor: '#FAF9F6',
      height: 32 
    },

    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      zoomFactor: 1.0
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Add zoom keyboard shortcuts
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control || input.meta) {
      if (input.key === '=') {
        mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() + 1)
        event.preventDefault()
      } else if (input.key === '-') {
        mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() - 1)
        event.preventDefault()
      }
    }
  })
}


app.whenReady().then(() => {
 
  electronApp.setAppUserModelId('com.electron')

 
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))

  createWindow()

  app.on('activate', function () {
  
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
