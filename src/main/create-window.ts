import { join } from 'path'
import { shell, BrowserWindow, WebContentsView } from 'electron'
import { is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import { TWindowsList } from './types'

const screen = {
  width: 1200,
  height: 670
}

function createAppWin(): WebContentsView {
  const win = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.webContents.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.webContents.loadFile(join(__dirname, '../renderer/index.html'))
  }
  win.setBounds({
    x: 0,
    y: 0,
    width: screen.width,
    height: screen.height
  })
  return win
}

function createWebWin(): WebContentsView {
  const win = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  win.webContents.loadURL('https://www.electronjs.org/docs/latest/api/web-contents-view')
  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      const popup = document.createElement('div');
      popup.style.position = 'fixed';
      popup.style.display = 'none';
      popup.style.right = '15px';
      popup.style.bottom = '25px';
      popup.style.justifyContent = 'center';
      popup.style.borderRadius = '10px';
      popup.style.background = 'blue';
      popup.style.color = 'white';
      popup.style.padding = '10px 20px';
      popup.style.cursor = 'pointer';
      popup.innerText = 'Save';
      document.body.appendChild(popup);
      let textToCopy = '';
      document.addEventListener('mouseup', () => {
        const selection = window.getSelection();
        if (selection.toString().length) {
          popup.style.display = "flex";
          textToCopy = selection.toString();
        } else {
          popup.style.display = "none";
        }
      });
      popup.addEventListener('click', () => {
        window.electron.ipcRenderer.send('web:copied', {
          text: textToCopy,
          url: window.location.hostname,
          href: window.location.href,
          title: document.title,
        });
        textToCopy = "";
      })
    `)
  })
  win.setBounds({
    x: screen.width / 2 + 25,
    y: 100,
    width: screen.width / 2 - 25,
    height: screen.height - 120
  })
  return win
}

export default function createWindow(): TWindowsList {
  const mainWindow = new BrowserWindow({
    ...(process.platform === 'linux' ? { icon } : {}),
    width: screen.width,
    height: screen.height
  })

  const appWindow = createAppWin()
  const webWindow = createWebWin()

  mainWindow.contentView.addChildView(appWindow)
  mainWindow.contentView.addChildView(webWindow)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  return {
    mainWindow,
    appWindow,
    webWindow
  }
}
